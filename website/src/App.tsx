import { RouterProvider } from "react-router-dom";
import router from "@/router/router";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CardContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
