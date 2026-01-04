// /* eslint-disable @typescript-eslint/no-explicit-any */
// //const BASE_URL = window.location.origin + "/v1";
// const BASE_URL =
//   "http://aruvi-salem-env.eba-ymet39eb.eu-north-1.elasticbeanstalk.com/v1";

// interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   message?: string;
//   error?: {
//     code: string;
//     message: string;
//     details: any;
//   };
// }

// // Generic API call handler
// async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
//   try {
//     const response = await fetch(`${BASE_URL}${endpoint}`, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...options?.headers,
//       },
//     });

//     const data: ApiResponse<T> = await response.json();

//     if (!data.success || !response.ok) {
//       throw new Error(data.error?.message || "API request failed");
//     }

//     return data.data as T;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw error;
//     }
//     throw new Error("An unexpected error occurred");
//   }
// }

// // Products API
// export const productsApi = {
//   getAll: () => apiCall<any[]>("/products"),
//   getById: (id: string) => apiCall<any>(`/products/${id}`),
//   create: (product: { name: string; price: number; categoryId: string }) =>
//     apiCall<any>("/products", {
//       method: "POST",
//       body: JSON.stringify(product),
//     }),
//   update: (
//     id: string,
//     product: { name: string; price: number; categoryId: string }
//   ) =>
//     apiCall<any>(`/products/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(product),
//     }),
//   delete: (id: string) =>
//     apiCall<void>(`/products/${id}`, { method: "DELETE" }),
// };

// // Categories API
// export const categoriesApi = {
//   getAll: () => apiCall<any[]>("/categories"),
//   create: (category: { name: string }) =>
//     apiCall<any>("/categories", {
//       method: "POST",
//       body: JSON.stringify(category),
//     }),
//   update: (id: string, category: { name: string }) =>
//     apiCall<any>(`/categories/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(category),
//     }),
//   delete: (id: string) =>
//     apiCall<void>(`/categories/${id}`, { method: "DELETE" }),
// };

// // Orders API
// export const ordersApi = {
//   getAll: () => apiCall<any[]>("/orders"),
//   getByKudilId: (kudilId: string) => apiCall<any>(`/orders/${kudilId}`),
//   addItem: (
//     kudilId: string,
//     item: {
//       productId: string;
//       productName: string;
//       quantity: number;
//       price: number;
//     }
//   ) =>
//     apiCall<any>(`/orders/${kudilId}/items`, {
//       method: "POST",
//       body: JSON.stringify(item),
//     }),
//   updateItemQuantity: (kudilId: string, productId: string, quantity: number) =>
//     apiCall<any>(`/orders/${kudilId}/items/${productId}`, {
//       method: "PUT",
//       body: JSON.stringify({ quantity }),
//     }),
//   removeItem: (kudilId: string, productId: string) =>
//     apiCall<void>(`/orders/${kudilId}/items/${productId}`, {
//       method: "DELETE",
//     }),
//   clearOrder: (kudilId: string) =>
//     apiCall<void>(`/orders/${kudilId}`, { method: "DELETE" }),
//   markComplete: (kudilId: string, completed: boolean) =>
//     apiCall<any>(`/orders/${kudilId}/complete`, {
//       method: "POST",
//       body: JSON.stringify({ completed }),
//     }),
// };

// // Billing API
// export const billingApi = {
//   print: (bill: {
//     kudilId: string;
//     waiterId?: string;
//     items: any[];
//     total: number;
//   }) =>
//     apiCall<any>("/bills/print", {
//       method: "POST",
//       body: JSON.stringify(bill),
//     }),
// };

// // History API
// export const historyApi = {
//   getAll: () => apiCall<any[]>("/history"),
//   getByDate: (date: string) => apiCall<any[]>(`/history?date=${date}`),
//   getById: (id: string) => apiCall<any>(`/history/${id}`),
// };

