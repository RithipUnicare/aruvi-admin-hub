// // // import { useState, useEffect } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// // // import { Input } from "@/components/ui/input";
// // // import { Label } from "@/components/ui/label";
// // // import { Textarea } from "@/components/ui/textarea";
// // // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
// // // import { toast } from "@/hooks/use-toast";
// // // import { hotelsApi } from "@/services/api";
// // // import { Plus, Edit, Trash2, Building2 } from "lucide-react";

// // // interface Hotel {
// // //   id: string;
// // //   shopName: string;
// // //   shopAddress: string;
// // //   shopDescription: string;
// // //   noOfTables: number;
// // // }

// // // const HotelSettings = () => {
// // //   const [hotels, setHotels] = useState<Hotel[]>([]);
// // //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// // //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
// // //   const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
// // //   const [deleteHotelId, setDeleteHotelId] = useState<string | null>(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [formData, setFormData] = useState({
// // //     shopName: "",
// // //     shopAddress: "",
// // //     shopDescription: "",
// // //     noOfTables: 0,
// // //   });

// // //   useEffect(() => {
// // //     loadHotels();
// // //   }, []);

// // //   const loadHotels = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const data = await hotelsApi.getAll();
// // //       setHotels(data);
// // //     } catch (error) {
// // //       toast({
// // //         title: "Error",
// // //         description: error instanceof Error ? error.message : "Failed to load hotels",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const handleAdd = () => {
// // //     setSelectedHotel(null);
// // //     setFormData({
// // //       shopName: "",
// // //       shopAddress: "",
// // //       shopDescription: "",
// // //       noOfTables: 0,
// // //     });
// // //     setIsDialogOpen(true);
// // //   };

// // //   const handleEdit = (hotel: Hotel) => {
// // //     setSelectedHotel(hotel);
// // //     setFormData({
// // //       shopName: hotel.shopName,
// // //       shopAddress: hotel.shopAddress,
// // //       shopDescription: hotel.shopDescription,
// // //       noOfTables: hotel.noOfTables,
// // //     });
// // //     setIsDialogOpen(true);
// // //   };

// // //   const handleDelete = (id: string) => {
// // //     setDeleteHotelId(id);
// // //     setIsDeleteDialogOpen(true);
// // //   };

// // //   const confirmDelete = async () => {
// // //     if (!deleteHotelId) return;

