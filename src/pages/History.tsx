// import { useState } from "react";
// import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
// import { useApp } from "@/contexts/AppContext";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function History() {
//   const { history } = useApp();
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [expandedBills, setExpandedBills] = useState<Set<string>>(new Set());

//   const filteredHistory = history.filter((entry) => {
//     const entryDate = new Date(entry.timestamp).toISOString().split("T")[0];
//     return entryDate === selectedDate;
//   });

//   const toggleExpand = (id: string) => {
//     setExpandedBills((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(id)) {
//         newSet.delete(id);
//       } else {
//         newSet.add(id);
//       }
//       return newSet;
//     });
//   };

//   const formatTime = (timestamp: number) => {
//     return new Date(timestamp).toLocaleTimeString("en-IN", {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const formatDate = (timestamp: number) => {
//     return new Date(timestamp).toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   return (
//     <div className="p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-foreground">Bill History</h1>
//         <p className="text-muted-foreground mt-1">View all printed bills</p>
//       </div>

//       <div className="mb-6 flex items-center gap-4">
//         <div className="flex items-center gap-2">
//           <Calendar className="w-5 h-5 text-muted-foreground" />
//           <Input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             className="w-auto"
//           />
//         </div>
//         <div className="text-sm text-muted-foreground">
//           Showing {filteredHistory.length} bill(s)
//         </div>
//       </div>

//       {filteredHistory.length === 0 ? (
//         <Card className="p-8 text-center">
//           <p className="text-muted-foreground">No bills found for this date</p>
//         </Card>
//       ) : (
//         <div className="space-y-4">
//           {filteredHistory.map((entry) => {
//             const isExpanded = expandedBills.has(entry.id);
//             const kudilNumber = entry.kudilId.replace("kudil", "");

