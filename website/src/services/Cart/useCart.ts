import { useState, useEffect, useCallback } from "react";
import {
  getCart,
  addToCart as addToCartApi,
  updateCartItem as updateCartItemApi,
  removeFromCart as removeFromCartApi,
  clearCart as clearCartApi,
  calculateCartTotals,
  type Cart,
} from "./cartApi";

export const useCart = () => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Check if user is logged in - use useCallback to memoize
  const isLoggedIn = useCallback(() => {
    return !!localStorage.getItem("token");
  }, []);

  // Clear messages
  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  // Fetch cart - memoized with useCallback
  const fetchCart = useCallback(async () => {
    if (!isLoggedIn()) {
      setCart(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cartData = await getCart();
      setCart(cartData);
      return cartData;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch cart";
      setError(errorMessage);
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Add to cart - memoized with useCallback
  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    if (!isLoggedIn()) {
      setError("Please login to add items to cart");
      throw new Error("Not authenticated");
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const updatedCart = await addToCartApi(productId, quantity);
      setCart(updatedCart);
      setSuccess("Added to cart!");
      return updatedCart;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to add to cart";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Update cart item - memoized with useCallback
  const updateCartItem = useCallback(async (productId: string, quantity: number) => {
    if (!isLoggedIn()) {
      setError("Please login to update cart");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedCart = await updateCartItemApi(productId, quantity);
      setCart(updatedCart);
      return updatedCart;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update cart";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Remove from cart - memoized with useCallback
  const removeFromCart = useCallback(async (productId: string) => {
    if (!isLoggedIn()) {
      setError("Please login to remove items");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedCart = await removeFromCartApi(productId);
      setCart(updatedCart);
      setSuccess("Item removed from cart");
      return updatedCart;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to remove item";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Clear cart - memoized with useCallback
  const clearCart = useCallback(async () => {
    if (!isLoggedIn()) {
      setError("Please login to clear cart");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const updatedCart = await clearCartApi();
      setCart(updatedCart);
      setSuccess("Cart cleared");
      return updatedCart;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to clear cart";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn]);

  // Get cart totals
  const cartTotals = cart ? calculateCartTotals(cart) : null;

  // Auto-fetch cart on mount if logged in
  useEffect(() => {
    if (isLoggedIn()) {
      fetchCart();
    }
  }, [isLoggedIn, fetchCart]);

  return {
    cart,
    loading,
    error,
    success,
    cartTotals,
    isLoggedIn: isLoggedIn(), // Call once here to get current value
    fetchCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    clearError,
    clearSuccess,
  };
};