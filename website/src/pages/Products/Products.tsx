import { useState, useEffect } from 'react';
import { ShoppingCart, Search, X, Filter, Star, Truck, Shield } from 'lucide-react';
import { getProducts, getImageUrl, type Product } from '@/services/Products/productApi';
import { useCart } from '@/services/Cart/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showMessage, setShowMessage] = useState(false);

  const navigate = useNavigate();

  const { addToCart, isLoggedIn, success, error, clearError, clearSuccess, cartTotals } = useCart();

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Dairy', 'Meat', 'Herbs', 'Flowers', 'Other'];

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchQuery, selectedCategory, products]);

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
  }, [success, error]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      const approvedProducts = data.filter(p => p.status === 'approved');
      setProducts(approvedProducts);
      setFilteredProducts(approvedProducts);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = async (productId: string) => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      await addToCart(productId, 1);
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <CardHeader className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </CardHeader>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Header with Cart */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Our Products</h2>
            <p className="text-muted-foreground mt-2">
              Handpicked fresh produce from trusted local farmers
            </p>
          </div>
          
          {isLoggedIn && cartTotals && cartTotals.itemCount > 0 && (
            <Button onClick={() => navigate('/cart')} variant="outline" className="relative">
                <ShoppingCart className="w-5 h-5" />
                View Cart
                <Badge variant="secondary" className="ml-2 bg-green-600 text-white">
                  {cartTotals.itemCount}
                </Badge>
            </Button>
          )}
        </div>

        {/* Messages */}
        {showMessage && (success || error) && (
          <Alert className={`mb-6 ${success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <AlertDescription className={success ? 'text-green-800' : 'text-red-800'}>
              <div className="flex justify-between items-center">
                <span>{success || error}</span>
                <Button variant="ghost" size="sm" onClick={success ? clearSuccess : clearError}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Filters Section */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <h3 className="font-semibold">Filters</h3>
              </div>
              
              <div className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Search Products</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search by name or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Category Tabs */}
            <div className="mt-6">
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-9 h-auto p-1 bg-muted/50">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="text-xs py-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        {loading ? (
          <LoadingSkeleton />
        ) : filteredProducts.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent className="space-y-4">
              <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
              </p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product._id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-green-100 dark:border-green-900">
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(product.imageUrl)}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/api/placeholder/400/300';
                    }}
                  />
                  
                  {/* Category Badge */}
                  <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700">
                    {product.category}
                  </Badge>

                  {/* Stock Status */}
                  {product.stock !== undefined && (
                    <Badge 
                      variant="secondary" 
                      className={`absolute top-3 right-3 ${
                        product.stock > 0 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}
                    >
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-green-600 transition-colors">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 h-10">
                    {product.description || 'Fresh and quality product from local farms'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-green-600">
                          ₹{product.price}
                        </span>
                        {product.unit && (
                          <span className="text-sm text-muted-foreground">/{product.unit}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => handleAddToCart(product._id!)}
                    disabled={product.stock === 0}
                    className={`w-full gap-2 ${
                      product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                    size="lg"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Load More Section (for future pagination) */}
        {!loading && filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
              Load More Products
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;