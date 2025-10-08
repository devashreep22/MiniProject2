import AuthGuard from "@/components/common/AuthGuard";
import CartPage from "@/pages/buyer/cart/Cart";
import CheckoutPage from "@/pages/buyer/checkout/Checkout";
import AuthPage from "@/pages/Main/AuthPage";
import HomePage from "@/pages/Main/HomePage";
import LoginPage from "@/pages/Main/Login";
import RegisterPage from "@/pages/Main/Register";
import ProductsPage from "@/pages/Products/Products";
import ProductPage from "@/pages/Products/ProductsDetail";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path='/products' element={<ProductsPage />} />
            <Route path='/products/:id' element={<ProductPage />} />
            <Route path='checkout' element={<CheckoutPage />} />


            {/* protected routes */}
            <Route element={<AuthGuard roles={["buyer"]} />}>
                <Route path="/buyer" element={<div>Buyer Dashboard</div>} />
            </Route>
            <Route element={<AuthGuard roles={["farmer"]} />}>
                <Route path="/farmer" element={<div>Farmer Dashboard</div>} />
            </Route>
            <Route element={<AuthGuard roles={["admin"]} />}>
                <Route path="/admin" element={<div>Admin Dashboard</div>} />
            </Route>
        </>
    )
)

export default router;