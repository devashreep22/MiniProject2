// MobileNav.tsx
import { Upload, User2, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const farmerNavItems = [
  { icon: Home, label: "Home", href: "/farmer" },
  { icon: Upload, label: "Products", href: "/farmer/add-products" },
];

const adminNavItems = [
  { icon: Home, label: "Home", href: "/admin" },
  { icon: User2, label: "Users", href: "/admin/users" },
];

export function MobileNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { user } = useAuth();

  const displayNavItems = (() => {
    if (!user) return [];
    switch (user?.role) {
      case "farmer":
        return farmerNavItems;
      case "admin":
        return adminNavItems;
      default:
        return [];
    }
  })();

  // Improved active state detection
  const isActive = (href: string) => {
    if (href === "/admin" || href === "/farmer") {
      return currentPath === href;
    }
    return currentPath.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
      <div
        className="grid w-full"
        style={{ gridTemplateColumns: `repeat(${displayNavItems.length}, 1fr)` }}
      >
        {displayNavItems.map((item) => {
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-3 text-xs w-full transition-colors",
                active 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("h-5 w-5", active && "fill-current")} />
              <span className="truncate px-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}