// // Waiters API
// export const waitersApi = {
//   getAll: () => apiCall<any[]>("/waiters"),
//   getById: (id: string) => apiCall<any>(`/waiters/${id}`),
//   create: (waiter: {
//     username: string;
//     password: string;
//     name: string;
//     phone: string;
//     email: string;
//     status: string;
//   }) =>
//     apiCall<any>("/waiters", {
//       method: "POST",
//       body: JSON.stringify(waiter),
//     }),
//   update: (id: string, waiter: Partial<any>) =>
//     apiCall<any>(`/waiters/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(waiter),
//     }),
//   delete: (id: string) => apiCall<void>(`/waiters/${id}`, { method: "DELETE" }),
//   addIssue: (waiterId: string, description: string) =>
//     apiCall<any>(`/waiters/${waiterId}/issues`, {
//       method: "POST",
//       body: JSON.stringify({ description }),
//     }),
//   getStats: (waiterId: string, date: string) =>
//     apiCall<any>(`/waiters/${waiterId}/stats?date=${date}`),
//   getCredentials: (waiterId: string) =>
//     apiCall<{ username: string; password: string }>(
//       `/waiters/${waiterId}/credentials`
//     ),
//   updateCredentials: (
//     waiterId: string,
//     credentials: { username: string; password: string }
//   ) =>
//     apiCall<any>(`/waiters/${waiterId}/credentials`, {
//       method: "PUT",
//       body: JSON.stringify(credentials),
//     }),
// };

// // Analytics API
// export const analyticsApi = {
//   getSales: (date: string) => apiCall<any>(`/analytics/sales?date=${date}`),
//   getTopProducts: (date: string, limit = 10) =>
//     apiCall<any[]>(`/analytics/products/top?date=${date}&limit=${limit}`),
//   getNonSellingProducts: (date: string) =>
//     apiCall<any[]>(`/analytics/products/non-selling?date=${date}`),
//   getCategorySales: (date: string) =>
//     apiCall<any[]>(`/analytics/categories?date=${date}`),
// };

// // Hotels API
// export const hotelsApi = {
//   getAll: () => apiCall<any[]>("/hotels"),
//   getById: (id: string) => apiCall<any>(`/hotels/${id}`),
//   create: (hotel: {
//     shopName: string;
//     shopAddress: string;
//     shopDescription: string;
//     noOfTables: number;
//   }) =>
//     apiCall<any>("/hotels", {
//       method: "POST",
//       body: JSON.stringify(hotel),
//     }),
//   update: (
//     id: string,
//     hotel: {
//       shopName: string;
//       shopAddress: string;
//       shopDescription: string;
//       noOfTables: number;
//     }
//   ) =>
//     apiCall<any>(`/hotels/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(hotel),
//     }),
//   delete: (id: string) => apiCall<void>(`/hotels/${id}`, { method: "DELETE" }),
// };
/* eslint-disable @typescript-eslint/no-explicit-any */
// const BASE_URL = "https://deepikagroups.in/admin/api";

// interface ApiResponse<T> {
//   success?: boolean;
//   data?: T;
//   message?: string;
//   error?: {
//     code: string;
//     message: string;
//     details: any;
//   };
// }

// // Helper to get URL parameters
// export const getUrlParams = () => {
//   const params = new URLSearchParams(window.location.search);
//   return {
//     c_no: params.get('c_no') || '7',
//     type: params.get('type') || 'Godown'
//   };
// };

// // Generic API call handler
// async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
//   try {
//     const response = await fetch(url, {
//       ...options,
//       headers: {
//         "Content-Type": "application/json",
//         ...options?.headers,
//       },
//     });

//     const data: any = await response.json();

//     // Handle different response structures
//     if (data.error) {
//       throw new Error(data.error);
//     }

//     return data as T;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw error;
//     }
//     throw new Error("An unexpected error occurred");
//   }
// }

// // Hotels API (now using external API)
// export const hotelsApi = {
//   getShopDetails: (c_no: string, type: string) =>
//     apiCall<{ shop: any[] }>(`${BASE_URL}/get_shopDetails.php?c_no=${c_no}&type=${type}`),

//   getTables: (c_no: string) =>
//     apiCall<{ Tables: any[] }>(`${BASE_URL}/get_tables.php?c_no=${c_no}`),
// };

