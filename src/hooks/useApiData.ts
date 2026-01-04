// import { useState, useEffect } from 'react';
// import { toast } from '@/hooks/use-toast';

// interface ApiCategory {
//     id: string;
//     name: string;
// }

// interface ApiProduct {
//     id: number;
//     name: string;
//     price?: number;
// }

// export interface Category {
//     id: string;
//     name: string;
// }

// export interface Product {
//     id: string;
//     name: string;
//     price: number;
//     categoryId: string;
// }

// const DEFAULT_PRICE = 100; // Hardcoded price until backend adds price field

// // Helper to get URL parameters
// const getUrlParams = () => {
//     const params = new URLSearchParams(window.location.search);
//     return {
//         c_no: params.get('c_no') || '7',
//         type: params.get('type') || 'Godown'
//     };
// };

// export function useApiData() {
//     const [categories, setCategories] = useState<Category[]>([]);
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [currentParams, setCurrentParams] = useState(getUrlParams());

//     const fetchData = async () => {
//         try {
//             setLoading(true);
//             const params = getUrlParams();
//             setCurrentParams(params);

//             console.log(`Fetching data for c_no: ${params.c_no}, type: ${params.type}`);

//             // Fetch categories first
//             const categoriesResponse = await fetch('https://deepikagroups.in/admin/api/get_categories.php');
//             const categoriesData = await categoriesResponse.json();
//             const fetchedCategories: Category[] = (categoriesData.Categories || []).map((cat: ApiCategory) => ({
//                 id: cat.id,
//                 name: cat.name,
//             }));

//             setCategories(fetchedCategories);

//             // Fetch products for each category with dynamic c_no
//             const allProducts: Product[] = [];

//             await Promise.all(
//                 fetchedCategories.map(async (category) => {
//                     try {
//                         const productsResponse = await fetch(
//                             `https://deepikagroups.in/admin/api/get_ProductCategory.php?c_no=${params.c_no}&role=${params.type}&category_id=${category.id}`
//                         );
//                         const productsData = await productsResponse.json();

//                         if (productsData.Products) {
//                             productsData.Products.forEach((prod: ApiProduct) => {
//                                 allProducts.push({
//                                     id: prod.id.toString(),
//                                     name: prod.name,
//                                     price: prod.price ?? DEFAULT_PRICE,
//                                     categoryId: category.id,
//                                 });
//                             });
//                         }
//                     } catch (error) {
//                         console.error(`Failed to fetch products for category ${category.id}:`, error);
//                     }
//                 })
//             );

//             setProducts(allProducts);
//         } catch (error) {
//             console.error('Failed to fetch data:', error);
//             toast({
//                 title: "Error",
//                 description: "Failed to load data from server",
//                 variant: "destructive",
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchData();

//         // Listen for URL parameter changes
//         const handleParamChange = () => {
//             const newParams = getUrlParams();
//             if (newParams.c_no !== currentParams.c_no || newParams.type !== currentParams.type) {
//                 fetchData();
//             }
//         };

//         window.addEventListener('popstate', handleParamChange);

//         return () => {
//             window.removeEventListener('popstate', handleParamChange);
//         };
//     }, [currentParams]);

//     return {
//         categories,
//         products,
//         loading,
//         refreshData: fetchData,
//     };
// }

import { useState, useEffect, useRef, useCallback } from 'react';
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

// Helper to get URL parameters
const getUrlParams = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        c_no: params.get('c_no') || '7',
        type: params.get('type') || 'Godown'
    };
};

export function useApiData() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Use ref to track if initial load is done and prevent multiple simultaneous loads
    const initialLoadDone = useRef(false);
    const loadingRef = useRef(false);
    const lastParamsRef = useRef<string>('');

    const fetchData = useCallback(async () => {
        // Prevent multiple simultaneous loads
        if (loadingRef.current) {
            console.log('Load already in progress, skipping...');
            return;
        }

        try {
            loadingRef.current = true;
            setLoading(true);
            const params = getUrlParams();
            const paramsKey = `${params.c_no}-${params.type}`;

            console.log(`Fetching data for c_no: ${params.c_no}, type: ${params.type}`);

            // Fetch categories first
            const categoriesResponse = await fetch('https://deepikagroups.in/admin/api/get_categories.php');
            const categoriesData = await categoriesResponse.json();
            const fetchedCategories: Category[] = (categoriesData.Categories || []).map((cat: ApiCategory) => ({
                id: cat.id,
                name: cat.name,
            }));

            setCategories(fetchedCategories);

            // Fetch products for each category with dynamic c_no
            const allProducts: Product[] = [];

            await Promise.all(
                fetchedCategories.map(async (category) => {
                    try {
                        const productsResponse = await fetch(
                            `https://deepikagroups.in/admin/api/get_ProductCategory.php?c_no=${params.c_no}&role=${params.type}&category_id=${category.id}`
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
            lastParamsRef.current = paramsKey;
            initialLoadDone.current = true;

            console.log(`Data loaded successfully: ${fetchedCategories.length} categories, ${allProducts.length} products`);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            toast({
                title: "Error",
                description: "Failed to load data from server",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, []); // No dependencies to prevent recreation

    useEffect(() => {
        const params = getUrlParams();
        const paramsKey = `${params.c_no}-${params.type}`;

        // Only fetch if:
        // 1. Initial load not done yet, OR
        // 2. Parameters have actually changed
        if (!initialLoadDone.current || paramsKey !== lastParamsRef.current) {
            console.log('Parameters changed or initial load, fetching data...');
            fetchData();
        }
    }, []); // Empty dependency array - only run on mount

    // Separate effect to listen for URL changes
    useEffect(() => {
        const handleParamChange = () => {
            const params = getUrlParams();
            const paramsKey = `${params.c_no}-${params.type}`;

            // Only fetch if parameters actually changed
            if (paramsKey !== lastParamsRef.current) {
                console.log('URL parameters changed, refetching data...');
                fetchData();
            }
        };

        window.addEventListener('popstate', handleParamChange);

        return () => {
            window.removeEventListener('popstate', handleParamChange);
        };
    }, [fetchData]);

    return {
        categories,
        products,
        loading,
        refreshData: fetchData,
    };
}