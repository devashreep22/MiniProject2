import { RouterProvider } from "react-router-dom";
import router from "@/router/router";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CardContext";
import { useEffect } from "react";

function App() {
  const { pathname } = window.location;
  const path = pathname.split("/")[1]; // Get the first segment after "/"
  const title = path ? path.charAt(0).toUpperCase() + path.slice(1) : "Home";
  useEffect(() => {
    document.title = title + " - Farm2You";
  }, [title]);
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
