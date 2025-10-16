import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthGuard from "@/components/common/AuthGuard";
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
import OrderDetail from "@/pages/Products/OrderDetail";
import FarmerOrders from "@/pages/Farmer/FarmerOrders";

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
          <Route path="/farmer/bookings" element={<FarmerOrders />} />
        </Route>
      </Route>

      <Route element={<AuthGuard roles={["buyer"]} />}>
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
      </Route>

      <Route path='/products' element={<Products />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </>
  )
);

export default router;
