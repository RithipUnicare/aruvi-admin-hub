// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from 'react';
// import { Plus, Edit, Trash2 } from 'lucide-react';
// import { useApp } from '@/contexts/AppContext';
// import { Button } from '@/components/ui/button';
// import { Card } from '@/components/ui/card';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { toast } from '@/hooks/use-toast';

// export default function Products() {
//   const { products, categories, addProduct, updateProduct, deleteProduct } = useApp();
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<string | null>(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     price: '',
//     categoryId: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.name || !formData.price || !formData.categoryId) {
//       toast({
//         title: "Invalid Input",
//         description: "Please fill all fields",
//         variant: "destructive",
//       });
//       return;
//     }

//     const productData = {
//       name: formData.name,
//       price: parseFloat(formData.price),
//       categoryId: formData.categoryId,
//     };

//     if (editingProduct) {
//       updateProduct(editingProduct, productData);
//       toast({
//         title: "Product Updated",
//         description: `${formData.name} has been updated`,
//       });
//     } else {
//       addProduct(productData);
//       toast({
//         title: "Product Added",
//         description: `${formData.name} has been added`,
//       });
//     }

//     setIsDialogOpen(false);
//     setEditingProduct(null);
//     setFormData({ name: '', price: '', categoryId: '' });
//   };

//   const handleEdit = (product: any) => {
//     setEditingProduct(product.id);
//     setFormData({
//       name: product.name,
//       price: product.price.toString(),
//       categoryId: product.categoryId,
//     });
//     setIsDialogOpen(true);
//   };

//   const handleDelete = (id: string, name: string) => {
//     if (confirm(`Are you sure you want to delete ${name}?`)) {
//       deleteProduct(id);
//       toast({
//         title: "Product Deleted",
//         description: `${name} has been removed`,
//       });
//     }
//   };

//   const getCategoryName = (categoryId: string) => {
//     return categories.find(c => c.id === categoryId)?.name || 'Unknown';
//   };

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold text-foreground">Products</h1>
//           <p className="text-muted-foreground mt-1">Manage all products</p>
//         </div>
//         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//           <DialogTrigger asChild>
//             <Button size="lg" onClick={() => {
//               setEditingProduct(null);
//               setFormData({ name: '', price: '', categoryId: '' });
//             }}>
//               <Plus className="w-5 h-5 mr-2" />
//               Add Product
//             </Button>
//           </DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               <DialogTitle>
//                 {editingProduct ? 'Edit Product' : 'Add New Product'}
//               </DialogTitle>
//             </DialogHeader>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <Label htmlFor="name">Product Name</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   placeholder="Enter product name"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="price">Price (₹)</Label>
//                 <Input
//                   id="price"
//                   type="number"
//                   step="0.01"
//                   value={formData.price}
//                   onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//                   placeholder="Enter price"
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="category">Category</Label>
//                 <Select
//                   value={formData.categoryId}
//                   onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select category" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {categories.map((cat) => (
//                       <SelectItem key={cat.id} value={cat.id}>
//                         {cat.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <Button type="submit" className="w-full">
//                 {editingProduct ? 'Update Product' : 'Add Product'}
//               </Button>
//             </form>
//           </DialogContent>
//         </Dialog>
//       </div>

//       <Card>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Category</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products.map((product) => (
//               <TableRow key={product.id}>
//                 <TableCell className="font-medium">{product.name}</TableCell>
//                 <TableCell>₹{product.price}</TableCell>
//                 <TableCell>{getCategoryName(product.categoryId)}</TableCell>
//                 <TableCell className="text-right">
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleEdit(product)}
//                   >
//                     <Edit className="w-4 h-4" />
//                   </Button>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => handleDelete(product.id, product.name)}
//                   >
//                     <Trash2 className="w-4 h-4 text-destructive" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Card>
//     </div>
//   );
// }
import { useState, useMemo } from 'react';
import { Loader2, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function Products() {
  const { products, categories, loading } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  // Group products by category
  const productsByCategory = useMemo(() => {
    const grouped: Record<string, typeof products> = {};
    filteredProducts.forEach(product => {
      const categoryId = product.categoryId;
      if (!grouped[categoryId]) {
        grouped[categoryId] = [];
      }
      grouped[categoryId].push(product);
    });
    return grouped;
  }, [filteredProducts]);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const toggleCategory = (categoryId: string) => {
    setOpenCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Initialize all categories as open by default
  const isCategoryOpen = (categoryId: string) => {
    return openCategories[categoryId] !== false;
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Products</h1>
        <p className="text-muted-foreground mt-1">View all products ({products.length} items)</p>
      </div>

      {/* Search Input */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filtered results count */}
      {searchQuery && (
        <p className="text-sm text-muted-foreground mb-4">
          Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} matching "{searchQuery}"
        </p>
      )}

      {/* Products grouped by category */}
      <div className="space-y-4">
        {categories.map(category => {
          const categoryProducts = productsByCategory[category.id] || [];
          if (categoryProducts.length === 0) return null;

          return (
            <Collapsible
              key={category.id}
              open={isCategoryOpen(category.id)}
              onOpenChange={() => toggleCategory(category.id)}
            >
              <Card>
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {isCategoryOpen(category.id) ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                    <h2 className="text-lg font-semibold">{category.name}</h2>
                    <span className="text-sm text-muted-foreground">
                      ({categoryProducts.length} items)
                    </span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categoryProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell className="text-right">₹{product.price}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-muted-foreground text-center py-8">
          {searchQuery ? 'No products match your search' : 'No products found'}
        </p>
      )}
    </div>
  );
}