// // Products API
// export const productsApi = {
//   getAll: () => apiCall<any[]>("/products"),
//   getById: (id: string) => apiCall<any>(`/products/${id}`),
//   create: (product: { name: string; price: number; categoryId: string }) =>
//     apiCall<any>("/products", {
//       method: "POST",
//       body: JSON.stringify(product),
//     }),
//   update: (
//     id: string,
//     product: { name: string; price: number; categoryId: string }
//   ) =>
//     apiCall<any>(`/products/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(product),
//     }),
//   delete: (id: string) =>
//     apiCall<void>(`/products/${id}`, { method: "DELETE" }),
// };

// // Categories API
// export const categoriesApi = {
//   getAll: () => apiCall<any[]>("/categories"),
//   create: (category: { name: string }) =>
//     apiCall<any>("/categories", {
//       method: "POST",
//       body: JSON.stringify(category),
//     }),
//   update: (id: string, category: { name: string }) =>
//     apiCall<any>(`/categories/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(category),
//     }),
//   delete: (id: string) =>
//     apiCall<void>(`/categories/${id}`, { method: "DELETE" }),
// };

// // Orders API
// export const ordersApi = {
//   getAll: () => apiCall<any[]>("/orders"),
//   getByKudilId: (kudilId: string) => apiCall<any>(`/orders/${kudilId}`),
//   addItem: (
//     kudilId: string,
//     item: {
//       productId: string;
//       productName: string;
//       quantity: number;
//       price: number;
//     }
//   ) =>
//     apiCall<any>(`/orders/${kudilId}/items`, {
//       method: "POST",
//       body: JSON.stringify(item),
//     }),
//   updateItemQuantity: (kudilId: string, productId: string, quantity: number) =>
//     apiCall<any>(`/orders/${kudilId}/items/${productId}`, {
//       method: "PUT",
//       body: JSON.stringify({ quantity }),
//     }),
//   removeItem: (kudilId: string, productId: string) =>
//     apiCall<void>(`/orders/${kudilId}/items/${productId}`, {
//       method: "DELETE",
//     }),
//   clearOrder: (kudilId: string) =>
//     apiCall<void>(`/orders/${kudilId}`, { method: "DELETE" }),
//   markComplete: (kudilId: string, completed: boolean) =>
//     apiCall<any>(`/orders/${kudilId}/complete`, {
//       method: "POST",
//       body: JSON.stringify({ completed }),
//     }),
// };

// // Billing API
// export const billingApi = {
//   print: (bill: {
//     kudilId: string;
//     waiterId?: string;
//     items: any[];
//     total: number;
//   }) =>
//     apiCall<any>("/bills/print", {
//       method: "POST",
//       body: JSON.stringify(bill),
//     }),
// };

// // History API
// export const historyApi = {
//   getAll: () => apiCall<any[]>("/history"),
//   getByDate: (date: string) => apiCall<any[]>(`/history?date=${date}`),
//   getById: (id: string) => apiCall<any>(`/history/${id}`),
// };

// // Waiters API
// export const waitersApi = {
//   getAll: () => apiCall<any[]>("/waiters"),
//   getById: (id: string) => apiCall<any>(`/waiters/${id}`),
//   create: (waiter: {
//     username: string;
//     password: string;
//     name: string;
//     phone: string;
//     email: string;
//     status: string;
//   }) =>
//     apiCall<any>("/waiters", {
//       method: "POST",
//       body: JSON.stringify(waiter),
//     }),
//   update: (id: string, waiter: Partial<any>) =>
//     apiCall<any>(`/waiters/${id}`, {
//       method: "PUT",
//       body: JSON.stringify(waiter),
//     }),
//   delete: (id: string) => apiCall<void>(`/waiters/${id}`, { method: "DELETE" }),
//   addIssue: (waiterId: string, description: string) =>
//     apiCall<any>(`/waiters/${waiterId}/issues`, {
//       method: "POST",
//       body: JSON.stringify({ description }),
//     }),
//   getStats: (waiterId: string, date: string) =>
//     apiCall<any>(`/waiters/${waiterId}/stats?date=${date}`),
//   getCredentials: (waiterId: string) =>
//     apiCall<{ username: string; password: string }>(
//       `/waiters/${waiterId}/credentials`
//     ),
//   updateCredentials: (
//     waiterId: string,
//     credentials: { username: string; password: string }
//   ) =>
//     apiCall<any>(`/waiters/${waiterId}/credentials`, {
//       method: "PUT",
//       body: JSON.stringify(credentials),
//     }),
// };

