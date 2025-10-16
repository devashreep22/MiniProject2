import { useEffect, useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X } from 'lucide-react';
import { useCart } from '@/services/Cart/useCart';
import { getImageUrl } from '@/services/Products/productApi';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    loading,
    error,
    success,
    cartTotals,
    isLoggedIn,
    fetchCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    clearError,
    clearSuccess,
  } = useCart();

  const [processingItem, setProcessingItem] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (success || error) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        clearSuccess();
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, clearSuccess, clearError]);

  const handleUpdateQuantity = async (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setProcessingItem(productId);
    try {
      await updateCartItem(productId, newQuantity);
    } catch (err) {
      console.error('Error updating quantity:', err);
    } finally {
      setProcessingItem(null);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    if (!confirm('Remove this item from cart?')) return;
    
    setProcessingItem(productId);
    try {
      await removeFromCart(productId);
    } catch (err) {
      console.error('Error removing item:', err);
    } finally {
      setProcessingItem(null);
    }
  };

  const handleClearCart = async () => {
    if (!confirm('Clear all items from cart?')) return;
    
    try {
      await clearCart();
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Please Login</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">You need to login to view your cart</p>
          <a
            href="/login"
            className="block w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg animate-pulse">
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              <div className="flex justify-between items-center">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LoadingSkeleton />
            </div>
            <div className="lg:col-span-1">
              <div className="h-80 w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/products"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Continue Shopping</span>
              </a>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Shopping Cart</h1>
            </div>
            {!isEmpty && (
              <button
                onClick={handleClearCart}
                className="text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      {showMessage && (success || error) && (
        <div className="container mx-auto px-4 pt-6">
          <div className={`${success ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'} border rounded-lg px-4 py-3`}>
            <div className="flex justify-between items-center">
              <span className={success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
                {success || error}
              </span>
              <button
                onClick={success ? clearSuccess : clearError}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-8">
        {isEmpty ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any fresh products to your cart yet. Start shopping to fill it with organic goodness!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/products"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Browse Products
              </a>
              <a
                href="/"
                className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Your Items ({cartTotals?.itemCount})
                </h2>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  {cart.items.length} products
                </span>
              </div>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 dark:border-green-900">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={getImageUrl(item.product.imageUrl)}
                            alt={item.product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/api/placeholder/400/300';
                            }}
                          />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-3">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
                              {item.product.name}
                            </h3>
                            <span className="inline-block bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-200 border border-green-200 dark:border-green-700 px-2 py-1 rounded text-xs">
                              {item.product.category}
                            </span>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveItem(item.product._id!)}
                            disabled={processingItem === item.product._id}
                            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Qty:</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product._id!, item.quantity - 1)}
                              disabled={item.quantity <= 1 || processingItem === item.product._id}
                              className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(item.product._id!, item.quantity + 1)}
                              disabled={processingItem === item.product._id}
                              className="w-8 h-8 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Unit Price */}
                          <div className="text-right">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              ₹{item.product.price} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-green-200 dark:border-green-800 sticky top-24">
                <div className="p-6 border-b dark:border-gray-700">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order Summary</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Review your order details</p>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal ({cartTotals?.itemCount} items)</span>
                      <span className="font-medium text-gray-900 dark:text-white">₹{cartTotals?.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Taxes</span>
                      <span className="font-medium text-gray-900 dark:text-white">₹{(cartTotals?.total! - cartTotals?.subtotal!).toFixed(2)}</span>
                    </div>
                    <div className="border-t dark:border-gray-700 pt-3 flex justify-between text-lg font-bold">
                      <span className="text-gray-900 dark:text-white">Total Amount</span>
                      <span className="text-green-600 dark:text-green-400">₹{cartTotals?.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  {cartTotals && cartTotals.subtotal > 499 && (
                    <div className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700 px-4 py-2 rounded-lg text-center">
                      🎉 You saved ₹50 on delivery!
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3 border-t dark:border-gray-700">
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-lg font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    Proceed to Checkout
                  </button>
                  
                  <a
                    href="/products"
                    className="block w-full text-center border border-green-600 dark:border-green-500 text-green-600 dark:text-green-400 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white py-3 rounded-lg font-medium transition-colors"
                  >
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;