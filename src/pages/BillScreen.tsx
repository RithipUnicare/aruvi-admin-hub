// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft, Plus, Printer, Trash2 } from "lucide-react";
// import { useApp } from "@/contexts/AppContext";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { toast } from "@/hooks/use-toast";

// export default function BillScreen() {
//   const { kudilNumber } = useParams<{ kudilNumber: string }>();
//   const navigate = useNavigate();
//   const {
//     orders,
//     products,
//     categories,
//     addOrderItem,
//     removeOrderItem,
//     updateOrderItemQuantity,
//     printBill,
//     getKudilTotal,
//   } = useApp();

//   const [selectedCategory, setSelectedCategory] = useState<string>("");
//   const [selectedProduct, setSelectedProduct] = useState<string>("");
//   const [quantity, setQuantity] = useState<string>("1");

//   const kudilId = kudilNumber;
//   const currentOrder = orders[kudilId] || [];
//   const total = getKudilTotal(kudilId);

//   const filteredProducts = selectedCategory
//     ? products.filter((p) => p.categoryId === selectedCategory)
//     : [];

//   const handleAddItem = () => {
//     if (!selectedProduct || !quantity || parseInt(quantity) <= 0) {
//       toast({
//         title: "Invalid Input",
//         description: "Please select a product and enter a valid quantity",
//         variant: "destructive",
//       });
//       return;
//     }

//     const product = products.find((p) => p.id === selectedProduct);
//     if (!product) return;

//     addOrderItem(kudilId, {
//       productId: product.id,
//       productName: product.name,
//       quantity: parseInt(quantity),
//       price: product.price,
//     });

//     // Reset form
//     setSelectedCategory("");
//     setSelectedProduct("");
//     setQuantity("1");

//     toast({
//       title: "Item Added",
//       description: `${product.name} x${quantity} added to bill`,
//     });
//   };

//   const handlePrint = () => {
//     if (currentOrder.length === 0) {
//       toast({
//         title: "Empty Bill",
//         description: "Cannot print an empty bill",
//         variant: "destructive",
//       });
//       return;
//     }

//     // Create thermal print content
//     const printContent = `
//       <!DOCTYPE html>
//       <html>
//       <head>
//         <meta charset="UTF-8">
//         <style>
//           @media print {
//             @page { 
//               size: 80mm auto; 
//               margin: 0; 
//             }
//             body { 
//               margin: 0; 
//               padding: 5px 8px;
//               font-family: 'Courier New', monospace;
//               font-size: 11px;
//               width: 80mm;
//             }
//           }
//           body {
//             font-family: 'Courier New', monospace;
//             font-size: 11px;
//             width: 300px;
//             margin: 0 auto;
//             padding: 5px 8px;
//             line-height: 1.3;
//           }
//           .stars {
//             text-align: center;
//             font-size: 10px;
//             letter-spacing: 0px;
//             margin: 3px 0;
//           }
//           .header {
//             text-align: center;
//             margin-bottom: 5px;
//           }
//           .header h2 {
//             margin: 5px 0;
//             font-size: 15px;
//             font-weight: bold;
//             letter-spacing: 1px;
//           }
//           .header p {
//             margin: 2px 0;
//             font-size: 10px;
//             line-height: 1.4;
//           }
//           .tamil-text {
//             font-size: 11px;
//           }
//           .divider {
//             text-align: center;
//             margin: 5px 0;
//             font-size: 10px;
//           }
//           .bill-type {
//             text-align: center;
//             font-weight: bold;
//             font-size: 13px;
//             margin: 8px 0;
//           }
//           .bill-info {
//             display: flex;
//             justify-content: space-between;
//             font-size: 10px;
//             margin: 5px 0;
//           }
//           .table-header {
//             display: grid;
//             grid-template-columns: 40px 1fr 35px 50px 65px;
//             font-weight: bold;
//             border-bottom: 1px dashed #000;
//             padding-bottom: 3px;
//             margin: 8px 0 5px 0;
//             font-size: 10px;
//           }
//           .col-center {
//             text-align: center;
//           }
//           .col-right {
//             text-align: right;
//           }
//           .item-row {
//             display: grid;
//             grid-template-columns: 40px 1fr 35px 50px 65px;
//             margin: 4px 0;
//             font-size: 10px;
//             line-height: 1.5;
//           }
//           .item-row .sno {
//             text-align: left;
//           }
//           .item-row .name {
//             text-align: left;
//             padding-right: 5px;
//           }
//           .item-row .qty {
//             text-align: center;
//           }
//           .item-row .rate {
//             text-align: right;
//             padding-right: 5px;
//           }
//           .item-row .amount {
//             text-align: right;
//           }
//           .total-section {
//             border-top: 1px dashed #000;
//             margin-top: 8px;
//             padding-top: 5px;
//           }
//           .total-row {
//             display: flex;
//             justify-content: space-between;
//             font-size: 12px;
//             margin: 3px 0;
//           }
//           .grand-total {
//             font-weight: bold;
//             font-size: 15px;
//             margin: 5px 0;
//           }
//           .footer {
//             text-align: center;
//             margin-top: 10px;
//             border-top: 1px dashed #000;
//             padding-top: 8px;
//           }
//           .footer p {
//             margin: 3px 0;
//             font-size: 12px;
//             font-style: italic;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="stars">**********************************************</div>

