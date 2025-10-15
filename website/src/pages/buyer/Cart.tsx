import { useEffect, useState } from 'react';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, X, Truck, Shield, Clock } from 'lucide-react';
import { useCart } from '@/services/Cart/useCart';
import { getImageUrl } from '@/services/Products/productApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';

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
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Please Login</h2>
            <p className="text-muted-foreground mb-6">You need to login to view your cart</p>
            <Button asChild className="w-full bg-green-600 hover:bg-green-700">
              <a href="/login">Go to Login</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <Card key={index} className="p-4">
          <div className="flex gap-4">
            <Skeleton className="w-24 h-24 rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LoadingSkeleton />
            </div>
            <div className="lg:col-span-1">
              <Skeleton className="h-80 w-full rounded-lg" />
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
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="flex items-center gap-2">
                <a href="/products">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Continue Shopping</span>
                </a>
              </Button>
              {/* <h1 className="text-3xl font-bold text-foreground">Shopping Cart</h1> */}
            </div>
            {!isEmpty && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleClearCart}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                Clear Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      {showMessage && (success || error) && (
        <div className="container mx-auto px-4 pt-6">
          <Alert className={success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
            <AlertDescription className={success ? 'text-green-800' : 'text-red-800'}>
              <div className="flex justify-between items-center">
                <span>{success || error}</span>
                <Button variant="ghost" size="sm" onClick={success ? clearSuccess : clearError}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Cart Content */}
      <div className="container mx-auto px-4 py-8">
        {isEmpty ? (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-12 pb-12">
              <div className="w-24 h-24 mx-auto bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Looks like you haven't added any fresh products to your cart yet. Start shopping to fill it with organic goodness!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                  <a href="/products">Browse Products</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/">Back to Home</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Your Items ({cartTotals?.itemCount})
                </h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {cart.items.length} products
                </Badge>
              </div>

              <div className="space-y-4">
                {cart.items.map((item) => (
                  <Card key={item.product._id} className="p-6 hover:shadow-lg transition-all duration-300 border-green-100 dark:border-green-900">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          <img
                            src={getImageUrl(item.product.imageUrl)}
                            alt={item.product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                            <h3 className="font-semibold text-lg text-foreground group-hover:text-green-600 transition-colors">
                              {item.product.name}
                            </h3>
                            <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200 border-green-200">
                              {item.product.category}
                            </Badge>
                            <p className="text-lg font-bold text-green-600">
                              ₹{(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveItem(item.product._id!)}
                            disabled={processingItem === item.product._id}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground mr-2">Qty:</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.product._id!, item.quantity - 1)}
                              disabled={item.quantity <= 1 || processingItem === item.product._id}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-12 text-center font-medium text-foreground">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUpdateQuantity(item.product._id!, item.quantity + 1)}
                              disabled={processingItem === item.product._id}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          {/* Unit Price */}
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">
                              ₹{item.product.price} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-green-200 dark:border-green-800">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl">Order Summary</CardTitle>
                  <CardDescription>Review your order details</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal ({cartTotals?.itemCount} items)</span>
                      <span className="font-medium">₹{cartTotals?.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="text-green-600 font-medium">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxes</span>
                      <span className="font-medium">₹{(cartTotals?.total! - cartTotals?.subtotal!).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-green-600">₹{cartTotals?.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  {cartTotals && cartTotals.subtotal > 499 && (
                    <Badge className="w-full justify-center bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 py-2">
                      🎉 You saved ₹50 on delivery!
                    </Badge>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col space-y-3">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                    onClick={() => alert('Checkout functionality coming soon!')}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    asChild
                  >
                    <a href="/products">Continue Shopping</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;