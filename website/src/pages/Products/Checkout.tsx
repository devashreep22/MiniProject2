import { useEffect, useState } from 'react';
import { ArrowLeft, ShoppingBag, MapPin, CreditCard, AlertCircle } from 'lucide-react';
import { useCart } from '@/services/Cart/useCart';
import { getImageUrl } from '@/services/Products/productApi';
import { useOrder } from '@/services/Order/useOrder';
import type { ShippingAddress } from '@/services/Order/orderApi';

const Checkout = () => {
  const { cart, cartTotals, fetchCart, clearCart } = useCart();
  const { placeOrder, loading, error, success } = useOrder();
  
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    name: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!shippingAddress.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!shippingAddress.addressLine.trim()) {
      errors.addressLine = 'Address is required';
    }
    
    if (!shippingAddress.city.trim()) {
      errors.city = 'City is required';
    }
    
    if (!shippingAddress.state.trim()) {
      errors.state = 'State is required';
    }
    
    if (!shippingAddress.pincode.trim()) {
      errors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(shippingAddress.pincode)) {
      errors.pincode = 'Invalid pincode (6 digits required)';
    }
    
    if (!shippingAddress.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(shippingAddress.phone)) {
      errors.phone = 'Invalid phone number (10 digits required)';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof ShippingAddress, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error for this field
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const updated = { ...prev };
        delete updated[field];
        return updated;
      });
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (!cart || cart.items.length === 0) {
      return;
    }

    const orderData = {
      items: cart.items.map(item => ({
        product: item.product._id!,
        quantity: item.quantity,
      })),
      shippingAddress,
    };

    const result = await placeOrder(orderData);
    
    if (result) {
      setOrderId(result._id);
      setOrderPlaced(true);
      await clearCart();
    }
  };

  const isEmpty = !cart || cart.items.length === 0;

  if (orderPlaced && orderId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. You will receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="text-lg font-mono font-semibold text-gray-900">{orderId}</p>
          </div>
          <div className="space-y-3">
            <a
              href={`/orders/${orderId}`}
              className="block w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              View Order Details
            </a>
            <a
              href="/orders"
              className="block w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              View All Orders
            </a>
            <a
              href="/products"
              className="block w-full text-green-600 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to checkout</p>
          <a
            href="/products"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <a
              href="/cart"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Cart</span>
            </a>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Address Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      validationErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {validationErrors.name && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address *
                  </label>
                  <textarea
                    value={shippingAddress.addressLine}
                    onChange={(e) => handleInputChange('addressLine', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      validationErrors.addressLine ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="House/Flat No., Building, Street, Area"
                  />
                  {validationErrors.addressLine && (
                    <p className="text-red-600 text-sm mt-1">{validationErrors.addressLine}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        validationErrors.city ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="City"
                    />
                    {validationErrors.city && (
                      <p className="text-red-600 text-sm mt-1">{validationErrors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        validationErrors.state ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="State"
                    />
                    {validationErrors.state && (
                      <p className="text-red-600 text-sm mt-1">{validationErrors.state}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      maxLength={6}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        validationErrors.pincode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="6-digit pincode"
                    />
                    {validationErrors.pincode && (
                      <p className="text-red-600 text-sm mt-1">{validationErrors.pincode}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={shippingAddress.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      maxLength={10}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                        validationErrors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="10-digit mobile number"
                    />
                    {validationErrors.phone && (
                      <p className="text-red-600 text-sm mt-1">{validationErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-6">
                <CreditCard className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>

              <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="cod"
                    checked
                    readOnly
                    className="w-4 h-4 text-green-600"
                  />
                  <label htmlFor="cod" className="flex-grow">
                    <div className="font-medium text-gray-900">Cash on Delivery (COD)</div>
                    <div className="text-sm text-gray-600">Pay when you receive your order</div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {cart.items.map((item) => (
                  <div key={item.product._id} className="flex gap-3">
                    <img
                      src={getImageUrl(item.product.imageUrl)}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/api/placeholder/400/300';
                      }}
                    />
                    <div className="flex-grow">
                      <p className="font-medium text-sm text-gray-900">{item.product.name}</p>
                      <p className="text-sm text-gray-600">
                        ₹{item.product.price} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({cartTotals?.itemCount} items)</span>
                  <span>₹{cartTotals?.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-600">₹{cartTotals?.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>

              <div className="mt-4 text-sm text-gray-600 space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Safe and secure checkout</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Fresh products guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;