//         <div class="header">
//           <h2>ARUVI RESTAURANT</h2>
//           <p class="tamil-text">மணப்பாறை சமையல்</p>
//           <p>Elampillai To Chinnampatti Main Road</p>
//           <p>Near Nayara Petrol Bunk, Elampillai-637502</p>
//           <p><strong>Phone : 7200800840</strong></p>
//         </div>

//         <div class="divider">----------------------------------------------</div>

//         <div class="bill-type">Cash BILL</div>

//         <div class="divider">----------------------------------------------</div>

//         <div class="bill-info">
//           <span>Bill No : ${
//             [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
//               .sort(() => Math.random() - 0.5)
//               .slice(0, 4)
//               .join("") || "46"
//           }</span>
//           <span>Date :${new Date()
//             .toLocaleDateString("en-GB")
//             .replace(/\//g, "-")}  Time ${new Date().toLocaleTimeString(
//       "en-GB"
//     )}</span>
//         </div>

//         <div class="divider">----------------------------------------------</div>

//         <div class="table-header">
//           <div>S.No</div>
//           <div>Particulars</div>
//           <div class="col-center">Qty</div>
//           <div class="col-right">Rate</div>
//           <div class="col-right">Amount</div>
//         </div>



//         <div class="items">
//           ${currentOrder
//             .map(
//               (item, index) => `
//             <div class="item-row">
//               <div class="sno">${index + 1}</div>
//               <div class="name">${item.productName}</div>
//               <div class="qty">${item.quantity}</div>
//               <div class="rate">${item.price.toFixed(2)}</div>
//               <div class="amount">${(item.price * item.quantity).toFixed(
//                 2
//               )}</div>
//             </div>
//           `
//             )
//             .join("")}
//         </div>



//         <div class="total-section">
//           <div class="total-row">
//             <span>Total</span>
//             <span>${total.toFixed(2)}</span>
//           </div>
//           <div class="total-row grand-total">
//             <span>Grand Total :</span>
//             <span>${total.toFixed(2)}</span>
//           </div>
//         </div>



//         <div class="footer">
//           <p>Thank U Visit Again</p>
//         </div>

//         <div class="stars">**********************************************</div>
//       </body>
//       </html>
//     `;

//     // Open print window
//     const printWindow = window.open("", "_blank", "width=300,height=600");
//     if (printWindow) {
//       printWindow.document.write(printContent);
//       printWindow.document.close();

//       // Wait for content to load then print
//       printWindow.onload = () => {
//         printWindow.focus();
//         printWindow.print();
//         printWindow.close();
//       };
//     }
//     console.log("Printing bill for kudilId:", kudilId);
//     // Save to history via API
//     printBill(kudilId);
//     toast({
//       title: "Bill Printed",
//       description: "Bill has been sent to printer and saved to history",
//     });

//     // Navigate after a short delay to ensure print dialog opens
//     setTimeout(() => navigate("/"), 500);
//   };

//   return (
//     <div className="p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-center gap-4 mb-8">
//           <Button variant="outline" onClick={() => navigate("/")}>
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">
//               Table {kudilNumber} - Bill
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Manage billing for this table
//             </p>
//           </div>
//         </div>

