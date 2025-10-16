import React from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag, Package } from "lucide-react";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  onCalendarToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode, onCalendarToggle }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/adopt-farm", label: "Adopt farm" },
    { path: "/our-story", label: "Our story" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="text-2xl font-bold text-primary">🌱 Farm2You</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="text-sm font-medium transition-colors hover:text-primary text-foreground/60"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Header Controls */}
          <div className="flex items-center gap-4">
            {/* Calendar Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCalendarToggle}
              className="hidden sm:flex"
            >
              <i className="fas fa-calendar-alt text-lg" />
            </Button>

            {/* Dark Mode Toggle */}
            <div className="hidden sm:flex items-center gap-2">
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
                id="dark-mode"
              />
              <Label htmlFor="dark-mode" className="text-sm cursor-pointer">
                {darkMode ? "☀️" : "🌙"}
              </Label>
            </div>

            {/* Auth Buttons */}
            {user ? (
              <>
                {/* Orders Icon - NEW! */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate("/orders")}
                  title="My Orders"
                >
                  <Package className="w-6 h-6" />
                </Button>

                {/* Cart Icon */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => navigate("/cart")}
                  title="Shopping Cart"
                >
                  <ShoppingBag className="w-6 h-6" />
                </Button>

                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => navigate("/login")}>Login</Button>
                <Button onClick={() => navigate("/register")}>Register</Button>
              </>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <i className="fas fa-bars text-lg" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  {navItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      className="text-lg font-medium transition-colors hover:text-primary text-left"
                    >
                      {item.label}
                    </button>
                  ))}

                  <div className="flex items-center justify-between">
                    <Label htmlFor="mobile-dark-mode" className="text-lg">
                      Dark Mode
                    </Label>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                      id="mobile-dark-mode"
                    />
                  </div>

                  {user ? (
                    <>
                      {/* Orders Button - NEW! */}
                      <Button 
                        className="w-full" 
                        onClick={() => navigate("/orders")}
                        variant="outline"
                      >
                        <Package className="w-5 h-5 mr-2" />
                        My Orders
                      </Button>
                      <Button 
                        className="w-full" 
                        onClick={() => navigate("/cart")}
                        variant="outline"
                      >
                        <ShoppingBag className="w-5 h-5 mr-2" />
                        Cart
                      </Button>
                      <Button className="w-full" onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" onClick={() => navigate("/login")}>
                        Login
                      </Button>
                      <Button className="w-full" onClick={() => navigate("/register")}>
                        Register
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;