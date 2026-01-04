// // import { Link, useLocation } from "react-router-dom";
// // import {
// //   Home,
// //   FileText,
// //   Package,
// //   FolderTree,
// //   History,
// //   Users,
// //   BarChart3,
// //   Building2,
// //   LogOut,
// // } from "lucide-react";
// // import { cn } from "@/lib/utils";
// // import { useApp } from "@/contexts/AppContext";
// // import { Button } from "@/components/ui/button";
// // import { useNavigate } from "react-router-dom";

// // export const Layout = ({ children }: { children: React.ReactNode }) => {
// //   const location = useLocation();
// //   const { logout } = useApp();
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     logout();
// //     navigate("/login");
// //   };

// //   const navItems = [
// //     { path: "/", icon: Home, label: "Dashboard" },
// //     { path: "/products", icon: Package, label: "Products" },
// //     { path: "/categories", icon: FolderTree, label: "Categories" },
// //     { path: "/waiters", icon: Users, label: "Waiters" },
// //     // { path: '/analytics', icon: BarChart3, label: 'Analytics' },
// //     { path: "/history", icon: History, label: "History" },
// //     { path: "/settings", icon: Building2, label: "Settings" },
// //   ];

// //   return (
// //     <div className="min-h-screen flex flex-col">
// //       <nav className="bg-card border-b border-border">
// //         <div className="max-w-7xl mx-auto px-4">
// //           <div className="flex items-center justify-between h-16">
// //             <div className="flex items-center">
// //               <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary" />
// //               <span className="ml-2 text-lg md:text-xl font-bold text-foreground">
// //                 Deepika Groups
// //               </span>
// //             </div>
// //             <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
// //               {navItems.map((item) => {
// //                 const Icon = item.icon;
// //                 const isActive = location.pathname === item.path;
// //                 return (
// //                   <Link
// //                     key={item.path}
// //                     to={item.path}
// //                     className={cn(
// //                       "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
// //                       isActive
// //                         ? "bg-primary text-primary-foreground"
// //                         : "text-muted-foreground hover:bg-muted hover:text-foreground"
// //                     )}
// //                   >
// //                     <Icon className="h-4 w-4 mr-2" />
// //                     {item.label}
// //                   </Link>
// //                 );
// //               })}
// //               <Button variant="ghost" size="sm" onClick={handleLogout}>
// //                 <LogOut className="h-4 w-4 mr-2" />
// //                 Logout
// //               </Button>
// //             </div>
// //             {/* Mobile nav */}
// //             <div className="flex md:hidden items-center overflow-x-auto gap-2">
// //               {navItems.map((item) => {
// //                 const Icon = item.icon;
// //                 const isActive = location.pathname === item.path;
// //                 return (
// //                   <Link
// //                     key={item.path}
// //                     to={item.path}
// //                     className={cn(
// //                       "flex items-center justify-center p-2 rounded-md transition-colors",
// //                       isActive
// //                         ? "bg-primary text-primary-foreground"
// //                         : "text-muted-foreground hover:bg-muted hover:text-foreground"
// //                     )}
// //                   >
// //                     <Icon className="h-5 w-5" />
// //                   </Link>
// //                 );
// //               })}
// //               <Button variant="ghost" size="icon" onClick={handleLogout}>
// //                 <LogOut className="h-5 w-5" />
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>
// //       <main className="flex-1 bg-background">{children}</main>
// //     </div>
// //   );
// // };
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   Home,
//   FileText,
//   Package,
//   FolderTree,
//   History,
//   Users,
//   Building2,
//   LogOut,
//   Store,
// } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { useApp } from "@/contexts/AppContext";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export const Layout = ({ children }: { children: React.ReactNode }) => {
//   const location = useLocation();
//   const { logout, appParams } = useApp();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     // Preserve URL params even on logout
//     const searchParams = new URLSearchParams();
//     searchParams.set('c_no', appParams.c_no);
//     searchParams.set('type', appParams.type);
//     navigate(`/login?${searchParams.toString()}`);
//   };

//   // Helper function to build navigation links with preserved params
//   const buildNavLink = (path: string) => {
//     const searchParams = new URLSearchParams();
//     searchParams.set('c_no', appParams.c_no);
//     searchParams.set('type', appParams.type);
//     return `${path}?${searchParams.toString()}`;
//   };

//   const navItems = [
//     { path: "/", icon: Home, label: "Dashboard" },
//     { path: "/products", icon: Package, label: "Products" },
//     { path: "/categories", icon: FolderTree, label: "Categories" },
//     { path: "/waiters", icon: Users, label: "Waiters" },
//     { path: "/history", icon: History, label: "History" },
//     { path: "/settings", icon: Building2, label: "Settings" },
//   ];

