import { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import {
  Building2,
  Table,
  RefreshCw,
  Plus,
  Edit,
  Hash,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hotelsApi } from "@/services/api";
import { useApp } from "@/contexts/AppContext";

interface TableConfig {
  id: string;
  name: string;
  c_no: string;
  Shop: string;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  no_table: string | null;
}

const HotelSettings = () => {
  const { appParams } = useApp();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [tables, setTables] = useState<TableConfig[]>([]);
  const [loading, setLoading] = useState(true);

  // Total Tables State
  const [isTotalDialogOpen, setIsTotalDialogOpen] = useState(false);
  const [newTotalTables, setNewTotalTables] = useState("");
  const [updatingTotal, setUpdatingTotal] = useState(false);

  // Add/Edit Table State
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  const [tableFormData, setTableFormData] = useState({ name: "", edit_id: "" });
  const [submittingTable, setSubmittingTable] = useState(false);

  // Use ref to prevent multiple loads
  const dataLoadedRef = useRef(false);
  const loadingRef = useRef(false);

  const loadHotelData = useCallback(async () => {
    // Prevent multiple simultaneous loads
    if (loadingRef.current) return;

    try {
      loadingRef.current = true;
      setLoading(true);

      // Fetch shop details and tables in parallel
      const [shopResponse, tablesResponse] = await Promise.all([
        hotelsApi.getShopDetails(appParams.c_no, appParams.type),
        hotelsApi.getTables(appParams.c_no),
      ]);

      if (shopResponse.shop && shopResponse.shop.length > 0) {
        setHotel(shopResponse.shop[0]);
        setNewTotalTables(shopResponse.shop[0].no_table || "0");
      } else {
        setHotel(null);
      }

      if (tablesResponse.Tables) {
        setTables(tablesResponse.Tables);
      } else {
        setTables([]);
      }

      dataLoadedRef.current = true;
    } catch (error) {
      console.error("Error loading hotel data:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to load hotel data"
      );
      setHotel(null);
      setTables([]);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [appParams.c_no, appParams.type]);

  const handleUpdateTotalTables = async () => {
    if (!newTotalTables) return;
    try {
      setUpdatingTotal(true);
      await hotelsApi.updateShopTableDetails({
        no_table: parseInt(newTotalTables),
        c_no: appParams.c_no,
        user_id: "1", // Hardcoded as per request
      });
      toast.success("Total tables updated successfully");
      setIsTotalDialogOpen(false);
      handleRefresh(); // Refresh data
    } catch (error) {
      console.error("Error updating total tables:", error);
      toast.error("Failed to update total tables");
    } finally {
      setUpdatingTotal(false);
    }
  };

  const handleOpenAddTable = () => {
    setTableFormData({ name: "", edit_id: "" });
    setIsTableDialogOpen(true);
  };

  const handleOpenEditTable = (table: TableConfig) => {
    setTableFormData({ name: table.name, edit_id: table.id });
    setIsTableDialogOpen(true);
  };

  const handleSubmitTable = async () => {
    if (!tableFormData.name) {
      toast.error("Table name is required");
      return;
    }
    try {
      setSubmittingTable(true);
      await hotelsApi.addTable({
        edit_id: tableFormData.edit_id,
        c_no: appParams.c_no,
        name: tableFormData.name,
        user_id: "1", // Hardcoded as per request
      });
      toast.success(
        tableFormData.edit_id
          ? "Table updated successfully"
          : "Table added successfully"
      );
      setIsTableDialogOpen(false);
      handleRefresh(); // Refresh list
    } catch (error) {
      console.error("Error saving table:", error);
      toast.error("Failed to save table");
    } finally {
      setSubmittingTable(false);
    }
  };

  // Load data only once on mount or when params change
  useEffect(() => {
    if (!dataLoadedRef.current) {
      loadHotelData();
    }
  }, [loadHotelData]);

  const handleRefresh = () => {
    dataLoadedRef.current = false;
    loadHotelData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <div className="text-lg">Loading hotel information...</div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hotel found</h3>
          <p className="text-muted-foreground mb-4">
            Unable to load hotel information for shop #{appParams.c_no}
          </p>
          <Button onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Hotel Settings
          </h1>
          <p className="text-muted-foreground mt-2">
            View your hotel information and table configuration
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-muted-foreground">
            Shop ID: <span className="font-medium">{appParams.c_no}</span> |
            Type: <span className="font-medium">{appParams.type}</span>
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start gap-4">
            <Building2 className="h-10 w-10 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl md:text-2xl mb-2 break-words text-foreground">
                {hotel.name}
              </CardTitle>
              <CardDescription className="text-sm md:text-base break-words text-muted-foreground">
                {hotel.location}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Shop ID
              </p>
              <p className="text-lg font-semibold text-foreground">
                {hotel.id}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">
                Total Tables
              </p>
              <div className="flex items-center gap-2">
                <p className="text-lg font-semibold text-foreground">
                  {hotel.no_table || tables.length}
                </p>
                <Dialog
                  open={isTotalDialogOpen}
                  onOpenChange={setIsTotalDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-primary hover:bg-primary/10"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Total Tables</DialogTitle>
                    </DialogHeader>
                    <div className="py-4">
                      <Label htmlFor="totalTables">Number of Tables</Label>
                      <Input
                        id="totalTables"
                        type="number"
                        value={newTotalTables}
                        onChange={(e) => setNewTotalTables(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsTotalDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleUpdateTotalTables}
                        disabled={updatingTotal}
                      >
                        {updatingTotal ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="mr-2 h-4 w-4" />
                        )}
                        Update
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Table className="h-5 w-5 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Tables / Kudils
            </h2>
            <span className="text-sm text-muted-foreground ml-2">
              ({tables.length} total)
            </span>
          </div>
          <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenAddTable} size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Table
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {tableFormData.edit_id ? "Edit Table" : "Add New Table"}
                </DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="tableName">Table Name</Label>
                <Input
                  id="tableName"
                  placeholder="e.g. Table 1, Garden 1"
                  value={tableFormData.name}
                  onChange={(e) =>
                    setTableFormData({ ...tableFormData, name: e.target.value })
                  }
                  className="mt-2"
                />
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsTableDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitTable} disabled={submittingTable}>
                  {submittingTable ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 h-4 w-4" />
                  )}
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {tables.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tables.map((table, index) => (
              <Card
                key={table.id}
                className="hover:shadow-md transition-shadow group"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <CardTitle className="text-base md:text-lg truncate text-foreground pr-2">
                        {table.name}
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleOpenEditTable(table)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1 text-xs md:text-sm text-muted-foreground">
                    <p>ID: {table.id}</p>
                    <p>Shop: {table.c_no}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Table className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                No tables configured
              </h3>
              <p className="text-muted-foreground text-center">
                No tables have been set up for this hotel yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-foreground">Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Hotel Name:</span>
              <span className="font-medium break-words text-foreground">
                {hotel.name}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium break-words sm:text-right text-foreground">
                {hotel.location}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">
                Total Configured Tables:
              </span>
              <span className="font-medium text-foreground">
                {tables.length}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Shop Number:</span>
              <span className="font-medium text-foreground">
                {appParams.c_no}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium text-foreground">
                {appParams.type}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelSettings;