//         {/* Receipt Style Bill */}
//         <Card className="p-6 mb-6 bg-card">
//           <div className="border-b-2 border-dashed border-border pb-4 mb-4">
//             <h2 className="text-xl font-bold text-center">ARUVI RESTAURANT</h2>
//             <p className="text-center text-sm text-muted-foreground">
//               Table {kudilNumber}
//             </p>
//           </div>

//           {currentOrder.length === 0 ? (
//             <div className="text-center py-8 text-muted-foreground">
//               No items in this bill yet
//             </div>
//           ) : (
//             <div className="space-y-3">
//               <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-muted-foreground border-b border-border pb-2">
//                 <div className="col-span-5">Item</div>
//                 <div className="col-span-2 text-center">Qty</div>
//                 <div className="col-span-2 text-right">Price</div>
//                 <div className="col-span-2 text-right">Total</div>
//                 <div className="col-span-1"></div>
//               </div>

//               {currentOrder.map((item) => (
//                 <div
//                   key={item.productId}
//                   className="grid grid-cols-12 gap-2 items-center"
//                 >
//                   <div className="col-span-5 font-medium">
//                     {item.productName}
//                   </div>
//                   <div className="col-span-2 text-center">
//                     <Input
//                       type="number"
//                       min="1"
//                       value={item.quantity}
//                       onChange={(e) =>
//                         updateOrderItemQuantity(
//                           kudilId,
//                           item.productId,
//                           parseInt(e.target.value) || 0
//                         )
//                       }
//                       className="w-16 text-center"
//                     />
//                   </div>
//                   <div className="col-span-2 text-right">₹{item.price}</div>
//                   <div className="col-span-2 text-right font-semibold">
//                     ₹{item.price * item.quantity}
//                   </div>
//                   <div className="col-span-1 flex justify-end">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => removeOrderItem(kudilId, item.productId)}
//                     >
//                       <Trash2 className="w-4 h-4 text-destructive" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}

//               <div className="border-t-2 border-dashed border-border pt-4 mt-4">
//                 <div className="flex justify-between items-center text-xl font-bold">
//                   <span>TOTAL</span>
//                   <span className="text-primary">₹{total}</span>
//                 </div>
//               </div>
//             </div>
//           )}
//         </Card>

//         {/* Add Item Section */}
//         <Card className="p-6 mb-6">
//           <h3 className="text-lg font-semibold mb-4">Add Item</h3>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <Select
//               value={selectedCategory}
//               onValueChange={setSelectedCategory}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Category" />
//               </SelectTrigger>
//               <SelectContent>
//                 {categories.map((cat) => (
//                   <SelectItem key={cat.id} value={cat.id}>
//                     {cat.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Select
//               value={selectedProduct}
//               onValueChange={setSelectedProduct}
//               disabled={!selectedCategory}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Select Product" />
//               </SelectTrigger>
//               <SelectContent>
//                 {filteredProducts.map((product) => (
//                   <SelectItem key={product.id} value={product.id}>
//                     {product.name} - ₹{product.price}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>

//             <Input
//               type="number"
//               min="1"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               placeholder="Quantity"
//             />

//             <Button onClick={handleAddItem} className="w-full">
//               <Plus className="w-5 h-5 mr-2" />
//               Add Item
//             </Button>
//           </div>
//         </Card>

//         {/* Print Button */}
//         <Button
//           onClick={handlePrint}
//           size="lg"
//           className="w-full"
//           disabled={currentOrder.length === 0}
//         >
//           <Printer className="w-5 h-5 mr-2" />
//           Print Bill
//         </Button>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, RefreshCw } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
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

interface Hotel {
  id: string;
  name: string;
  location: string;
  no_table: string | null;
}

