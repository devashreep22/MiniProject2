// MobileMenu.tsx
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Upload, User2, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const farmerNavigationItems = [
  { icon: Home, label: "Home", href: "/farmer" },
  { icon: Upload, label: "Add Products", href: "/farmer/add-products" },
];

const adminNavigationItems = [
  { icon: Home, label: "Home", href: "/admin" },
  { icon: User2, label: "Users", href: "/admin/users" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-left">Menu</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Navigate through your options
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-8rem)]">
          <nav className="space-y-1 p-2">
            {displayNavigationItems.map((item) => {
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-4 rounded-lg px-4 py-3 text-sm transition-colors",
                    active
                      ? "bg-accent text-accent-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}