import axios from "axios";
import type { Product } from "../Products/productApi";


export interface CartItem {
  product: Product;
  quantity: number;
  _id?: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  createdAt?: string;
  updatedAt?: string;
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get user's cart
export const getCart = async (): Promise<Cart> => {
  const res = await axios.get(`${BASE_URL}/api/v1/cart`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Add item to cart
export const addToCart = async (productId: string, quantity: number = 1): Promise<Cart> => {
  const res = await axios.post(
    `${BASE_URL}/api/v1/cart/add`,
    { productId, quantity },
    { headers: getAuthHeader() }
  );
  return res.data;
};

// Update cart item quantity
export const updateCartItem = async (productId: string, quantity: number): Promise<Cart> => {
  const res = await axios.patch(
    `${BASE_URL}/api/v1/cart/update`,
    { productId, quantity },
    { headers: getAuthHeader() }
  );
  return res.data;
};

// Remove item from cart
export const removeFromCart = async (productId: string): Promise<Cart> => {
  const res = await axios.delete(`${BASE_URL}/api/v1/cart/remove/${productId}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Clear entire cart
export const clearCart = async (): Promise<Cart> => {
  const res = await axios.delete(`${BASE_URL}/api/v1/cart/clear`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Calculate cart totals
export const calculateCartTotals = (cart: Cart) => {
  const subtotal = cart.items.reduce((total, item) => {
    return total + (item.product.price * item.quantity);
  }, 0);
  
  const itemCount = cart.items.reduce((total, item) => total + item.quantity, 0);
  
  return {
    subtotal,
    itemCount,
    // You can add tax, shipping, etc. here
    total: subtotal,
  };
};