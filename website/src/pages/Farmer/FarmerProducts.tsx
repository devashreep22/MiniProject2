import { useState, useEffect } from "react";
import { useProduct } from "@/services/Products/useProduct";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Edit, Trash2, Package, Filter, Plus, TrendingUp, Clock, CheckCircle, XCircle, Search, Grid3x3, List } from "lucide-react";
import { ProductModal } from "./ProductModal";
import { getImageUrl } from "@/services/Products/productApi";

export default function FarmerProducts() {
  const { 
    farmerProducts, 
    fetchFarmerProducts, 
    handleDeleteProduct, 
    loading, 
    error, 
    success,
  } = useProduct();

  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    fetchFarmerProducts();
  }, []);

  const handleProductSaved = () => {
    fetchFarmerProducts();
    setEditingProduct(null);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const filteredProducts = farmerProducts.filter(product => {
    const matchesStatus = filterStatus === "all" || product.status === filterStatus;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { 
        variant: "secondary" as const, 
        label: "Pending", 
        icon: Clock,
        className: "bg-amber-100 text-amber-700 hover:bg-amber-100"
      },
      approved: { 
        variant: "default" as const, 
        label: "Approved", 
        icon: CheckCircle,
        className: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100"
      },
      rejected: { 
        variant: "destructive" as const, 
        label: "Rejected", 
        icon: XCircle,
        className: "bg-red-100 text-red-700 hover:bg-red-100"
      }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await handleDeleteProduct(id);
    }
  };

  const stats = [
    {
      label: "Total Products",
      value: farmerProducts.length,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      label: "Approved",
      value: farmerProducts.filter(p => p.status === 'approved').length,
      icon: CheckCircle,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      label: "Pending Review",
      value: farmerProducts.filter(p => p.status === 'pending').length,
      icon: Clock,
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      label: "Rejected",
      value: farmerProducts.filter(p => p.status === 'rejected').length,
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  if (loading && farmerProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-8xl mx-auto px-2 sm:px-4 lg:px-4 py-2">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Product Dashboard
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Manage and track your farm products
              </p>
            </div>
            <Button 
              onClick={handleAdd} 
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg shadow-green-200"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Alert Messages */}
        {error && (
          <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
            <XCircle className="w-4 h-4" />
            <AlertDescription className="ml-2">{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription className="ml-2 text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        {/* Product Modal */}
        <ProductModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          product={editingProduct}
          onProductSaved={handleProductSaved}
        />

        {/* Stats Cards */}
        {farmerProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {stat.label}
                        </p>
                        <p className={`text-3xl font-bold ${stat.color}`}>
                          {stat.value}
                        </p>
                      </div>
                      <div className={`${stat.bgColor} p-4 rounded-2xl`}>
                        <Icon className={`w-8 h-8 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Search and Filters */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products by name or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <div className="flex gap-2">
                  {["all", "approved", "pending", "rejected"].map((status) => (
                    <Button
                      key={status}
                      variant={filterStatus === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterStatus(status)}
                      className={filterStatus === status ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2 border-l pl-4">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Display */}
        {filteredProducts.length === 0 ? (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {filterStatus === "all" && searchQuery === ""
                  ? "Start building your product catalog by adding your first farm product." 
                  : searchQuery !== ""
                  ? `No products match "${searchQuery}"`
                  : `No products with ${filterStatus} status.`
                }
              </p>
              {filterStatus === "all" && searchQuery === "" && (
                <Button onClick={handleAdd} size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Your First Product
                </Button>
              )}
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product._id} className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden bg-gray-200 h-56">
                  <img 
                    src={getImageUrl(product.imageUrl)} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/api/placeholder/400/300";
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(product.status || 'pending')}
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl font-bold text-gray-900">{product.name}</CardTitle>
                  </div>
                  <CardDescription className="line-clamp-2 text-gray-600">
                    {product.description || "No description provided"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Price</p>
                        <p className="text-2xl font-bold text-green-600">
                          ₹{product.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Stock</p>
                        <p className="text-2xl font-bold text-gray-900">
                          {product.stock}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-700 font-medium">
                        {product.category}
                      </span>
                      <span className="text-gray-500">
                        {product.createdAt && new Date(product.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                        onClick={() => handleDelete(product._id!)}
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <Card key={product._id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img 
                      src={getImageUrl(product.imageUrl)} 
                      alt={product.name}
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/api/placeholder/400/300";
                      }}
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{product.name}</h3>
                          <p className="text-gray-600">{product.description || "No description provided"}</p>
                        </div>
                        {getStatusBadge(product.status || 'pending')}
                      </div>
                      <div className="flex items-center gap-8 mt-4">
                        <div>
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Stock</p>
                          <p className="text-xl font-bold text-gray-900">{product.stock}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Category</p>
                          <p className="font-medium text-gray-900">{product.category}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Added</p>
                          <p className="font-medium text-gray-900">
                            {product.createdAt && new Date(product.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(product)}
                        className="hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(product._id!)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}