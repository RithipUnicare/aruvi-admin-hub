import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  RefreshCw,
  ShoppingCart,
  User,
  Plus,
  Search,
  Minus,
  Trash2,
  Package,
} from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { hotelsApi, tableOrdersApi } from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

interface Product {
  p_id: string;
  product_name: string;
  category_name: string;
  stock: number | string;
  counter_price?: string;
  counter2_price?: string;
  c_price?: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { appParams } = useApp();

  const [hotelTables, setHotelTables] = useState<TableConfig[]>([]);
  const [ordersData, setOrdersData] = useState<OrdersResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Ordering State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState<TableConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [submittingOrder, setSubmittingOrder] = useState(false);

  // Use refs to prevent multiple loads and track state
  const tablesLoadedRef = useRef(false);
  const ordersLoadedRef = useRef(false);
  const loadingRef = useRef(false);
  const autoRefreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const loadTablesFromAPI = useCallback(async () => {
    if (loadingRef.current) {
      console.log("Load already in progress, skipping...");
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
        fetch(
          `https://deepikagroups.in/admin/api/get_tableOrder.php?c_no=${appParams.c_no}&type=${appParams.type}`
        ).then((res) => res.json()),
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
        orders: ordersResponse.total_tables || 0,
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
      console.log("Auto-refreshing data...");
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

  const handleGoToBill = useCallback(
    (tableId: string) => {
      const searchParams = new URLSearchParams();
      searchParams.set("c_no", appParams.c_no);
      searchParams.set("type", appParams.type);
      navigate(`/bill/${tableId}?${searchParams.toString()}`);
    },
    [navigate, appParams]
  );

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
  const getTableOrderData = useCallback(
    (tableId: string) => {
      if (!ordersData?.tables) return null;
      return ordersData.tables.find(
        (t) => String(t.table_id) === String(tableId)
      );
    },
    [ordersData]
  );

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

  const handleOpenOrderModal = async (table: TableConfig) => {
    setSelectedTable(table);
    setIsOrderModalOpen(true);
    setCart([]);
    setSearchQuery("");

    if (products.length === 0) {
      try {
        setLoadingProducts(true);
        const response = await tableOrdersApi.getProducts(
          appParams.c_no,
          appParams.type
        );
        if (response.Product) {
          setProducts(response.Product);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        toast.error("Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.product_name.toLowerCase().includes(query) ||
        p.category_name.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  const getProductPrice = (product: Product) => {
    if (appParams.type === "Godown") {
      return parseFloat(product.counter2_price || "0");
    }
    return parseFloat(product.c_price || "0");
  };

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.p_id === product.p_id);
      if (existing) {
        return prev.map((item) =>
          item.p_id === product.p_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (p_id: string) => {
    setCart((prev) => prev.filter((item) => item.p_id !== p_id));
  };

  const updateQuantity = (p_id: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.p_id === p_id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (sum, item) => sum + getProductPrice(item) * item.quantity,
      0
    );
  }, [cart, appParams.type]);

  const handleSubmitOrder = async () => {
    if (!selectedTable || cart.length === 0) return;

    try {
      setSubmittingOrder(true);
      await tableOrdersApi.addOrder({
        c_no: appParams.c_no,
        waiter_id: "1", // Default waiter ID
        table_id: selectedTable.id,
        user_id: "1", // Default user ID
        items: cart.map((item) => ({
          p_id: item.p_id,
          qty: item.quantity,
          price: getProductPrice(item).toFixed(2),
          amount: (getProductPrice(item) * item.quantity).toFixed(2),
        })),
      });

      toast.success("Order placed successfully");
      setIsOrderModalOpen(false);
      handleRefresh();
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    } finally {
      setSubmittingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <div className="text-lg">Loading tables...</div>
          <div className="text-sm text-muted-foreground mt-2">
            Shop: {appParams?.c_no || "Unknown"}
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
            <Button onClick={() => navigate("/settings")}>
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
                                  <span className="break-words flex-1">
                                    {item.product_name}
                                  </span>
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

                <div className="flex gap-2">
                  <Button
                    className="flex-1"
                    onClick={() => handleGoToBill(kudil.id)}
                  >
                    Go to Bill
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      handleOpenOrderModal(
                        hotelTables.find((t) => t.id === kudil.id)!
                      )
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Order Modal */}
      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="flex items-center justify-between">
              <span>Place Order - {selectedTable?.name}</span>
              <Badge variant="secondary">₹{cartTotal.toFixed(2)}</Badge>
            </DialogTitle>
            <DialogDescription>
              Select products to add to the table order
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 flex-1 overflow-hidden">
            {/* Product List */}
            <div className="p-6 pt-2 border-r flex flex-col min-h-0">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <ScrollArea className="flex-1">
                {loadingProducts ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <RefreshCw className="h-8 w-8 animate-spin text-primary mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Loading products...
                    </p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No products found
                  </div>
                ) : (
                  <div className="grid gap-2 pr-4">
                    {filteredProducts.map((product) => (
                      <Card
                        key={product.p_id}
                        className="p-3 hover:bg-accent cursor-pointer transition-colors"
                        onClick={() => addToCart(product)}
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="min-w-0">
                            <h4 className="font-medium truncate">
                              {product.product_name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {product.category_name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-[10px]">
                                Stock: {product.stock}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="font-bold text-primary">
                              ₹{getProductPrice(product).toFixed(2)}
                            </div>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 mt-1"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            {/* Cart Preview */}
            <div className="p-6 pt-2 bg-slate-50/50 flex flex-col min-h-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Order Summary
                </h3>
                <Badge>{cart.length} items</Badge>
              </div>

              <ScrollArea className="flex-1">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mb-2 opacity-20" />
                    <p>No items added yet</p>
                  </div>
                ) : (
                  <div className="space-y-3 pr-4">
                    {cart.map((item) => (
                      <div
                        key={item.p_id}
                        className="bg-background p-3 rounded-lg border shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="min-w-0">
                            <h4 className="font-medium text-sm truncate">
                              {item.product_name}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              ₹{getProductPrice(item).toFixed(2)} each
                            </p>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 text-destructive"
                            onClick={() => removeFromCart(item.p_id)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.p_id, -1)}
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.p_id, 1)}
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <div className="font-bold text-sm">
                            ₹
                            {(getProductPrice(item) * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              <div className="pt-4 mt-auto">
                <Separator className="mb-4" />
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium">Grand Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{cartTotal.toFixed(2)}
                  </span>
                </div>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={cart.length === 0 || submittingOrder}
                  onClick={handleSubmitOrder}
                >
                  {submittingOrder ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Placing Order...
                    </>
                  ) : (
                    "Confirm Order"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
