import { useEffect, useState } from 'react';
import { Package, ArrowLeft, Clock, Truck, CheckCircle, XCircle, Eye, User, MapPin, Phone, Search, Filter } from 'lucide-react';
import { useOrder } from '@/services/Order/useOrder';
import { getImageUrl } from '@/services/Products/productApi';

const FarmerOrders = () => {
  const { orders, loading, error, success, fetchFarmerOrders, updateOrderStatus, clearError, clearSuccess } = useOrder();
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchFarmerOrders();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        clearSuccess();
        clearError();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300',
      shipped: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300',
      delivered: 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/30 dark:text-red-300',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      shipped: <Truck className="w-4 h-4" />,
      delivered: <CheckCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />,
    };
    return icons[status as keyof typeof icons] || icons.pending;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    if (confirm(`Are you sure you want to mark this order as ${newStatus}?`)) {
      await updateOrderStatus(orderId, newStatus as any);
    }
  };

  const canUpdateStatus = (currentStatus: string) => {
    const transitions: Record<string, string[]> = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['shipped', 'cancelled'],
      shipped: ['delivered'],
      delivered: [],
      cancelled: [],
    };
    return transitions[currentStatus] || [];
  };

  // Filter and search logic
  const filteredOrders = orders
    .filter(order => filter === 'all' || order.status === filter)
    .filter(order => {
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return (
        order._id.toLowerCase().includes(search) ||
        order.buyer.name.toLowerCase().includes(search) ||
        order.buyer.email.toLowerCase().includes(search) ||
        order.shippingAddress.city.toLowerCase().includes(search)
      );
    });

  // Statistics
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    totalRevenue: orders
      .filter(o => o.status === 'delivered')
      .reduce((sum, o) => sum + o.totalAmount, 0),
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto"></div>
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <a
                href="/farmer"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 flex items-center gap-2 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Back to Dashboard</span>
              </a>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Order Management</h1>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manage customer orders</p>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.total}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Pending</p>
              <p className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">{stats.pending}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">Confirmed</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{stats.confirmed}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Shipped</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{stats.shipped}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-600 dark:text-green-400 font-medium">Delivered</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{stats.delivered}</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-sm text-red-600 dark:text-red-400 font-medium">Cancelled</p>
              <p className="text-2xl font-bold text-red-900 dark:text-red-100">{stats.cancelled}</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
              <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Revenue</p>
              <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">₹{stats.totalRevenue.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Success/Error Messages */}
      {(success || error) && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className={`${success ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'} border rounded-lg px-4 py-3`}>
            <p className={success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
              {success || error}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {orders.length === 0 ? (
          /* Empty State */
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Orders Yet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              You haven't received any orders yet. Keep your products listed and customers will start ordering soon!
            </p>
            <a
              href="/farmer/add-products"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Manage Products
            </a>
          </div>
        ) : (
          <>
            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search by order ID, customer name, email, or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>
              </div>

              {/* Filter Tabs */}
              {showFilters && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-2 flex flex-wrap gap-2">
                  {['all', 'pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded-md font-medium transition-all ${
                        filter === status
                          ? 'bg-green-600 text-white shadow-md'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                      <span className="ml-2 text-xs">
                        ({status === 'all' ? stats.total : stats[status as keyof typeof stats]})
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
                <p className="text-gray-600 dark:text-gray-400">No orders found matching your filters</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => {
                  const allowedStatuses = canUpdateStatus(order.status);
                  const isExpanded = selectedOrder === order._id;

                  return (
                    <div
                      key={order._id}
                      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
                    >
                      {/* Order Header */}
                      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-700 px-6 py-4 border-b dark:border-gray-600">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <span className="text-sm text-gray-600 dark:text-gray-400">Order ID:</span>
                              <span className="font-mono font-semibold text-gray-900 dark:text-white">
                                {order._id.slice(-8).toUpperCase()}
                              </span>
                              <div className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {formatDate(order.createdAt)}
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                {order.buyer.name}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Order Amount</p>
                              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                ₹{order.totalAmount.toFixed(2)}
                              </p>
                            </div>
                            <button
                              onClick={() => setSelectedOrder(isExpanded ? null : order._id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                              <Eye className="w-4 h-4" />
                              <span className="hidden sm:inline">{isExpanded ? 'Hide' : 'View'} Details</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Order Details (Collapsible) */}
                      {isExpanded && (
                        <div className="p-6 space-y-6">
                          {/* Customer Info */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <User className="w-5 h-5 text-green-600" />
                                Customer Information
                              </h3>
                              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-2">
                                <p className="text-gray-900 dark:text-white"><span className="font-medium">Name:</span> {order.buyer.name}</p>
                                <p className="text-gray-900 dark:text-white"><span className="font-medium">Email:</span> {order.buyer.email}</p>
                              </div>
                            </div>

                            <div className="space-y-3">
                              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-green-600" />
                                Shipping Address
                              </h3>
                              <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-1">
                                <p className="font-medium text-gray-900 dark:text-white">{order.shippingAddress.name}</p>
                                <p className="text-gray-700 dark:text-gray-300">{order.shippingAddress.addressLine}</p>
                                <p className="text-gray-700 dark:text-gray-300">
                                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 flex items-center gap-2 pt-2">
                                  <Phone className="w-4 h-4" />
                                  {order.shippingAddress.phone}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex gap-4 items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
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
                                    <h4 className="font-semibold text-gray-900 dark:text-white">{item.product.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                                    </p>
                                  </div>
                                  
                                  <div className="text-right flex-shrink-0">
                                    <p className="font-semibold text-gray-900 dark:text-white">
                                      ₹{(item.price * item.quantity).toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Status Update Actions */}
                          {allowedStatuses.length > 0 && (
                            <div className="border-t dark:border-gray-700 pt-6">
                              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Update Order Status</h3>
                              <div className="flex flex-wrap gap-3">
                                {allowedStatuses.map((status) => (
                                  <button
                                    key={status}
                                    onClick={() => handleStatusUpdate(order._id, status)}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                                      status === 'cancelled'
                                        ? 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50'
                                        : 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50'
                                    }`}
                                  >
                                    Mark as {status.charAt(0).toUpperCase() + status.slice(1)}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FarmerOrders;