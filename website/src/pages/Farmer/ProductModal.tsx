import React, { useState, useEffect } from "react";
import { useProduct } from "@/services/Products/useProduct";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Upload, Plus, X, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: any; // Existing product for edit mode
  onProductSaved?: () => void;
}

export function ProductModal({ open, onOpenChange, product, onProductSaved }: ProductModalProps) {
  const { 
    handleCreateProduct, 
    handleUpdateProduct, 
    loading, 
    error, 
    success, 
    clearError, 
    clearSuccess 
  } = useProduct();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const popularCategories = ["Vegetables", "Fruits", "Grains", "Dairy", "Meat", "Herbs", "Flowers"];

  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (open) {
      if (product) {
        // Edit mode - populate with existing product data
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price?.toString() || "",
          category: product.category || "",
          stock: product.stock?.toString() || "0",
          image: null,
        });
        setImagePreview(product.imageUrl ? getImageUrl(product.imageUrl) : null);
      } else {
        // Add mode - reset form
        setFormData({
          name: "",
          description: "",
          price: "",
          category: "",
          stock: "",
          image: null,
        });
        setImagePreview(null);
      }
      clearError();
      clearSuccess();
    }
  }, [open, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        image: formData.image,
      };

      if (product) {
        // Edit existing product
        await handleUpdateProduct(product._id, productData);
      } else {
        // Create new product
        await handleCreateProduct(productData);
      }
      
      // Close modal and notify parent on success
      if (!error) {
        onOpenChange(false);
        onProductSaved?.();
      }
    } catch (err) {
      console.error('Failed to save product:', err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null }));
    setImagePreview(null);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const getImageUrl = (imagePath: string) => {
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
    if (!imagePath) return "/api/placeholder/400/300";
    if (imagePath.startsWith('http')) return imagePath;
    return `${BASE_URL}${imagePath}`;
  };

  const isEditMode = !!product;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            {isEditMode ? (
              <>
                <Save className="w-6 h-6 text-blue-600" />
                Edit Product
              </>
            ) : (
              <>
                <Plus className="w-6 h-6 text-green-600" />
                Add New Product
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Messages */}
          {error && (
            <Alert variant="destructive" className="animate-in fade-in duration-300">
              <AlertDescription className="flex justify-between items-center">
                {error}
                <Button variant="ghost" size="sm" onClick={clearError} className="h-6 w-6 p-0">
                  <X className="w-3 h-3" />
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 border-green-200 animate-in fade-in duration-300">
              <AlertDescription className="flex justify-between items-center text-green-800">
                {success}
                <Button variant="ghost" size="sm" onClick={clearSuccess} className="h-6 w-6 p-0">
                  <X className="w-3 h-3" />
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Image Upload */}
            <div className="space-y-3">
              <Label htmlFor="image" className="text-base font-semibold">
                Product Image {!isEditMode && '*'}
              </Label>
              
              {imagePreview ? (
                <div className="relative group">
                  <div className="border-2 border-dashed border-green-200 rounded-lg p-4 bg-green-50/50">
                    <img 
                      src={imagePreview} 
                      alt="Product preview" 
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-gray-400 mb-3 group-hover:text-green-600 transition-colors" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (Max. 5MB)</p>
                    {isEditMode && (
                      <p className="text-xs text-blue-500 mt-2">Leave empty to keep current image</p>
                    )}
                  </div>
                  <input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    required={!isEditMode}
                  />
                </label>
              )}
            </div>

            {/* Product Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Product Name *
              </Label>
              <Input
                id="name"
                placeholder="e.g., Organic Tomatoes, Fresh Apples..."
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="h-12 text-base"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-base font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your product... (quality, freshness, growing methods, etc.)"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="min-h-[100px] resize-none text-base"
              />
            </div>

            {/* Price and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="price" className="text-base font-semibold">
                  Price (₹) *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    className="h-12 text-base pl-8"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-base font-semibold">
                  Available Stock
                </Label>
                <Input
                  id="stock"
                  type="number"
                  placeholder="e.g., 100"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
                  className="h-12 text-base"
                  min="0"
                />
              </div>
            </div>

            {/* Category */}
            <div className="space-y-3">
              <Label htmlFor="category" className="text-base font-semibold">
                Category *
              </Label>
              
              {/* Popular Categories as Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                {popularCategories.map((cat) => (
                  <Badge
                    key={cat}
                    variant={formData.category === cat ? "default" : "outline"}
                    className="cursor-pointer hover:bg-green-100 transition-colors"
                    onClick={() => setFormData(prev => ({ ...prev, category: cat }))}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>

              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {popularCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className={`flex-1 ${
                  isEditMode 
                    ? "bg-blue-600 hover:bg-blue-700" 
                    : "bg-green-600 hover:bg-green-700"
                } transition-colors`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  <>
                    {isEditMode ? (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Update Product
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Product
                      </>
                    )}
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}