// // Analytics API
// export const analyticsApi = {
//   getSales: (date: string) => apiCall<any>(`/analytics/sales?date=${date}`),
//   getTopProducts: (date: string, limit = 10) =>
//     apiCall<any[]>(`/analytics/products/top?date=${date}&limit=${limit}`),
//   getNonSellingProducts: (date: string) =>
//     apiCall<any[]>(`/analytics/products/non-selling?date=${date}`),
//   getCategorySales: (date: string) =>
//     apiCall<any[]>(`/analytics/categories?date=${date}`),
// };
/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_URL = "https://deepikagroups.in/admin/api";
const OLD_BASE_URL = "http://aruvi-salem-env.eba-ymet39eb.eu-north-1.elasticbeanstalk.com/v1";

interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details: any;
  };
}

// Helper to get URL parameters
export const getUrlParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    c_no: params.get('c_no') || '7',
    type: params.get('type') || 'Godown'
  };
};

// Generic API call handler
async function apiCall<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data: any = await response.json();

    // Handle different response structures
    if (data.error) {
      throw new Error(data.error);
    }

    // For old API format
    if (data.success === false) {
      throw new Error(data.error?.message || "API request failed");
    }

    return data as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred");
  }
}

// Hotels API (new Deepika Groups API)
export const hotelsApi = {
  getShopDetails: (c_no: string, type: string) =>
    apiCall<{ shop: any[] }>(`${BASE_URL}/get_shopDetails.php?c_no=${c_no}&type=${type}`),

  getTables: (c_no: string) =>
    apiCall<{ Tables: any[] }>(`${BASE_URL}/get_tables.php?c_no=${c_no}`),
};

// Products API (old API)
export const productsApi = {
  getAll: () => apiCall<any>(`${OLD_BASE_URL}/products`).then(data => (data as any).data || data),
  getById: (id: string) => apiCall<any>(`${OLD_BASE_URL}/products/${id}`).then(data => (data as any).data || data),
  create: (product: { name: string; price: number; categoryId: string }) =>
    apiCall<any>(`${OLD_BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify(product),
    }).then(data => (data as any).data || data),
  update: (
    id: string,
    product: { name: string; price: number; categoryId: string }
  ) =>
    apiCall<any>(`${OLD_BASE_URL}/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(product),
    }).then(data => (data as any).data || data),
  delete: (id: string) =>
    apiCall<void>(`${OLD_BASE_URL}/products/${id}`, { method: "DELETE" }),
};

// Categories API (old API)
export const categoriesApi = {
  getAll: () => apiCall<any>(`${OLD_BASE_URL}/categories`).then(data => (data as any).data || data),
  create: (category: { name: string }) =>
    apiCall<any>(`${OLD_BASE_URL}/categories`, {
      method: "POST",
      body: JSON.stringify(category),
    }).then(data => (data as any).data || data),
  update: (id: string, category: { name: string }) =>
    apiCall<any>(`${OLD_BASE_URL}/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    }).then(data => (data as any).data || data),
  delete: (id: string) =>
    apiCall<void>(`${OLD_BASE_URL}/categories/${id}`, { method: "DELETE" }),
};

// Orders API (old API)
export const ordersApi = {
  getAll: () => apiCall<any>(`${OLD_BASE_URL}/orders`).then(data => (data as any).data || data),
  getByKudilId: (kudilId: string) => apiCall<any>(`${OLD_BASE_URL}/orders/${kudilId}`).then(data => (data as any).data || data),
  addItem: (
    kudilId: string,
    item: {
      productId: string;
      productName: string;
      quantity: number;
      price: number;
    }
  ) =>
    apiCall<any>(`${OLD_BASE_URL}/orders/${kudilId}/items`, {
      method: "POST",
      body: JSON.stringify(item),
    }).then(data => (data as any).data || data),
  updateItemQuantity: (kudilId: string, productId: string, quantity: number) =>
    apiCall<any>(`${OLD_BASE_URL}/orders/${kudilId}/items/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ quantity }),
    }).then(data => (data as any).data || data),
  removeItem: (kudilId: string, productId: string) =>
    apiCall<void>(`${OLD_BASE_URL}/orders/${kudilId}/items/${productId}`, {
      method: "DELETE",
    }),
  clearOrder: (kudilId: string) =>
    apiCall<void>(`${OLD_BASE_URL}/orders/${kudilId}`, { method: "DELETE" }),
  markComplete: (kudilId: string, completed: boolean) =>
    apiCall<any>(`${OLD_BASE_URL}/orders/${kudilId}/complete`, {
      method: "POST",
      body: JSON.stringify({ completed }),
    }).then(data => (data as any).data || data),
};

