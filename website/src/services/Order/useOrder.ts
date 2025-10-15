import { useState, useEffect } from 'react';
import { orderApi, type Order, type PlaceOrderRequest } from './orderApi';

export const useOrder = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  // Place a new order
  const placeOrder = async (orderData: PlaceOrderRequest): Promise<Order | null> => {
    setLoading(true);
    setError(null);
    try {
      const order = await orderApi.placeOrder(orderData);
      setSuccess('Order placed successfully!');
      return order;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to place order';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Fetch buyer's orders
  const fetchMyOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderApi.getMyOrders();
      setOrders(data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch orders';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Fetch farmer's orders
  const fetchFarmerOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderApi.getFarmerOrders();
      setOrders(data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch orders';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all orders (admin)
  const fetchAllOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await orderApi.getAllOrders();
      setOrders(data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch orders';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Fetch order by ID
  const fetchOrderById = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      const order = await orderApi.getOrderById(orderId);
      setCurrentOrder(order);
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch order details';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId: string, status: Order['status']) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await orderApi.updateOrderStatus(orderId, status);
      setSuccess('Order status updated successfully!');
      
      // Update in orders list if present
      setOrders(prev => 
        prev.map(order => order._id === orderId ? updatedOrder : order)
      );
      
      // Update current order if it's the same
      if (currentOrder?._id === orderId) {
        setCurrentOrder(updatedOrder);
      }
      
      return updatedOrder;
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || 'Failed to update order status';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    orders,
    currentOrder,
    loading,
    error,
    success,
    placeOrder,
    fetchMyOrders,
    fetchFarmerOrders,
    fetchAllOrders,
    fetchOrderById,
    updateOrderStatus,
    clearError,
    clearSuccess,
  };
};