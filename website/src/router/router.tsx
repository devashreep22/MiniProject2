// import AuthGuard from "@/components/common/AuthGuard";
// import CartPage from "@/pages/buyer/cart/Cart";
// import CheckoutPage from "@/pages/buyer/checkout/Checkout";
// import AuthPage from "@/pages/Main/AuthPage";
// import HomePage from "@/pages/Main/HomePage";
// import LoginPage from "@/pages/Main/Login";
// import RegisterPage from "@/pages/Main/Register";
// import ProductsPage from "@/pages/Products/Products";
// import ProductPage from "@/pages/Products/ProductsDetail";
// import {
//     createBrowserRouter,
//     createRoutesFromElements,
//     Route,
// } from "react-router-dom";

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/register" element={<RegisterPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path='/products' element={<ProductsPage />} />
//             <Route path='/products/:id' element={<ProductPage />} />
//             <Route path='checkout' element={<CheckoutPage />} />

//             {/* protected routes */}
//             <Route element={<AuthGuard roles={["buyer"]} />}>
//                 <Route path="/buyer" element={<div>Buyer Dashboard</div>} />
//             </Route>
//             <Route element={<AuthGuard roles={["farmer"]} />}>
//                 <Route path="/farmer" element={<div>Farmer Dashboard</div>} />
//             </Route>
//             <Route element={<AuthGuard roles={["admin"]} />}>
//                 <Route path="/admin" element={<div>Admin Dashboard</div>} />
//             </Route>
//         </>
//     )
// )

// export default router;

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthGuard from "@/components/common/AuthGuard";
import Home from "@/pages/Landing/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import FarmerDashboard from "@/pages/Farmer/FarmerDashboard";
import Buyer from "@/pages/buyer/Buyer";
import DashboardLayout from "@/Layouts/DashboardLayout";
import VerifyFarmers from "@/pages/Admin/VerifyFarmers";
import AddProducts from "@/pages/Farmer/FarmerProducts";
import VerifyProducts from "@/pages/Admin/VerifyProducts";
import Cart from "@/pages/buyer/Cart";
import Products from "@/pages/Products/Products";
import MainPage from "@/pages/Landing/MainPage";
import Checkout from "@/pages/Products/Checkout";
import Orders from "@/pages/Products/Order";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public pages */}
      {/* <Route path="/" element={<Home />} /> */}
      <Route path="/" element={<MainPage />} />
      <Route element={<AuthGuard publicOnly />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Protected pages */}
      <Route element={<DashboardLayout />}>
        <Route element={<AuthGuard roles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<VerifyFarmers />} />
          <Route path="/admin/create-users" element={<div>Manage Users</div>} />
          <Route path="/admin/verify-products" element={<VerifyProducts />} />
        </Route>
        <Route element={<AuthGuard roles={["farmer"]} />}>
          <Route path="/farmer" element={<FarmerDashboard />} />
          <Route path="/farmer/add-products" element={<AddProducts />} />
        </Route>
      </Route>

      <Route element={<AuthGuard roles={["buyer"]} />}>
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/orders/:id" element={<Orders />} />
      </Route>

      <Route path='/products' element={<Products />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </>
  )
);

export default router;