// Billing API (old API)
export const billingApi = {
  print: (bill: {
    kudilId: string;
    waiterId?: string;
    items: any[];
    total: number;
  }) =>
    apiCall<any>(`${OLD_BASE_URL}/bills/print`, {
      method: "POST",
      body: JSON.stringify(bill),
    }).then(data => (data as any).data || data),
};

// History API (old API)
export const historyApi = {
  getAll: () => apiCall<any>(`${OLD_BASE_URL}/history`).then(data => (data as any).data || data),
  getByDate: (date: string) => apiCall<any>(`${OLD_BASE_URL}/history?date=${date}`).then(data => (data as any).data || data),
  getById: (id: string) => apiCall<any>(`${OLD_BASE_URL}/history/${id}`).then(data => (data as any).data || data),
};

// Waiters API (old API)
export const waitersApi = {
  getAll: () => apiCall<any>(`${OLD_BASE_URL}/waiters`).then(data => (data as any).data || data),
  getById: (id: string) => apiCall<any>(`${OLD_BASE_URL}/waiters/${id}`).then(data => (data as any).data || data),
  create: (waiter: {
    username: string;
    password: string;
    name: string;
    phone: string;
    email: string;
    status: string;
  }) =>
    apiCall<any>(`${OLD_BASE_URL}/waiters`, {
      method: "POST",
      body: JSON.stringify(waiter),
    }).then(data => (data as any).data || data),
  update: (id: string, waiter: Partial<any>) =>
    apiCall<any>(`${OLD_BASE_URL}/waiters/${id}`, {
      method: "PUT",
      body: JSON.stringify(waiter),
    }).then(data => (data as any).data || data),
  delete: (id: string) => apiCall<void>(`${OLD_BASE_URL}/waiters/${id}`, { method: "DELETE" }),
  addIssue: (waiterId: string, description: string) =>
    apiCall<any>(`${OLD_BASE_URL}/waiters/${waiterId}/issues`, {
      method: "POST",
      body: JSON.stringify({ description }),
    }).then(data => (data as any).data || data),
  getStats: (waiterId: string, date: string) =>
    apiCall<any>(`${OLD_BASE_URL}/waiters/${waiterId}/stats?date=${date}`).then(data => (data as any).data || data),
  getCredentials: (waiterId: string) =>
    apiCall<{ username: string; password: string }>(
      `${OLD_BASE_URL}/waiters/${waiterId}/credentials`
    ).then(data => (data as any).data || data),
  updateCredentials: (
    waiterId: string,
    credentials: { username: string; password: string }
  ) =>
    apiCall<any>(`${OLD_BASE_URL}/waiters/${waiterId}/credentials`, {
      method: "PUT",
      body: JSON.stringify(credentials),
    }).then(data => (data as any).data || data),
};

// Analytics API (old API)
export const analyticsApi = {
  getSales: (date: string) => apiCall<any>(`${OLD_BASE_URL}/analytics/sales?date=${date}`).then(data => (data as any).data || data),
  getTopProducts: (date: string, limit = 10) =>
    apiCall<any[]>(`${OLD_BASE_URL}/analytics/products/top?date=${date}&limit=${limit}`).then(data => (data as any).data || data),
  getNonSellingProducts: (date: string) =>
    apiCall<any[]>(`${OLD_BASE_URL}/analytics/products/non-selling?date=${date}`).then(data => (data as any).data || data),
  getCategorySales: (date: string) =>
    apiCall<any[]>(`${OLD_BASE_URL}/analytics/categories?date=${date}`).then(data => (data as any).data || data),
};