//             return (
//               <Card key={entry.id} className="overflow-hidden">
//                 <div
//                   className="p-6 cursor-pointer hover:bg-muted/50 transition-colors"
//                   onClick={() => toggleExpand(entry.id)}
//                 >
//                   <div className="flex justify-between items-center">
//                     <div className="flex items-center gap-4">
//                       <div>
//                         <h3 className="font-semibold text-lg">
//                           Table {kudilNumber}
//                         </h3>
//                         <p className="text-sm text-muted-foreground">
//                           {formatDate(entry.timestamp)} at{" "}
//                           {formatTime(entry.timestamp)}
//                         </p>
//                       </div>
//                       <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
//                         {entry.items.reduce(
//                           (sum, item) => sum + item.quantity,
//                           0
//                         )}{" "}
//                         items
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-4">
//                       <div className="text-right">
//                         <p className="text-2xl font-bold text-primary">
//                           ₹{entry.total}
//                         </p>
//                       </div>
//                       {isExpanded ? (
//                         <ChevronUp className="w-5 h-5 text-muted-foreground" />
//                       ) : (
//                         <ChevronDown className="w-5 h-5 text-muted-foreground" />
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {isExpanded && (
//                   <div className="border-t border-border p-6 bg-muted/30">
//                     <div className="space-y-2">
//                       <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-muted-foreground pb-2 border-b border-border">
//                         <div className="col-span-6">Item</div>
//                         <div className="col-span-2 text-center">Qty</div>
//                         <div className="col-span-2 text-right">Price</div>
//                         <div className="col-span-2 text-right">Total</div>
//                       </div>
//                       {entry.items.map((item, idx) => (
//                         <div
//                           key={idx}
//                           className="grid grid-cols-12 gap-2 text-sm"
//                         >
//                           <div className="col-span-6">{item.productName}</div>
//                           <div className="col-span-2 text-center">
//                             {item.quantity}
//                           </div>
//                           <div className="col-span-2 text-right">
//                             ₹{item.price}
//                           </div>
//                           <div className="col-span-2 text-right font-semibold">
//                             ₹{item.price * item.quantity}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </Card>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Calendar, ChevronDown, ChevronUp, RefreshCw, Receipt, User } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

interface Table {
  table_id: number;
  table_name: string;
  waiter_id: number;
  waiter_name: string;
  item_count: number;
  subtotal: string;
  items: OrderItem[];
}

interface OrderHistoryResponse {
  Success: number;
  Messages: string;
  total_tables: number;
  total_items: number;
  total_amount: string;
  tables: Table[];
}

export default function History() {
  const { appParams } = useApp();
  const [orderHistory, setOrderHistory] = useState<OrderHistoryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTables, setExpandedTables] = useState<Set<number>>(new Set());

  // Use refs to prevent multiple loads
  const historyLoadedRef = useRef(false);
  const loadingRef = useRef(false);

  const loadOrderHistory = useCallback(async () => {
    // Prevent multiple simultaneous loads
    if (loadingRef.current) {
      console.log('History load already in progress, skipping...');
      return;
    }

    try {
      loadingRef.current = true;
      setLoading(true);
      setError(null);

      if (!appParams?.c_no) {
        throw new Error("Shop ID (c_no) is not available");
      }

      console.log(`Fetching order history for c_no: ${appParams.c_no}`);

      const response = await fetch(
        `https://deepikagroups.in/admin/api/get_allOrder.php?c_no=${appParams.c_no}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrderHistoryResponse = await response.json();

      setOrderHistory(data);
      historyLoadedRef.current = true;
      console.log(`Loaded ${data.total_tables} table(s) with ${data.total_items} item(s)`);

      if (data.total_tables > 0) {
        toast.success(`Loaded ${data.total_tables} table order(s)`);
      }
    } catch (error) {
      console.error("Error fetching order history:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to load order history";
      setError(errorMessage);
      toast.error(errorMessage);
      setOrderHistory(null);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [appParams?.c_no]);

  // Load history only once on mount or when c_no changes
  useEffect(() => {
    if (!historyLoadedRef.current && appParams?.c_no) {
      loadOrderHistory();
    }
  }, [appParams?.c_no, loadOrderHistory]);

  const handleRefresh = () => {
    historyLoadedRef.current = false;
    loadOrderHistory();
  };

  const toggleExpand = (tableId: number) => {
    setExpandedTables((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tableId)) {
        newSet.delete(tableId);
      } else {
        newSet.add(tableId);
      }
      return newSet;
    });
  };

  // Group items by category for each table
  const groupItemsByCategory = useMemo(() => {
    return (items: OrderItem[]) => {
      const grouped: Record<string, OrderItem[]> = {};

      items.forEach(item => {
        const categoryName = item.category_name || "Other";
        if (!grouped[categoryName]) {
          grouped[categoryName] = [];
        }
        grouped[categoryName].push(item);
      });

      return grouped;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <div className="text-lg">Loading order history...</div>
          <div className="text-sm text-muted-foreground mt-2">
            Shop: {appParams?.c_no || 'Unknown'}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Card className="p-8 max-w-md">
          <div className="text-center">
            <div className="text-red-500 mb-4">⚠️ Error</div>
            <h3 className="text-lg font-semibold mb-2">Failed to Load History</h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <div className="space-y-2">
              <Button onClick={handleRefresh} className="w-full">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <div className="text-xs text-muted-foreground">
                <p>Debug Info:</p>
                <p>Shop ID: {appParams?.c_no || 'Not set'}</p>
                <p>Type: {appParams?.type || 'Not set'}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const tables = orderHistory?.tables || [];
  const totalAmount = orderHistory?.total_amount || "0.00";
  const totalTables = orderHistory?.total_tables || 0;
  const totalItems = orderHistory?.total_items || 0;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Order History</h1>
          <p className="text-muted-foreground mt-1">
            Current active orders • {totalTables} table(s) • {totalItems} item(s)
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Shop #{appParams?.c_no} • {appParams?.type}
          </p>
        </div>
        <Button onClick={handleRefresh} variant="outline" size="icon">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Tables</p>
              <p className="text-2xl font-bold text-foreground">{totalTables}</p>
            </div>
            <Receipt className="h-8 w-8 text-primary/50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold text-foreground">{totalItems}</p>
            </div>
            <Calendar className="h-8 w-8 text-primary/50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-2xl font-bold text-primary">₹{totalAmount}</p>
            </div>
            <div className="text-4xl text-primary/50">₹</div>
          </div>
        </Card>
      </div>

      {tables.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <Receipt className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No active orders</h3>
            <p className="text-muted-foreground">
              There are no active orders for this shop at the moment.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {tables.map((table) => {
            const isExpanded = expandedTables.has(table.table_id);
            const groupedItems = groupItemsByCategory(table.items);

            return (
              <Card key={table.table_id} className="overflow-hidden">
                <div
                  className="p-4 md:p-6 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => toggleExpand(table.table_id)}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
                        {table.table_id}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg break-words">
                          {table.table_name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                          <User className="h-3.5 w-3.5" />
                          <span>{table.waiter_name}</span>
                        </div>
                        <div className="mt-2 inline-flex px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                          {table.item_count} item{table.item_count !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-4">
                      <div className="text-left md:text-right">
                        <p className="text-xs text-muted-foreground mb-1">Subtotal</p>
                        <p className="text-xl md:text-2xl font-bold text-primary">
                          ₹{parseFloat(table.subtotal).toFixed(2)}
                        </p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                  </div>
                </div>

                {isExpanded && (
                  <div className="border-t border-border p-4 md:p-6 bg-muted/30">
                    <div className="space-y-4">
                      {/* Group items by category */}
                      {Object.entries(groupedItems).map(([categoryName, items]) => (
                        <div key={categoryName}>
                          <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-3 pb-2 border-b border-primary/20">
                            {categoryName}
                          </div>

                          {/* Desktop view */}
                          <div className="hidden md:block">
                            <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-muted-foreground pb-2 mb-2 border-b">
                              <div className="col-span-5">Product</div>
                              <div className="col-span-2 text-center">Qty</div>
                              <div className="col-span-2 text-right">Price</div>
                              <div className="col-span-3 text-right">Total</div>
                            </div>
                            {items.map((item) => (
                              <div
                                key={item.id}
                                className="grid grid-cols-12 gap-2 text-sm py-2 hover:bg-muted/50 rounded px-2"
                              >
                                <div className="col-span-5 break-words">{item.product_name}</div>
                                <div className="col-span-2 text-center font-medium">
                                  {item.qty}
                                </div>
                                <div className="col-span-2 text-right">
                                  ₹{parseFloat(item.price).toFixed(2)}
                                </div>
                                <div className="col-span-3 text-right font-semibold text-primary">
                                  ₹{parseFloat(item.amount).toFixed(2)}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Mobile view */}
                          <div className="md:hidden space-y-3">
                            {items.map((item) => (
                              <div key={item.id} className="p-3 bg-background rounded border">
                                <div className="font-medium mb-2 break-words">{item.product_name}</div>
                                <div className="grid grid-cols-3 gap-2 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Qty:</span>
                                    <span className="font-medium ml-1">{item.qty}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Price:</span>
                                    <span className="font-medium ml-1">₹{parseFloat(item.price).toFixed(2)}</span>
                                  </div>
                                  <div className="text-right">
                                    <span className="text-muted-foreground">Total:</span>
                                    <span className="font-semibold text-primary ml-1">
                                      ₹{parseFloat(item.amount).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Table Total */}
                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <span className="font-semibold">Table Total:</span>
                      <span className="text-xl font-bold text-primary">
                        ₹{parseFloat(table.subtotal).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}