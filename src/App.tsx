// // import { Toaster } from "@/components/ui/toaster";
// // import { Toaster as Sonner } from "@/components/ui/sonner";
// // import { TooltipProvider } from "@/components/ui/tooltip";
// // import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { AppProvider } from "./contexts/AppContext";
// // import { Layout } from "./components/Layout";
// // import { ProtectedRoute } from "./components/ProtectedRoute";
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// // import BillScreen from "./pages/BillScreen";
// // import Products from "./pages/Products";
// // import Categories from "./pages/Categories";
// // import Waiters from "./pages/Waiters";
// // import Analytics from "./pages/Analytics";
// // import History from "./pages/History";
// // import HotelSettings from "./pages/HotelSettings";
// // import NotFound from "./pages/NotFound";

// // const queryClient = new QueryClient();

// // const App = () => (
// //   <QueryClientProvider client={queryClient}>
// //     <AppProvider>
// //       <TooltipProvider>
// //         <Toaster />
// //         <Sonner />
// //         <BrowserRouter>
// //           <Routes>
// //             <Route path="/login" element={<Login />} />
// //             <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
// //             <Route path="/bill/:kudilNumber" element={<ProtectedRoute><Layout><BillScreen /></Layout></ProtectedRoute>} />
// //             <Route path="/products" element={<ProtectedRoute><Layout><Products /></Layout></ProtectedRoute>} />
// //             <Route path="/categories" element={<ProtectedRoute><Layout><Categories /></Layout></ProtectedRoute>} />
// //             <Route path="/waiters" element={<ProtectedRoute><Layout><Waiters /></Layout></ProtectedRoute>} />
// //             <Route path="/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
// //             <Route path="/history" element={<ProtectedRoute><Layout><History /></Layout></ProtectedRoute>} />
// //             <Route path="/settings" element={<ProtectedRoute><Layout><HotelSettings /></Layout></ProtectedRoute>} />
// //             <Route path="*" element={<NotFound />} />
// //           </Routes>
// //         </BrowserRouter>
// //       </TooltipProvider>
// //     </AppProvider>
// //   </QueryClientProvider>
// // );

// // export default App;
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import { useEffect } from "react";
// import { AppProvider } from "./contexts/AppContext";
// import { Layout } from "./components/Layout";
// import { ProtectedRoute } from "./components/ProtectedRoute";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import BillScreen from "./pages/BillScreen";
// import Products from "./pages/Products";
// import Categories from "./pages/Categories";
// import Waiters from "./pages/Waiters";
// import Analytics from "./pages/Analytics";
// import History from "./pages/History";
// import HotelSettings from "./pages/HotelSettings";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// // Component to preserve URL parameters across navigation
// const URLParamPreserver = ({ children }: { children: React.ReactNode }) => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     // Get current URL parameters
//     const params = new URLSearchParams(window.location.search);
//     const c_no = params.get('c_no');
//     const type = params.get('type');

//     // If we have params but they're not in the current location, add them
//     if ((c_no || type) && !location.search) {
//       const newSearch = new URLSearchParams();
//       if (c_no) newSearch.set('c_no', c_no);
//       if (type) newSearch.set('type', type);

//       navigate(`${location.pathname}?${newSearch.toString()}`, { replace: true });
//     }
//   }, [location.pathname]);

//   return <>{children}</>;
// };

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <AppProvider>
//       <TooltipProvider>
//         <Toaster />
//         <Sonner />
//         <BrowserRouter>
//           <URLParamPreserver>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
//               <Route path="/bill/:kudilNumber" element={<ProtectedRoute><Layout><BillScreen /></Layout></ProtectedRoute>} />
//               <Route path="/products" element={<ProtectedRoute><Layout><Products /></Layout></ProtectedRoute>} />
//               <Route path="/categories" element={<ProtectedRoute><Layout><Categories /></Layout></ProtectedRoute>} />
//               <Route path="/waiters" element={<ProtectedRoute><Layout><Waiters /></Layout></ProtectedRoute>} />
//               <Route path="/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
//               <Route path="/history" element={<ProtectedRoute><Layout><History /></Layout></ProtectedRoute>} />
//               <Route path="/settings" element={<ProtectedRoute><Layout><HotelSettings /></Layout></ProtectedRoute>} />
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </URLParamPreserver>
//         </BrowserRouter>
//       </TooltipProvider>
//     </AppProvider>
//   </QueryClientProvider>
// );

// export default App;
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BillScreen from "./pages/BillScreen";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Waiters from "./pages/Waiters";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import HotelSettings from "./pages/HotelSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
            <Route path="/bill/:kudilNumber" element={<ProtectedRoute><Layout><BillScreen /></Layout></ProtectedRoute>} />
            <Route path="/products" element={<ProtectedRoute><Layout><Products /></Layout></ProtectedRoute>} />
            <Route path="/categories" element={<ProtectedRoute><Layout><Categories /></Layout></ProtectedRoute>} />
            <Route path="/waiters" element={<ProtectedRoute><Layout><Waiters /></Layout></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><Layout><Analytics /></Layout></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><Layout><History /></Layout></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Layout><HotelSettings /></Layout></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;