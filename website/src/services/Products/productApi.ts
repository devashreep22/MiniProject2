import axios from "axios";

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock?: number;
  image?: File | null;
  imageUrl?: string;
  status?: 'pending' | 'approved' | 'rejected';
  farmer?: any;
  createdAt?: string;
  updatedAt?: string;
  unit?: string;
  views?: number;
  salesCount?: number;
  rating?: {
    average: number;
    count: number;
  };
}

export interface ProductResponse {
  success?: boolean;
  data?: {
    product?: Product;
    products?: Product[];
  };
  message?: string;
  products?: Product[];
}

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Create product (Farmer only)
export const createProduct = async (productData: Product): Promise<Product> => {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", String(productData.price));
  formData.append("category", productData.category);

  if (productData.description) formData.append("description", productData.description);
  if (productData.stock !== undefined) formData.append("stock", String(productData.stock));
  if (productData.image) formData.append("image", productData.image);

  const res = await axios.post(`${BASE_URL}/api/v1/products`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeader(),
    },
  });

  return res.data;
};

// Get all products (Public)
export const getProducts = async (filters?: {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}): Promise<Product[]> => {
  const params = new URLSearchParams();
  
  if (filters?.q) params.append('q', filters.q);
  if (filters?.category) params.append('category', filters.category);
  if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
  if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
  if (filters?.sort) params.append('sort', filters.sort);

  const res = await axios.get(`${BASE_URL}/api/v1/products?${params.toString()}`);
  return res.data;
};

export const getImageUrl = (imagePath: string | undefined) => {
  if (!imagePath) return "/api/placeholder/400/300";
  if (imagePath.startsWith('http')) return imagePath;
  return `${BASE_URL}${imagePath}`;
};

// Get product by ID (Public)
export const getProductById = async (id: string): Promise<Product> => {
  const res = await axios.get(`${BASE_URL}/api/v1/products/${id}`);
  return res.data;
};

// Update product (Farmer only)
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  const formData = new FormData();
  
  if (productData.name) formData.append("name", productData.name);
  if (productData.description) formData.append("description", productData.description);
  if (productData.price) formData.append("price", String(productData.price));
  if (productData.category) formData.append("category", productData.category);
  if (productData.stock !== undefined) formData.append("stock", String(productData.stock));
  if (productData.image) formData.append("image", productData.image);

  const res = await axios.put(`${BASE_URL}/api/v1/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeader(),
    },
  });

  return res.data;
};

// Delete product (Farmer only)
export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const res = await axios.delete(`${BASE_URL}/api/v1/products/${id}`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Get farmer's products
export const getFarmerProducts = async (): Promise<Product[]> => {
  const res = await axios.get(`${BASE_URL}/api/v1/products/farmer/my-products`, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// Approve product (Admin only)
export const approveProduct = async (id: string, status: string): Promise<{ message: string }> => {
  const res = await axios.patch(`${BASE_URL}/api/v1/products/${id}/approve`, 
    { status },
    { headers: getAuthHeader() }
  );
  return res.data;
};