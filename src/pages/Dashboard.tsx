import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  RefreshCw,
  ShoppingCart,
  User,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { hotelsApi } from "@/services/api";

interface OrderItem {
  id: number;
  p_id: number;
  category_id: number;
  product_name: string;
  category_name: string;
  qty: number;
  price: string;
  amount: string;
}

interface TableOrder {
  table_id: number;
  table_name: string;
  waiter_id: number;
  waiter_name: string;
  item_count: number;
  subtotal: string;
  items: OrderItem[];
}

interface OrdersResponse {
  Success: number;
  Messages: string;
  total_tables: number;
  total_items: number;
  total_amount: string;
  tables: TableOrder[];
}

interface TableConfig {
  id: string;
  name: string;
  c_no: string;
  Shop: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { appParams } = useApp();

  const [hotelTables, setHotelTables] = useState<TableConfig[]>([]);
  const [ordersData, setOrdersData] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Use refs to prevent multiple loads and track state
  const tablesLoadedRef = useRef(false);
  const ordersLoadedRef = useRef(false);
  const loadingRef = useRef(false);
  const autoRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadTablesFromAPI = useCallback(async () => {
    if (loadingRef.current) {
      console.log('Load already in progress, skipping...');
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);

      if (!appParams?.c_no) {
        throw new Error("Shop ID (c_no) is not available");
      }

      // Fetch tables and orders in parallel
      const [tablesResponse, ordersResponse] = await Promise.all([
        hotelsApi.getTables(appParams.c_no),
        fetch(`https://deepikagroups.in/admin/api/get_tableOrder.php?c_no=${appParams.c_no}&type=${appParams.type}`)
          .then(res => res.json())
      ]);

      if (tablesResponse.Tables && tablesResponse.Tables.length > 0) {
        setHotelTables(tablesResponse.Tables);
        tablesLoadedRef.current = true;
      } else {
        setHotelTables([]);
      }

      setOrdersData(ordersResponse);
      ordersLoadedRef.current = true;

      console.log("Data loaded:", {
        tables: tablesResponse.Tables?.length || 0,
        orders: ordersResponse.total_tables || 0
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data from server");
      setHotelTables([]);
      setOrdersData(null);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [appParams?.c_no, appParams?.type]);

  // Load data only once on mount or when params change
  useEffect(() => {
    if (!tablesLoadedRef.current && appParams?.c_no) {
      loadTablesFromAPI();
    }
  }, [appParams?.c_no, loadTablesFromAPI]);

  // Set up auto-refresh for orders data (3 minutes)
  useEffect(() => {
    if (autoRefreshIntervalRef.current) {
      clearInterval(autoRefreshIntervalRef.current);
    }

    autoRefreshIntervalRef.current = setInterval(() => {
      console.log('Auto-refreshing data...');
      tablesLoadedRef.current = false;
      ordersLoadedRef.current = false;
      loadTablesFromAPI();
    }, 3 * 60 * 1000);

    return () => {
      if (autoRefreshIntervalRef.current) {
        clearInterval(autoRefreshIntervalRef.current);
      }
    };
  }, [loadTablesFromAPI]);

  const handleRefresh = useCallback(() => {
    tablesLoadedRef.current = false;
    ordersLoadedRef.current = false;
    loadTablesFromAPI();
    toast.success("Dashboard refreshed");
  }, [loadTablesFromAPI]);

  const handleGoToBill = useCallback((tableId: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('c_no', appParams.c_no);
    searchParams.set('type', appParams.type);
    navigate(`/bill/${tableId}?${searchParams.toString()}`);
  }, [navigate, appParams]);

  // Helper function to group orders by category - memoized
  const groupOrdersByCategory = useCallback((items: OrderItem[]) => {
    const grouped: Record<string, OrderItem[]> = {};

    items.forEach((item) => {
      const categoryName = item.category_name || "Other";
      if (!grouped[categoryName]) {
        grouped[categoryName] = [];
      }
      grouped[categoryName].push(item);
    });

    return grouped;
  }, []);

  // Get order data for a specific table
  const getTableOrderData = useCallback((tableId: string) => {
    if (!ordersData?.tables) return null;
    return ordersData.tables.find(t => String(t.table_id) === String(tableId));
  }, [ordersData]);

  // Generate kudils data combining tables and orders
  const kudils = useMemo(() => {
    return hotelTables.map((table, i) => {
      const orderData = getTableOrderData(table.id);
      const items = orderData?.items || [];

      return {
        name: table.name,
        number: i + 1,
        id: table.id,
        items: items,
        groupedOrders: groupOrdersByCategory(items),
        waiterName: orderData?.waiter_name || "No Waiter",
        itemCount: orderData?.item_count || 0,
        total: orderData?.subtotal ? parseFloat(orderData.subtotal) : 0,
      };
    });
  }, [hotelTables, getTableOrderData, groupOrdersByCategory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <div className="text-lg">Loading tables...</div>
          <div className="text-sm text-muted-foreground mt-2">
            Shop: {appParams?.c_no || 'Unknown'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor all table orders • {hotelTables.length} table(s)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Shop #{appParams?.c_no} • {appParams?.type}
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {kudils.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tables configured</h3>
            <p className="text-muted-foreground mb-4">
              Please configure tables in Hotel Settings to get started.
            </p>
            <Button onClick={() => navigate('/settings')}>
              Go to Settings
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {kudils.map((kudil) => (
            <Card
              key={kudil.id}
              className="overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-4 md:p-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl md:text-2xl font-bold text-foreground">
                    {kudil.name}
                  </h2>
                  <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>

                {/* Waiter Name */}
                <div className="flex items-center gap-1.5 mb-3 text-sm text-muted-foreground">
                  <User className="h-3.5 w-3.5" />
                  <span>{kudil.waiterName}</span>
                </div>

                <ScrollArea className="h-32 mb-4">
                  <div className="pr-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      Current Orders:
                    </p>
                    {kudil.items.length === 0 ? (
                      <p className="text-muted-foreground text-sm">
                        No orders yet
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {Object.entries(kudil.groupedOrders).map(
                          ([categoryName, items]) => (
                            <div key={categoryName}>
                              <div className="text-xs font-semibold text-primary uppercase tracking-wide">
                                {categoryName}
                              </div>
                              {items.map((item, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between text-sm pl-2"
                                >
                                  <span className="break-words flex-1">{item.product_name}</span>
                                  <span className="font-medium ml-2">
                                    x{item.qty}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="mb-4 p-3 bg-primary/10 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Total:</span>
                    <span className="text-xl md:text-2xl font-bold text-primary">
                      ₹{kudil.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {kudil.itemCount} item(s)
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleGoToBill(kudil.id)}
                >
                  Go to Bill
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}