import { useEffect, useState } from 'react';
import { ArrowLeft, Package, MapPin, CreditCard, Clock, AlertCircle } from 'lucide-react';
import { getImageUrl } from '@/services/Products/productApi';
import { useOrder } from '@/services/Order/useOrder';

interface OrderDetailProps {
  orderId: string;
}

const OrderDetail = ({ orderId }: OrderDetailProps) => {
  const { currentOrder, loading, error, fetchOrderById, updateOrderStatus } = useOrder();
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId);
    }
  }, [orderId]);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300',
      shipped: 'bg-purple-100 text-purple-800 border-purple-300',
      delivered: 'bg-green-100 text-green-800 border-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!currentOrder) return;
    
    if (confirm(`Are you sure you want to mark this order as ${newStatus}?`)) {
      setUpdating(true);
      await updateOrderStatus(currentOrder._id, newStatus as any);
      setUpdating(false);
    }
  };

  if (loading && !currentOrder) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error && !currentOrder) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm p-8 max-w-md w-full text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <a
            href="/orders"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Back to Orders
          </a>
        </div>
      </div>
    );
  }

  if (!currentOrder) {
    return null;
  }

  const canUpdateStatus = (currentStatus: string) => {
    // Define allowed status transitions
    const transitions: Record<string, string[]> = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: [],
    };
    return transitions[currentStatus] || [];
  };

  const allowedStatuses = canUpdateStatus(currentOrder.status);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <a
                href="/orders"
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Orders</span>
              </a>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            </div>
            <div className={`px-4 py-2 rounded-full border ${getStatusColor(currentOrder.status)}`}>
              <span className="font-semibold">{getStatusText(currentOrder.status)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Order Information</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p className="font-semibold text-gray-900 font-mono">{currentOrder._id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p className="font-semibold text-gray-900">{formatDate(currentOrder.createdAt)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-semibold text-gray-900">{currentOrder.paymentMethod.toUpperCase()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-green-600 text-lg">₹{currentOrder.totalAmount.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Items</h2>
              
              <div className="space-y-4">
                {currentOrder.items.map((item, index) => (
                  <div key={index} className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                    <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={getImageUrl(item.product.imageUrl)}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/api/placeholder/400/300';
                        }}
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Farmer: {item.farmer.name}
                        {item.farmer.farmName && ` (${item.farmer.farmName})`}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          ₹{item.price.toFixed(2)} × {item.quantity}
                        </p>
                        <p className="font-semibold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>₹{currentOrder.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>Delivery</span>
                  <span className="text-green-600">FREE</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span className="text-green-600">₹{currentOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
              </div>
              
              <div className="text-gray-700 space-y-1">
                <p className="font-semibold">{currentOrder.shippingAddress.name}</p>
                <p>{currentOrder.shippingAddress.addressLine}</p>
                <p>
                  {currentOrder.shippingAddress.city}, {currentOrder.shippingAddress.state} - {currentOrder.shippingAddress.pincode}
                </p>
                <p className="pt-2">
                  <span className="text-gray-600">Phone:</span> {currentOrder.shippingAddress.phone}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-6">
              {/* Order Status Timeline */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-6 h-6 text-green-600" />
                  <h2 className="text-xl font-bold text-gray-900">Order Status</h2>
                </div>
                
                <div className="space-y-4">
                  {['pending', 'confirmed', 'shipped', 'delivered'].map((status, index) => {
                    const isPassed = ['pending', 'confirmed', 'shipped', 'delivered'].indexOf(currentOrder.status) >= index;
                    const isCurrent = currentOrder.status === status;
                    const isCancelled = currentOrder.status === 'cancelled';
                    
                    return (
                      <div key={status} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCurrent ? 'bg-green-600 text-white' :
                            isPassed && !isCancelled ? 'bg-green-100 text-green-600' :
                            'bg-gray-200 text-gray-400'
                          }`}>
                            {isPassed && !isCancelled ? '✓' : index + 1}
                          </div>
                          {index < 3 && (
                            <div className={`w-0.5 h-8 ${
                              isPassed && !isCancelled ? 'bg-green-600' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                        <div className="flex-grow pt-1">
                          <p className={`font-medium ${
                            isCurrent ? 'text-green-600' :
                            isPassed && !isCancelled ? 'text-gray-900' :
                            'text-gray-400'
                          }`}>
                            {getStatusText(status)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  {currentOrder.status === 'cancelled' && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center">
                        ✕
                      </div>
                      <div className="pt-1">
                        <p className="font-medium text-red-600">Cancelled</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Update Actions (for farmers/admins) */}
              {allowedStatuses.length > 0 && (
                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3">Update Status</h3>
                  <div className="space-y-2">
                    {allowedStatuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusUpdate(status)}
                        disabled={updating}
                        className={`w-full py-2 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 ${
                          status === 'cancelled'
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        Mark as {getStatusText(status)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Help Section */}
              <div className="pt-6 border-t">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>If you have any questions about your order, please contact support.</p>
                  <a href="/support" className="text-green-600 hover:text-green-700 font-medium">
                    Contact Support →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;