export default function BillScreen() {
  const { kudilNumber } = useParams<{ kudilNumber: string }>();
  const navigate = useNavigate();
  const { appParams } = useApp();

  const [tableOrder, setTableOrder] = useState<TableOrder | null>(null);
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  const loadingRef = useRef(false);
  const dataLoadedRef = useRef(false);

  const loadBillData = useCallback(async () => {
    if (loadingRef.current) return;

    try {
      loadingRef.current = true;
      setLoading(true);

      if (!appParams?.c_no || !kudilNumber) {
        throw new Error("Missing required parameters");
      }

      // Fetch hotel details and orders in parallel
      const [shopResponse, ordersResponse] = await Promise.all([
        hotelsApi.getShopDetails(appParams.c_no, appParams.type),
        fetch(`https://deepikagroups.in/admin/api/get_tableOrder.php?c_no=${appParams.c_no}&type=${appParams.type}`)
          .then(res => res.json())
      ]);

      // Set hotel details
      if (shopResponse.shop && shopResponse.shop.length > 0) {
        setHotel(shopResponse.shop[0]);
      }

      // Find the specific table order
      if (ordersResponse.tables) {
        const tableData = ordersResponse.tables.find(
          (t: TableOrder) => t.table_id.toString() === kudilNumber
        );
        setTableOrder(tableData || null);
      }

      dataLoadedRef.current = true;
    } catch (error) {
      console.error("Error loading bill data:", error);
      toast.error("Failed to load bill data");
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [appParams?.c_no, appParams?.type, kudilNumber]);

  useEffect(() => {
    if (!dataLoadedRef.current) {
      loadBillData();
    }
  }, [loadBillData]);

  const handlePrint = () => {
    if (!tableOrder || tableOrder.items.length === 0) {
      toast.error("Cannot print an empty bill");
      return;
    }

    if (!hotel) {
      toast.error("Hotel details not loaded");
      return;
    }

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @media print {
            @page { 
              size: 80mm auto; 
              margin: 0; 
            }
            body { 
              margin: 0; 
              padding: 5px 8px;
              font-family: 'Courier New', monospace;
              font-size: 11px;
              width: 80mm;
            }
          }
          body {
            font-family: 'Courier New', monospace;
            font-size: 11px;
            width: 300px;
            margin: 0 auto;
            padding: 5px 8px;
            line-height: 1.3;
          }
          .stars {
            text-align: center;
            font-size: 10px;
            letter-spacing: 0px;
            margin: 3px 0;
          }
          .header {
            text-align: center;
            margin-bottom: 5px;
          }
          .header h2 {
            margin: 5px 0;
            font-size: 15px;
            font-weight: bold;
            letter-spacing: 1px;
          }
          .header p {
            margin: 2px 0;
            font-size: 10px;
            line-height: 1.4;
          }
          .divider {
            text-align: center;
            margin: 5px 0;
            font-size: 10px;
          }
          .bill-type {
            text-align: center;
            font-weight: bold;
            font-size: 13px;
            margin: 8px 0;
          }
          .bill-info {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            margin: 5px 0;
          }
          .table-header {
            display: grid;
            grid-template-columns: 40px 1fr 35px 50px 65px;
            font-weight: bold;
            border-bottom: 1px dashed #000;
            padding-bottom: 3px;
            margin: 8px 0 5px 0;
            font-size: 10px;
          }
          .col-center {
            text-align: center;
          }
          .col-right {
            text-align: right;
          }
          .item-row {
            display: grid;
            grid-template-columns: 40px 1fr 35px 50px 65px;
            margin: 4px 0;
            font-size: 10px;
            line-height: 1.5;
          }
          .item-row .sno {
            text-align: left;
          }
          .item-row .name {
            text-align: left;
            padding-right: 5px;
          }
          .item-row .qty {
            text-align: center;
          }
          .item-row .rate {
            text-align: right;
            padding-right: 5px;
          }
          .item-row .amount {
            text-align: right;
          }
          .category-header {
            font-weight: bold;
            margin: 8px 0 4px 0;
            font-size: 11px;
            text-transform: uppercase;
          }
          .total-section {
            border-top: 1px dashed #000;
            margin-top: 8px;
            padding-top: 5px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            margin: 3px 0;
          }
          .grand-total {
            font-weight: bold;
            font-size: 15px;
            margin: 5px 0;
          }
          .footer {
            text-align: center;
            margin-top: 10px;
            border-top: 1px dashed #000;
            padding-top: 8px;
          }
          .footer p {
            margin: 3px 0;
            font-size: 12px;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="stars">**********************************************</div>
        
        <div class="header">
          <h2>${hotel.name.toUpperCase()}</h2>
          <p>${hotel.location}</p>
        </div>
        
        <div class="divider">----------------------------------------------</div>
        
        <div class="bill-type">Cash BILL</div>
        
        <div class="divider">----------------------------------------------</div>
        
        <div class="bill-info">
          <span>Table: ${tableOrder.table_name}</span>
          <span>Waiter: ${tableOrder.waiter_name}</span>
        </div>
        
        <div class="bill-info">
          <span>Bill No: ${Math.floor(Math.random() * 9000) + 1000}</span>
          <span>Date: ${new Date().toLocaleDateString('en-GB').replace(/\//g, '-')}</span>
        </div>
        
        <div class="bill-info">
          <span>Time: ${new Date().toLocaleTimeString('en-GB')}</span>
        </div>
        
        <div class="divider">----------------------------------------------</div>
        
        <div class="table-header">
          <div>S.No</div>
          <div>Particulars</div>
          <div class="col-center">Qty</div>
          <div class="col-right">Rate</div>
          <div class="col-right">Amount</div>
        </div>
        
        <div class="items">
          ${(() => {
        let itemNumber = 1;
        const grouped: Record<string, OrderItem[]> = {};

        tableOrder.items.forEach(item => {
          const cat = item.category_name || "Other";
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(item);
        });

        return Object.entries(grouped).map(([category, items]) => `
              <div class="category-header"></div>
              ${items.map(item => `
                <div class="item-row">
                  <div class="sno">${itemNumber++}</div>
                  <div class="name">${item.product_name}</div>
                  <div class="qty">${item.qty}</div>
                  <div class="rate">${parseFloat(item.price).toFixed(2)}</div>
                  <div class="amount">${parseFloat(item.amount).toFixed(2)}</div>
                </div>
              `).join('')}
            `).join('');
      })()}
        </div>

        <div class="total-section">
          <div class="total-row">
            <span>Total Items:</span>
            <span>${tableOrder.item_count}</span>
          </div>
          <div class="total-row grand-total">
            <span>Grand Total:</span>
            <span>₹${parseFloat(tableOrder.subtotal).toFixed(2)}</span>
          </div>
        </div>

        <div class="footer">
          <p>Thank You Visit Again</p>
        </div>
        
        <div class="stars">**********************************************</div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "_blank", "width=300,height=600");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      };
    }

    toast.success("Bill sent to printer");
    setTimeout(() => navigate("/"), 500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
          <div className="text-lg">Loading bill...</div>
        </div>
      </div>
    );
  }

  const items = tableOrder?.items || [];
  const total = tableOrder?.subtotal ? parseFloat(tableOrder.subtotal) : 0;

  // Group items by category
  const groupedItems: Record<string, OrderItem[]> = {};
  items.forEach(item => {
    const cat = item.category_name || "Other";
    if (!groupedItems[cat]) groupedItems[cat] = [];
    groupedItems[cat].push(item);
  });

  return (
    <div className="p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {tableOrder?.table_name || `Table ${kudilNumber}`} - Bill
            </h1>
            <p className="text-muted-foreground mt-1">
              {tableOrder?.waiter_name ? `Waiter: ${tableOrder.waiter_name}` : 'Manage billing for this table'}
            </p>
          </div>
        </div>

        {/* Receipt Style Bill */}
        <Card className="p-6 mb-6 bg-card">
          <div className="border-b-2 border-dashed border-border pb-4 mb-4">
            <h2 className="text-xl font-bold text-center">{hotel?.name || 'RESTAURANT'}</h2>
            <p className="text-center text-sm text-muted-foreground">
              {hotel?.location || ''}
            </p>
            <p className="text-center text-sm text-muted-foreground">
              {tableOrder?.table_name || `Table ${kudilNumber}`}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No items in this bill yet
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-12 gap-2 text-sm font-semibold text-muted-foreground border-b border-border pb-2">
                <div className="col-span-5">Item</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                <div key={category} className="space-y-2">
                  <div className="text-xs font-semibold text-primary uppercase tracking-wide mt-4 mb-2">
                    {category}
                  </div>
                  {categoryItems.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 items-center"
                    >
                      <div className="col-span-5 font-medium break-words">
                        {item.product_name}
                      </div>
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
              ))}

              <div className="border-t-2 border-dashed border-border pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Total Items:</span>
                  <span className="font-medium">{tableOrder?.item_count || 0}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold">
                  <span>TOTAL</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Print Button */}
        <Button
          onClick={handlePrint}
          size="lg"
          className="w-full"
          disabled={items.length === 0}
        >
          <Printer className="w-5 h-5 mr-2" />
          Print Bill
        </Button>
      </div>
    </div>
  );
}