//   return (
//     <div className="min-h-screen flex flex-col">
//       <nav className="bg-card border-b border-border">
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center gap-3">
//               <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary" />
//               <div className="flex flex-col">
//                 <span className="text-lg md:text-xl font-bold text-foreground">
//                   Deepika Groups
//                 </span>
//                 <span className="text-xs text-muted-foreground hidden sm:block">
//                   Shop #{appParams.c_no} • {appParams.type}
//                 </span>
//               </div>
//             </div>

//             <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = location.pathname === item.path;
//                 return (
//                   <Link
//                     key={item.path}
//                     to={buildNavLink(item.path)}
//                     className={cn(
//                       "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
//                       isActive
//                         ? "bg-primary text-primary-foreground"
//                         : "text-muted-foreground hover:bg-muted hover:text-foreground"
//                     )}
//                   >
//                     <Icon className="h-4 w-4 mr-2" />
//                     {item.label}
//                   </Link>
//                 );
//               })}

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="sm">
//                     <Store className="h-4 w-4 mr-2" />
//                     Shop Info
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="w-56">
//                   <DropdownMenuLabel>Current Shop</DropdownMenuLabel>
//                   <DropdownMenuSeparator />
//                   <DropdownMenuItem disabled>
//                     <div className="flex flex-col gap-1 text-xs">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Shop ID:</span>
//                         <span className="font-medium">{appParams.c_no}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground">Type:</span>
//                         <span className="font-medium">{appParams.type}</span>
//                       </div>
//                     </div>
//                   </DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>

//               <Button variant="ghost" size="sm" onClick={handleLogout}>
//                 <LogOut className="h-4 w-4 mr-2" />
//                 Logout
//               </Button>
//             </div>

//             {/* Mobile nav */}
//             <div className="flex md:hidden items-center gap-2">
//               <div className="flex overflow-x-auto gap-2">
//                 {navItems.map((item) => {
//                   const Icon = item.icon;
//                   const isActive = location.pathname === item.path;
//                   return (
//                     <Link
//                       key={item.path}
//                       to={buildNavLink(item.path)}
//                       className={cn(
//                         "flex items-center justify-center p-2 rounded-md transition-colors",
//                         isActive
//                           ? "bg-primary text-primary-foreground"
//                           : "text-muted-foreground hover:bg-muted hover:text-foreground"
//                       )}
//                     >
//                       <Icon className="h-5 w-5" />
//                     </Link>
//                   );
//                 })}
//               </div>
//               <Button variant="ghost" size="icon" onClick={handleLogout}>
//                 <LogOut className="h-5 w-5" />
//               </Button>
//             </div>
//           </div>

//           {/* Mobile shop info */}
//           <div className="sm:hidden pb-2 text-xs text-muted-foreground">
//             Shop #{appParams.c_no} • {appParams.type}
//           </div>
//         </div>
//       </nav>
//       <main className="flex-1 bg-background">{children}</main>
//     </div>
//   );
// };
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import {
  Home,
  FileText,
  Package,
  FolderTree,
  History,
  Users,
  Building2,
  LogOut,
  Store,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { logout, appParams } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Preserve URL params even on logout
    const searchParams = new URLSearchParams();
    searchParams.set('c_no', appParams.c_no);
    searchParams.set('type', appParams.type);
    navigate(`/login?${searchParams.toString()}`);
  };

  // Memoize the navigation link builder to prevent recalculation
  const buildNavLink = useMemo(() => {
    return (path: string) => {
      const searchParams = new URLSearchParams();
      searchParams.set('c_no', appParams.c_no);
      searchParams.set('type', appParams.type);
      return `${path}?${searchParams.toString()}`;
    };
  }, [appParams.c_no, appParams.type]);

  const navItems = useMemo(() => [
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/products", icon: Package, label: "Products" },
    { path: "/categories", icon: FolderTree, label: "Categories" },
    { path: "/waiters", icon: Users, label: "Waiters" },
    { path: "/history", icon: History, label: "History" },
    { path: "/settings", icon: Building2, label: "Settings" },
  ], []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-foreground">
                  Deepika Groups
                </span>
                <span className="text-xs text-muted-foreground hidden sm:block">
                  Shop #{appParams.c_no} • {appParams.type}
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={buildNavLink(item.path)}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Store className="h-4 w-4 mr-2" />
                    Shop Info
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Current Shop</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shop ID:</span>
                        <span className="font-medium">{appParams.c_no}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{appParams.type}</span>
                      </div>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>

            {/* Mobile nav */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex overflow-x-auto gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={buildNavLink(item.path)}
                      className={cn(
                        "flex items-center justify-center p-2 rounded-md transition-colors",
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </Link>
                  );
                })}
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile shop info */}
          <div className="sm:hidden pb-2 text-xs text-muted-foreground">
            Shop #{appParams.c_no} • {appParams.type}
          </div>
        </div>
      </nav>
      <main className="flex-1 bg-background">{children}</main>
    </div>
  );
};