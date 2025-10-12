import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "@/services/Products/useProduct";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, ArrowLeft, Edit, Star, Eye, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getImageUrl, getProductById } from "@/services/Products/productApi";

export default function ViewProduct() {
  const { id } = useParams<{ id: string }>();
  const {loading, error } = useProduct();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const productData = await getProductById(id);
          setProduct(productData);
        } catch (err) {
          console.error('Failed to fetch product:', err);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending Review" },
      approved: { variant: "default" as const, label: "Approved" },
      rejected: { variant: "destructive" as const, label: "Rejected" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-2">({rating})</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <Alert variant="destructive">
              <AlertDescription>
                {error || "Product not found"}
              </AlertDescription>
            </Alert>
            <Link to="/farmer/products" className="mt-4 inline-block">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Link to="/farmer/products">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
              <p className="text-gray-600 mt-1">View complete information about your product</p>
            </div>
          </div>
          <Link to={`/farmer/edit-product/${product._id}`}>
            <Button className="bg-green-600 hover:bg-green-700">
              <Edit className="w-4 h-4 mr-2" />
              Edit Product
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <img 
                src={getImageUrl(product.imageUrl)} 
                alt={product.name}
                className="w-full h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/api/placeholder/600/400";
                }}
              />
            </CardContent>
          </Card>

          {/* Product Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{product.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">
                      {product.category}
                    </CardDescription>
                  </div>
                  {getStatusBadge(product.status || 'pending')}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold text-green-600">
                    ₹{product.price}
                  </span>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Available Stock</div>
                    <div className="text-xl font-semibold">{product.stock} units</div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-700">
                    {product.description || "No description provided."}
                  </p>
                </div>

                <Separator />

                {/* Product Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <Eye className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{product.views || 0}</div>
                    <div className="text-sm text-blue-600">Views</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <ShoppingCart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{product.salesCount || 0}</div>
                    <div className="text-sm text-green-600">Sales</div>
                  </div>
                </div>

                {/* Rating */}
                {product.rating && product.rating.count > 0 && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Customer Rating</h3>
                      {renderStars(product.rating.average)}
                      <div className="text-sm text-gray-600 mt-1">
                        Based on {product.rating.count} reviews
                      </div>
                    </div>
                  </>
                )}

                {/* Farmer Info */}
                <Separator />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Farmer Information</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold">
                        {product.farmer?.name?.charAt(0) || 'F'}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{product.farmer?.name || "Farmer"}</div>
                      <div className="text-sm text-gray-600">{product.farmer?.farmName || "Local Farm"}</div>
                    </div>
                  </div>
                </div>

                {/* Product Metadata */}
                <Separator />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Created:</span>
                    <div className="text-gray-600">
                      {product.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Last Updated:</span>
                    <div className="text-gray-600">
                      {product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}