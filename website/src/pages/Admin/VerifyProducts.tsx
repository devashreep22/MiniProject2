import { getImageUrl, type Product } from '@/services/Products/productApi';
import { useProduct } from '@/services/Products/useProduct';
import React, { useEffect, useState } from 'react';

function VerifyProducts() {
  const {
    loading,
    error,
    success,
    pendingProducts,
    fetchPendingProducts,
    handleApproveProduct,
    clearError,
    clearSuccess,
  } = useProduct();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  // Auto-clear messages after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => clearSuccess(), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, clearSuccess]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => clearError(), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  const handleApprove = async (productId: string, status: 'approved' | 'rejected') => {
    if (!productId) return;
    
    setProcessingId(productId);
    try {
      await handleApproveProduct(productId, status);
      setSelectedProduct(null);
      await fetchPendingProducts(); // Refresh list
    } catch (err) {
      console.error('Failed to update product status:', err);
    } finally {
      setProcessingId(null);
    }
  };

  const openProductDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  if (loading && pendingProducts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading pending products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Verify Products</h1>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{success}</span>
          <button
            onClick={clearSuccess}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
          <button
            onClick={clearError}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      )}

      {/* Pending Products Count */}
      <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4">
        <p className="text-blue-700">
          <strong>{pendingProducts.length}</strong> product{pendingProducts.length !== 1 ? 's' : ''} awaiting verification
        </p>
      </div>

      {/* Products Grid */}
      {pendingProducts.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pending products</h3>
          <p className="mt-1 text-sm text-gray-500">All products have been verified.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-200">
                <img
                  src={getImageUrl(product.imageUrl)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/api/placeholder/400/300';
                  }}
                />
                <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  Pending
                </span>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {product.description || 'No description provided'}
                </p>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-green-600">
                    ₹{product.price}
                  </span>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>

                {product.farmer && (
                  <p className="text-sm text-gray-500 mb-4">
                    Farmer: <span className="font-medium">{product.farmer.name || product.farmer.farmName}</span>
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openProductDetails(product)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
                <button
                  onClick={closeProductDetails}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>

              {/* Product Image */}
              <div className="mb-4">
                <img
                  src={getImageUrl(selectedProduct.imageUrl)}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/api/placeholder/400/300';
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Name</label>
                  <p className="text-lg text-gray-800">{selectedProduct.name}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Description</label>
                  <p className="text-gray-700">{selectedProduct.description || 'No description'}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Price</label>
                    <p className="text-xl font-bold text-green-600">₹{selectedProduct.price}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Category</label>
                    <p className="text-gray-800">{selectedProduct.category}</p>
                  </div>
                </div>

                {selectedProduct.stock !== undefined && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Stock</label>
                    <p className="text-gray-800">{selectedProduct.stock} {selectedProduct.unit || 'units'}</p>
                  </div>
                )}

                {selectedProduct.farmer && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Farmer</label>
                    <p className="text-gray-800">
                      {selectedProduct.farmer.name || selectedProduct.farmer.farmName}
                    </p>
                  </div>
                )}

                {selectedProduct.createdAt && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Submitted On</label>
                    <p className="text-gray-800">
                      {new Date(selectedProduct.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => handleApprove(selectedProduct._id!, 'approved')}
                  disabled={processingId === selectedProduct._id}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingId === selectedProduct._id ? 'Processing...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleApprove(selectedProduct._id!, 'rejected')}
                  disabled={processingId === selectedProduct._id}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processingId === selectedProduct._id ? 'Processing...' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyProducts;