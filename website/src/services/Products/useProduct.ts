import { useState } from "react";
import { 
  createProduct, 
  getProducts, 
  updateProduct, 
  deleteProduct, 
  getFarmerProducts,
  approveProduct,
  type Product 
} from "./productApi";

export const useProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [farmerProducts, setFarmerProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // Clear messages
  const clearError = () => setError(null);
  const clearSuccess = () => setSuccess(null);

  // Create product
  const handleCreateProduct = async (productData: Product) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const product = await createProduct(productData);
      setSuccess("Product created successfully!");
      // Add to farmer products list
      setFarmerProducts(prev => [product, ...prev]);
      return product;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create product";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get all products
  const fetchProducts = async (filters?: any) => {
    setLoading(true);
    try {
      const productsData = await getProducts(filters);
      setProducts(productsData);
      return productsData;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch products";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get farmer's products
  const fetchFarmerProducts = async () => {
    setLoading(true);
    try {
      const farmerProductsData = await getFarmerProducts();
      setFarmerProducts(farmerProductsData);
      return farmerProductsData;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to fetch your products";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const handleUpdateProduct = async (id: string, productData: Partial<Product>) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const updatedProduct = await updateProduct(id, productData);
      setSuccess("Product updated successfully!");
      
      // Update in farmer products list
      setFarmerProducts(prev => 
        prev.map(product => 
          product._id === id ? updatedProduct : product
        )
      );
      
      return updatedProduct;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update product";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await deleteProduct(id);
      setSuccess("Product deleted successfully!");
      
      // Remove from farmer products list
      setFarmerProducts(prev => prev.filter(product => product._id !== id));
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete product";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Approve product (Admin)
  const handleApproveProduct = async (id: string, status: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await approveProduct(id, status);
      setSuccess(`Product ${status} successfully!`);
      return result;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update product status";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = () => {
    const defaultCategories = [
      "Vegetables", "Fruits", "Grains", "Dairy", "Meat", "Herbs", "Flowers", "Other"
    ];
    setCategories(defaultCategories);
  };

  return {
    // State
    loading,
    error,
    success,
    products,
    farmerProducts,
    categories,
    
    // Actions
    handleCreateProduct,
    fetchProducts,
    fetchFarmerProducts,
    handleUpdateProduct,
    handleDeleteProduct,
    handleApproveProduct,
    fetchCategories,
    clearError,
    clearSuccess,
  };
};