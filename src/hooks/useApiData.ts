import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface ApiCategory {
    id: string;
    name: string;
}

interface ApiProduct {
    id: number;
    name: string;
    price?: number;
}

export interface Category {
    id: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    categoryId: string;
}

const DEFAULT_PRICE = 100; // Hardcoded price until backend adds price field

export function useApiData() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch categories first
            const categoriesResponse = await fetch('https://deepikagroups.in/admin/api/get_categories.php');
            const categoriesData = await categoriesResponse.json();
            const fetchedCategories: Category[] = (categoriesData.Categories || []).map((cat: ApiCategory) => ({
                id: cat.id,
                name: cat.name,
            }));

            setCategories(fetchedCategories);

            // Fetch products for each category
            const allProducts: Product[] = [];

            await Promise.all(
                fetchedCategories.map(async (category) => {
                    try {
                        const productsResponse = await fetch(
                            `https://deepikagroups.in/admin/api/get_ProductCategory.php?c_no=7&role=Godown&category_id=${category.id}`
                        );
                        const productsData = await productsResponse.json();

                        if (productsData.Products) {
                            productsData.Products.forEach((prod: ApiProduct) => {
                                allProducts.push({
                                    id: prod.id.toString(),
                                    name: prod.name,
                                    price: prod.price ?? DEFAULT_PRICE,
                                    categoryId: category.id,
                                });
                            });
                        }
                    } catch (error) {
                        console.error(`Failed to fetch products for category ${category.id}:`, error);
                    }
                })
            );

            setProducts(allProducts);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast({
                title: "Error",
                description: "Failed to load data from server",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        categories,
        products,
        loading,
        refreshData: fetchData,
    };
}