// // //     try {
// // //       await hotelsApi.delete(deleteHotelId);
// // //       setHotels(prev => prev.filter(h => h.id !== deleteHotelId));
// // //       toast({
// // //         title: "Hotel deleted",
// // //         description: "Hotel has been deleted successfully",
// // //       });
// // //     } catch (error) {
// // //       toast({
// // //         title: "Error",
// // //         description: error instanceof Error ? error.message : "Failed to delete hotel",
// // //         variant: "destructive",
// // //       });
// // //     } finally {
// // //       setIsDeleteDialogOpen(false);
// // //       setDeleteHotelId(null);
// // //     }
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     if (!formData.shopName || !formData.shopAddress || formData.noOfTables <= 0) {
// // //       toast({
// // //         title: "Validation error",
// // //         description: "Please fill all required fields correctly",
// // //         variant: "destructive",
// // //       });
// // //       return;
// // //     }

// // //     try {
// // //       if (selectedHotel) {
// // //         const updated = await hotelsApi.update(selectedHotel.id, formData);
// // //         setHotels(prev => prev.map(h => h.id === selectedHotel.id ? updated : h));
// // //         toast({
// // //           title: "Hotel updated",
// // //           description: "Hotel details have been updated successfully",
// // //         });
// // //       } else {
// // //         const newHotel = await hotelsApi.create(formData);
// // //         setHotels(prev => [...prev, newHotel]);
// // //         toast({
// // //           title: "Hotel added",
// // //           description: "New hotel has been added successfully",
// // //         });
// // //       }
// // //       setIsDialogOpen(false);
// // //     } catch (error) {
// // //       toast({
// // //         title: "Error",
// // //         description: error instanceof Error ? error.message : "Failed to save hotel",
// // //         variant: "destructive",
// // //       });
// // //     }
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div className="flex items-center justify-center min-h-screen">
// // //         <div className="text-lg">Loading...</div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="container mx-auto p-6 space-y-6">
// // //       <div className="flex justify-between items-center">
// // //         <div>
// // //           <h1 className="text-3xl font-bold tracking-tight">Hotel Settings</h1>
// // //           <p className="text-muted-foreground mt-2">
// // //             Manage your hotel information and configuration
// // //           </p>
// // //         </div>
// // //         <Button onClick={handleAdd}>
// // //           <Plus className="mr-2 h-4 w-4" />
// // //           Add Hotel
// // //         </Button>
// // //       </div>

// // //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// // //         {hotels.map((hotel) => (
// // //           <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
// // //             <CardHeader>
// // //               <div className="flex items-start justify-between">
// // //                 <Building2 className="h-8 w-8 text-primary mb-2" />
// // //                 <div className="flex gap-2">
// // //                   <Button
// // //                     variant="ghost"
// // //                     size="icon"
// // //                     onClick={() => handleEdit(hotel)}
// // //                   >
// // //                     <Edit className="h-4 w-4" />
// // //                   </Button>
// // //                   <Button
// // //                     variant="ghost"
// // //                     size="icon"
// // //                     onClick={() => handleDelete(hotel.id)}
// // //                   >
// // //                     <Trash2 className="h-4 w-4" />
// // //                   </Button>
// // //                 </div>
// // //               </div>
// // //               <CardTitle>{hotel.shopName}</CardTitle>
// // //               <CardDescription>{hotel.shopAddress}</CardDescription>
// // //             </CardHeader>
// // //             <CardContent className="space-y-2">
// // //               <p className="text-sm text-muted-foreground">{hotel.shopDescription}</p>
// // //               <div className="flex items-center gap-2 text-sm">
// // //                 <span className="font-semibold">Tables:</span>
// // //                 <span>{hotel.noOfTables}</span>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         ))}
// // //       </div>

// // //       {hotels.length === 0 && (
// // //         <div className="text-center py-12">
// // //           <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
// // //           <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
// // //           <p className="text-muted-foreground mb-4">
// // //             Get started by adding your first hotel
// // //           </p>
// // //           <Button onClick={handleAdd}>
// // //             <Plus className="mr-2 h-4 w-4" />
// // //             Add Hotel
// // //           </Button>
// // //         </div>
// // //       )}

// // //       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// // //         <DialogContent>
// // //           <DialogHeader>
// // //             <DialogTitle>
// // //               {selectedHotel ? "Edit Hotel" : "Add New Hotel"}
// // //             </DialogTitle>
// // //             <DialogDescription>
// // //               {selectedHotel
// // //                 ? "Update the hotel information below"
// // //                 : "Enter the details for the new hotel"}
// // //             </DialogDescription>
// // //           </DialogHeader>
// // //           <form onSubmit={handleSubmit}>
// // //             <div className="space-y-4 py-4">
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="shopName">Shop Name *</Label>
// // //                 <Input
// // //                   id="shopName"
// // //                   value={formData.shopName}
// // //                   onChange={(e) =>
// // //                     setFormData({ ...formData, shopName: e.target.value })
// // //                   }
// // //                   placeholder="Enter shop name"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="shopAddress">Shop Address *</Label>
// // //                 <Input
// // //                   id="shopAddress"
// // //                   value={formData.shopAddress}
// // //                   onChange={(e) =>
// // //                     setFormData({ ...formData, shopAddress: e.target.value })
// // //                   }
// // //                   placeholder="Enter shop address"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="shopDescription">Description</Label>
// // //                 <Textarea
// // //                   id="shopDescription"
// // //                   value={formData.shopDescription}
// // //                   onChange={(e) =>
// // //                     setFormData({ ...formData, shopDescription: e.target.value })
// // //                   }
// // //                   placeholder="Enter shop description"
// // //                   rows={3}
// // //                 />
// // //               </div>
// // //               <div className="space-y-2">
// // //                 <Label htmlFor="noOfTables">Number of Tables *</Label>
// // //                 <Input
// // //                   id="noOfTables"
// // //                   type="number"
// // //                   min="1"
// // //                   value={formData.noOfTables || ""}
// // //                   onChange={(e) =>
// // //                     setFormData({ ...formData, noOfTables: parseInt(e.target.value) || 0 })
// // //                   }
// // //                   placeholder="Enter number of tables"
// // //                   required
// // //                 />
// // //               </div>
// // //             </div>
// // //             <DialogFooter>
// // //               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
// // //                 Cancel
// // //               </Button>
// // //               <Button type="submit">
// // //                 {selectedHotel ? "Update" : "Add"} Hotel
// // //               </Button>
// // //             </DialogFooter>
// // //           </form>
// // //         </DialogContent>
// // //       </Dialog>

// // //       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// // //         <AlertDialogContent>
// // //           <AlertDialogHeader>
// // //             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// // //             <AlertDialogDescription>
// // //               This action cannot be undone. This will permanently delete the hotel
// // //               from the system.
// // //             </AlertDialogDescription>
// // //           </AlertDialogHeader>
// // //           <AlertDialogFooter>
// // //             <AlertDialogCancel>Cancel</AlertDialogCancel>
// // //             <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
// // //           </AlertDialogFooter>
// // //         </AlertDialogContent>
// // //       </AlertDialog>
// // //     </div>
// // //   );
// // // };

// // // export default HotelSettings;
// // import { useState, useEffect } from "react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
// // import { toast } from "@/hooks/use-toast";
// // import { Plus, Edit, Trash2, Building2 } from "lucide-react";

// // interface TableConfig {
// //   id: string;
// //   name: string;
// // }

// // interface Hotel {
// //   id: string;
// //   shopName: string;
// //   shopAddress: string;
// //   shopDescription: string;
// //   noOfTables: number;
// //   tables: TableConfig[];
// // }

// // const generateId = () => `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// // const HotelSettings = () => {
// //   const [hotels, setHotels] = useState<Hotel[]>([]);
// //   const [isDialogOpen, setIsDialogOpen] = useState(false);
// //   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
// //   const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
// //   const [deleteHotelId, setDeleteHotelId] = useState<string | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [formData, setFormData] = useState({
// //     shopName: "",
// //     shopAddress: "",
// //     shopDescription: "",
// //     noOfTables: 0,
// //     tables: [] as TableConfig[],
// //   });
// //   const [newTableName, setNewTableName] = useState("");

// //   useEffect(() => {
// //     loadHotels();
// //   }, []);

// //   useEffect(() => {
// //     if (!loading) {
// //       localStorage.setItem('hotels', JSON.stringify(hotels));
// //     }
// //   }, [hotels, loading]);

// //   const loadHotels = () => {
// //     try {
// //       setLoading(true);
// //       const storedHotels = localStorage.getItem('hotels');
// //       if (storedHotels) {
// //         setHotels(JSON.parse(storedHotels));
// //       }
// //     } catch (error) {
// //       toast({
// //         title: "Error",
// //         description: "Failed to load hotels from storage",
// //         variant: "destructive",
// //       });
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAdd = () => {
// //     setSelectedHotel(null);
// //     setFormData({
// //       shopName: "",
// //       shopAddress: "",
// //       shopDescription: "",
// //       noOfTables: 0,
// //       tables: [],
// //     });
// //     setNewTableName("");
// //     setIsDialogOpen(true);
// //   };

// //   const handleEdit = (hotel: Hotel) => {
// //     setSelectedHotel(hotel);
// //     setFormData({
// //       shopName: hotel.shopName,
// //       shopAddress: hotel.shopAddress,
// //       shopDescription: hotel.shopDescription,
// //       noOfTables: hotel.noOfTables,
// //       tables: hotel.tables || [],
// //     });
// //     setNewTableName("");
// //     setIsDialogOpen(true);
// //   };

// //   const handleAddTable = () => {
// //     if (!newTableName.trim()) {
// //       toast({
// //         title: "Error",
// //         description: "Please enter a table name",
// //         variant: "destructive",
// //       });
// //       return;
// //     }
// //     const newTable: TableConfig = {
// //       id: `table_${Date.now()}`,
// //       name: newTableName.trim(),
// //     };
// //     setFormData(prev => ({
// //       ...prev,
// //       tables: [...prev.tables, newTable],
// //       noOfTables: prev.tables.length + 1,
// //     }));
// //     setNewTableName("");
// //   };

// //   const handleRemoveTable = (tableId: string) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       tables: prev.tables.filter(t => t.id !== tableId),
// //       noOfTables: prev.tables.length - 1,
// //     }));
// //   };

// //   const handleDelete = (id: string) => {
// //     setDeleteHotelId(id);
// //     setIsDeleteDialogOpen(true);
// //   };

// //   const confirmDelete = () => {
// //     if (!deleteHotelId) return;

// //     setHotels(prev => prev.filter(h => h.id !== deleteHotelId));
// //     toast({
// //       title: "Hotel deleted",
// //       description: "Hotel has been deleted successfully",
// //     });
// //     setIsDeleteDialogOpen(false);
// //     setDeleteHotelId(null);
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (!formData.shopName || !formData.shopAddress || formData.tables.length === 0) {
// //       toast({
// //         title: "Validation error",
// //         description: "Please fill all required fields and add at least one table",
// //         variant: "destructive",
// //       });
// //       return;
// //     }

// //     if (selectedHotel) {
// //       setHotels(prev => prev.map(h => h.id === selectedHotel.id ? { ...formData, id: selectedHotel.id } : h));
// //       toast({
// //         title: "Hotel updated",
// //         description: "Hotel details have been updated successfully",
// //       });
// //     } else {
// //       const newHotel: Hotel = {
// //         ...formData,
// //         id: generateId(),
// //       };
// //       setHotels(prev => [...prev, newHotel]);
// //       toast({
// //         title: "Hotel added",
// //         description: "New hotel has been added successfully",
// //       });
// //     }
// //     setIsDialogOpen(false);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen">
// //         <div className="text-lg">Loading...</div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="container mx-auto p-6 space-y-6">
// //       <div className="flex justify-between items-center">
// //         <div>
// //           <h1 className="text-3xl font-bold tracking-tight">Hotel Settings</h1>
// //           <p className="text-muted-foreground mt-2">
// //             Manage your hotel information and configuration
// //           </p>
// //         </div>
// //         <Button onClick={handleAdd}>
// //           <Plus className="mr-2 h-4 w-4" />
// //           Add Hotel
// //         </Button>
// //       </div>

// //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
// //         {hotels.map((hotel) => (
// //           <Card key={hotel.id} className="hover:shadow-lg transition-shadow">
// //             <CardHeader>
// //               <div className="flex items-start justify-between">
// //                 <Building2 className="h-8 w-8 text-primary mb-2" />
// //                 <div className="flex gap-2">
// //                   <Button
// //                     variant="ghost"
// //                     size="icon"
// //                     onClick={() => handleEdit(hotel)}
// //                   >
// //                     <Edit className="h-4 w-4" />
// //                   </Button>
// //                   <Button
// //                     variant="ghost"
// //                     size="icon"
// //                     onClick={() => handleDelete(hotel.id)}
// //                   >
// //                     <Trash2 className="h-4 w-4" />
// //                   </Button>
// //                 </div>
// //               </div>
// //               <CardTitle>{hotel.shopName}</CardTitle>
// //               <CardDescription>{hotel.shopAddress}</CardDescription>
// //             </CardHeader>
// //             <CardContent className="space-y-2">
// //               <p className="text-sm text-muted-foreground">{hotel.shopDescription}</p>
// //               <div className="flex items-center gap-2 text-sm">
// //                 <span className="font-semibold">Tables:</span>
// //                 <span>{hotel.noOfTables}</span>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         ))}
// //       </div>

// //       {hotels.length === 0 && (
// //         <div className="text-center py-12">
// //           <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
// //           <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
// //           <p className="text-muted-foreground mb-4">
// //             Get started by adding your first hotel
// //           </p>
// //           <Button onClick={handleAdd}>
// //             <Plus className="mr-2 h-4 w-4" />
// //             Add Hotel
// //           </Button>
// //         </div>
// //       )}

// //       <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
// //         <DialogContent>
// //           <DialogHeader>
// //             <DialogTitle>
// //               {selectedHotel ? "Edit Hotel" : "Add New Hotel"}
// //             </DialogTitle>
// //             <DialogDescription>
// //               {selectedHotel
// //                 ? "Update the hotel information below"
// //                 : "Enter the details for the new hotel"}
// //             </DialogDescription>
// //           </DialogHeader>
// //           <form onSubmit={handleSubmit}>
// //             <div className="space-y-4 py-4">
// //               <div className="space-y-2">
// //                 <Label htmlFor="shopName">Shop Name *</Label>
// //                 <Input
// //                   id="shopName"
// //                   value={formData.shopName}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, shopName: e.target.value })
// //                   }
// //                   placeholder="Enter shop name"
// //                   required
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="shopAddress">Shop Address *</Label>
// //                 <Input
// //                   id="shopAddress"
// //                   value={formData.shopAddress}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, shopAddress: e.target.value })
// //                   }
// //                   placeholder="Enter shop address"
// //                   required
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label htmlFor="shopDescription">Description</Label>
// //                 <Textarea
// //                   id="shopDescription"
// //                   value={formData.shopDescription}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, shopDescription: e.target.value })
// //                   }
// //                   placeholder="Enter shop description"
// //                   rows={3}
// //                 />
// //               </div>
// //               <div className="space-y-2">
// //                 <Label>Tables *</Label>
// //                 <div className="flex gap-2">
// //                   <Input
// //                     value={newTableName}
// //                     onChange={(e) => setNewTableName(e.target.value)}
// //                     placeholder="Enter table/kudil name"
// //                     onKeyDown={(e) => {
// //                       if (e.key === 'Enter') {
// //                         e.preventDefault();
// //                         handleAddTable();
// //                       }
// //                     }}
// //                   />
// //                   <Button type="button" onClick={handleAddTable} size="icon">
// //                     <Plus className="h-4 w-4" />
// //                   </Button>
// //                 </div>
// //                 {formData.tables.length > 0 && (
// //                   <div className="mt-2 space-y-1">
// //                     {formData.tables.map((table, index) => (
// //                       <div key={table.id} className="flex items-center justify-between p-2 bg-muted rounded">
// //                         <span className="text-sm">{index + 1}. {table.name}</span>
// //                         <Button
// //                           type="button"
// //                           variant="ghost"
// //                           size="icon"
// //                           className="h-6 w-6"
// //                           onClick={() => handleRemoveTable(table.id)}
// //                         >
// //                           <Trash2 className="h-3 w-3" />
// //                         </Button>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 )}
// //                 <p className="text-xs text-muted-foreground">
// //                   Total: {formData.tables.length} table(s)
// //                 </p>
// //               </div>
// //             </div>
// //             <DialogFooter>
// //               <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
// //                 Cancel
// //               </Button>
// //               <Button type="submit">
// //                 {selectedHotel ? "Update" : "Add"} Hotel
// //               </Button>
// //             </DialogFooter>
// //           </form>
// //         </DialogContent>
// //       </Dialog>

// //       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
// //         <AlertDialogContent>
// //           <AlertDialogHeader>
// //             <AlertDialogTitle>Are you sure?</AlertDialogTitle>
// //             <AlertDialogDescription>
// //               This action cannot be undone. This will permanently delete the hotel
// //               from the system.
// //             </AlertDialogDescription>
// //           </AlertDialogHeader>
// //           <AlertDialogFooter>
// //             <AlertDialogCancel>Cancel</AlertDialogCancel>
// //             <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
// //           </AlertDialogFooter>
// //         </AlertDialogContent>
// //       </AlertDialog>
// //     </div>
// //   );
// // };

// // export default HotelSettings;
// import { useState, useEffect } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { toast } from "@/hooks/use-toast";
// import { Building2, Table, RefreshCw } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { hotelsApi } from "@/services/api";
// import { useApp } from "@/contexts/AppContext";

// interface TableConfig {
//   id: string;
//   name: string;
//   c_no: string;
//   Shop: string;
// }

// interface Hotel {
//   id: string;
//   name: string;
//   location: string;
//   no_table: string | null;
// }

// const HotelSettings = () => {
//   const { appParams } = useApp();
//   const [hotel, setHotel] = useState<Hotel | null>(null);
//   const [tables, setTables] = useState<TableConfig[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadHotelData();
//   }, [appParams.c_no, appParams.type]);

//   const loadHotelData = async () => {
//     try {
//       setLoading(true);

//       // Fetch shop details
//       const shopResponse = await hotelsApi.getShopDetails(appParams.c_no, appParams.type);
//       if (shopResponse.shop && shopResponse.shop.length > 0) {
//         setHotel(shopResponse.shop[0]);
//       } else {
//         setHotel(null);
//       }

//       // Fetch tables
//       const tablesResponse = await hotelsApi.getTables(appParams.c_no);
//       if (tablesResponse.Tables) {
//         setTables(tablesResponse.Tables);
//       } else {
//         setTables([]);
//       }

//       toast({
//         title: "Success",
//         description: "Hotel and table information loaded successfully",
//       });
//     } catch (error) {
//       console.error("Error loading hotel data:", error);
//       toast({
//         title: "Error",
//         description: error instanceof Error ? error.message : "Failed to load hotel data",
//         variant: "destructive",
//       });
//       setHotel(null);
//       setTables([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
//         <div className="text-center">
//           <RefreshCw className="h-8 w-8 animate-spin mx-auto text-primary mb-4" />
//           <div className="text-lg">Loading hotel information...</div>
//         </div>
//       </div>
//     );
//   }

//   if (!hotel) {
//     return (
//       <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
//         <div className="text-center">
//           <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//           <h3 className="text-lg font-semibold mb-2">No hotel found</h3>
//           <p className="text-muted-foreground mb-4">
//             Unable to load hotel information for shop #{appParams.c_no}
//           </p>
//           <Button onClick={loadHotelData}>
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Retry
//           </Button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4 md:p-6 space-y-6">
//       <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Hotel Settings</h1>
//           <p className="text-muted-foreground mt-2">
//             View your hotel information and table configuration
//           </p>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="text-sm text-muted-foreground">
//             Shop ID: <span className="font-medium">{appParams.c_no}</span> |
//             Type: <span className="font-medium">{appParams.type}</span>
//           </div>
//           <Button variant="outline" size="sm" onClick={loadHotelData}>
//             <RefreshCw className="h-4 w-4 mr-2" />
//             Refresh
//           </Button>
//         </div>
//       </div>

//       {/* Hotel Information Card */}
//       <Card className="hover:shadow-lg transition-shadow">
//         <CardHeader>
//           <div className="flex items-start gap-4">
//             <Building2 className="h-10 w-10 text-primary flex-shrink-0" />
//             <div className="flex-1 min-w-0">
//               <CardTitle className="text-xl md:text-2xl mb-2 break-words">{hotel.name}</CardTitle>
//               <CardDescription className="text-sm md:text-base break-words">{hotel.location}</CardDescription>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-1">
//               <p className="text-sm font-medium text-muted-foreground">Shop ID</p>
//               <p className="text-lg font-semibold">{hotel.id}</p>
//             </div>
//             <div className="space-y-1">
//               <p className="text-sm font-medium text-muted-foreground">Total Tables</p>
//               <p className="text-lg font-semibold">{tables.length}</p>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Tables Section */}
//       <div className="space-y-4">
//         <div className="flex items-center gap-2">
//           <Table className="h-5 w-5" />
//           <h2 className="text-xl md:text-2xl font-bold">Tables / Kudils</h2>
//           <span className="text-sm text-muted-foreground ml-2">({tables.length} total)</span>
//         </div>

//         {tables.length > 0 ? (
//           <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {tables.map((table, index) => (
//               <Card key={table.id} className="hover:shadow-md transition-shadow">
//                 <CardHeader className="pb-3">
//                   <div className="flex items-center gap-3">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
//                       {index + 1}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <CardTitle className="text-base md:text-lg truncate">{table.name}</CardTitle>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-1 text-xs md:text-sm text-muted-foreground">
//                     <p>ID: {table.id}</p>
//                     <p>Shop: {table.c_no}</p>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         ) : (
//           <Card>
//             <CardContent className="flex flex-col items-center justify-center py-12">
//               <Table className="h-12 w-12 text-muted-foreground mb-4" />
//               <h3 className="text-lg font-semibold mb-2">No tables configured</h3>
//               <p className="text-muted-foreground text-center">
//                 No tables have been set up for this hotel yet.
//               </p>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       {/* Summary Card */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Summary</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2 text-sm">
//             <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//               <span className="text-muted-foreground">Hotel Name:</span>
//               <span className="font-medium break-words">{hotel.name}</span>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//               <span className="text-muted-foreground">Location:</span>
//               <span className="font-medium break-words sm:text-right">{hotel.location}</span>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//               <span className="text-muted-foreground">Total Configured Tables:</span>
//               <span className="font-medium">{tables.length}</span>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//               <span className="text-muted-foreground">Shop Number:</span>
//               <span className="font-medium">{appParams.c_no}</span>
//             </div>
//             <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
//               <span className="text-muted-foreground">Type:</span>
//               <span className="font-medium">{appParams.type}</span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default HotelSettings;
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Building2, Table, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        hotelsApi.getTables(appParams.c_no)
      ]);

      if (shopResponse.shop && shopResponse.shop.length > 0) {
        setHotel(shopResponse.shop[0]);
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
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to load hotel data",
        variant: "destructive",
      });
      setHotel(null);
      setTables([]);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [appParams.c_no, appParams.type]);

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
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Hotel Settings</h1>
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
              <CardTitle className="text-xl md:text-2xl mb-2 break-words">{hotel.name}</CardTitle>
              <CardDescription className="text-sm md:text-base break-words">{hotel.location}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Shop ID</p>
              <p className="text-lg font-semibold">{hotel.id}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Tables</p>
              <p className="text-lg font-semibold">{tables.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Table className="h-5 w-5" />
          <h2 className="text-xl md:text-2xl font-bold">Tables / Kudils</h2>
          <span className="text-sm text-muted-foreground ml-2">({tables.length} total)</span>
        </div>

        {tables.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tables.map((table, index) => (
              <Card key={table.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base md:text-lg truncate">{table.name}</CardTitle>
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
              <h3 className="text-lg font-semibold mb-2">No tables configured</h3>
              <p className="text-muted-foreground text-center">
                No tables have been set up for this hotel yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Hotel Name:</span>
              <span className="font-medium break-words">{hotel.name}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Location:</span>
              <span className="font-medium break-words sm:text-right">{hotel.location}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Total Configured Tables:</span>
              <span className="font-medium">{tables.length}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Shop Number:</span>
              <span className="font-medium">{appParams.c_no}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-muted-foreground">Type:</span>
              <span className="font-medium">{appParams.type}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelSettings;