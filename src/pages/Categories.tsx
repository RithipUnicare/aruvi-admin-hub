import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { useApp } from "@/contexts/AppContext";

interface Category {
  id: string;
  name: string;
}

export default function Categories() {
  const { categories, products, loading } = useApp();

  const getProductCount = (categoryId: string) => {
    return products.filter(p => p.categoryId === categoryId).length;
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
        <h1 className="text-3xl font-bold text-foreground">Categories</h1>
        <p className="text-muted-foreground mt-1">View product categories</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="p-6">
            <h3 className="text-lg font-semibold">{category.name}</h3>
          </Card>
        ))}
      </div>

      {categories.length === 0 && (
        <p className="text-muted-foreground text-center py-8">No categories found</p>
      )}
    </div>
  );
}
