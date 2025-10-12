import { ScrollArea } from "@/components/ui/scroll-area";
import { Upload, User2, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  currentPath: string;
}

const farmerNavigationItems = [
  { icon: Home, label: "Home", href: "/farmer" },
  { icon: Upload, label: "Add Products", href: "/farmer/add-products" },
];

const adminNavigationItems = [
  { icon: Home, label: "Home", href: "/admin" },
  { icon: User2, label: "Users", href: "/admin/users" },
  { icon: User2, label: "Products", href: "/admin/verify-products" },
];

export function Sidebar({ isOpen, currentPath }: SidebarProps) {
  const { user } = useAuth();

  const displayNavigationItems = (() => {
    if (!user) return [];
    switch (user?.role) {
      case "farmer":
        return farmerNavigationItems;
      case "admin":
        return adminNavigationItems;
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
    <aside
      className={cn(
        "hidden flex-col border-r bg-background transition-all duration-300 md:flex",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <ScrollArea className="flex-1">
        <nav className="space-y-3 px-2 py-2 pb-4">
          {displayNavigationItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-4 rounded-lg px-4 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className={cn("transition-opacity", !isOpen && "opacity-0")}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </aside>
  );
}