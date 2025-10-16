import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export interface ShippingAddress {
  name: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
}

export interface OrderItem {
  product: string;
  quantity: number;
}

export interface PlaceOrderRequest {
  items: OrderItem[];
  shippingAddress: ShippingAddress;
}

export interface Order {
  _id: string;
  buyer: {
    _id: string;
    name: string;
    email: string;
  };
  items: {
    product: {
      _id: string;
      name: string;
      imageUrl: string;
      price: number;
    };
    farmer: {
      _id: string;
      name: string;
      farmName?: string;
    };
    quantity: number;
    price: number;
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const orderApi = {
  // Place a new order
  placeOrder: async (orderData: PlaceOrderRequest): Promise<Order> => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  // Get buyer's orders
  getMyOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/my');
    return response.data;
  },

  // Get farmer's orders
  getFarmerOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders/farmer');
    return response.data;
  },

  // Get all orders (admin)
  getAllOrders: async (): Promise<Order[]> => {
    const response = await api.get('/orders');
    return response.data;
  },

  // Get order by ID
  getOrderById: async (orderId: string): Promise<Order> => {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  },

  // Update order status
  updateOrderStatus: async (orderId: string, status: Order['status']): Promise<Order> => {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
  },
};

export default orderApi;