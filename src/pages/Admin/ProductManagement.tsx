import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useProductStore } from "@/store/productStore";
import { useToast } from "@/hooks/use-toast";
import { Package, Image, Save, Plus, Trash } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

const ProductManagement = () => {
  const { products, categories, fetchProducts, fetchCategories } = useProductStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    id: "", // Empty for new product, filled for editing
    name: "",
    description: "",
    price: 0,
    category_id: "",
    stock_quantity: 0,
    image_url: ""
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProductImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "stock_quantity" ? 
        Number(value) : value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      description: "",
      price: 0,
      category_id: "",
      stock_quantity: 0,
      image_url: ""
    });
    setProductImage(null);
    setImagePreview(null);
    setUploadProgress(0);
  };

  const loadProductData = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData({
        id: product.id,
        name: product.name,
        description: product.description || "",
        price: product.price,
        category_id: product.category_id,
        stock_quantity: product.stock_quantity,
        image_url: product.image_url || ""
      });
      
      if (product.image_url) {
        setImagePreview(product.image_url);
      }
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!productImage) {
      return formData.image_url; // Return existing URL if no new image
    }

    try {
      // Generate a unique file name
      const fileExt = productImage.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}-${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload the file without using onUploadProgress
      const { error } = await supabase.storage
        .from('product-images')
        .upload(filePath, productImage, {
          cacheControl: '3600',
          upsert: true
        });

      if (error) {
        throw error;
      }

      // Manually set progress to 100% since we can't track it
      setUploadProgress(100);

      // Get the public URL
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      toast({
        title: "Error uploading image",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive"
      });
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload image if there is one
      const imageUrl = await uploadImage();
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category_id: formData.category_id,
        stock_quantity: formData.stock_quantity,
        image_url: imageUrl
      };

      let result;
      
      if (formData.id) {
        // Update existing product
        result = await supabase
          .from('products')
          .update(productData)
          .eq('id', formData.id);
      } else {
        // Create new product
        result = await supabase
          .from('products')
          .insert([productData]);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: formData.id ? "Product updated" : "Product created",
        description: `Successfully ${formData.id ? 'updated' : 'added'} product: ${formData.name}`,
      });

      // Refresh products list
      fetchProducts();
      resetForm();
    } catch (error) {
      toast({
        title: "Error saving product",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted",
      });

      // Refresh products list
      fetchProducts();
      
      // Reset form if we were editing the deleted product
      if (formData.id === id) {
        resetForm();
      }
    } catch (error) {
      toast({
        title: "Error deleting product",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Product Management</h2>
        <Button onClick={resetForm} variant="outline" className="gap-2">
          <Plus className="h-4 w-4" />
          New Product
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Product Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              {formData.id ? "Edit Product" : "Add New Product"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Label htmlFor="name">Product Name</Label>
                <Input 
                  id="name"
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Product Name" 
                  required 
                />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange} 
                  placeholder="Product Description"
                  rows={4}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input 
                    id="price"
                    name="price" 
                    type="number" 
                    value={formData.price} 
                    onChange={handleChange} 
                    min="0" 
                    step="0.01"
                    required 
                  />
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="stock_quantity">Stock Quantity</Label>
                  <Input 
                    id="stock_quantity"
                    name="stock_quantity" 
                    type="number" 
                    value={formData.stock_quantity} 
                    onChange={handleChange} 
                    min="0" 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={formData.category_id} 
                  onValueChange={(value) => handleSelectChange("category_id", value)}
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="product-image">Product Image</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
                    {imagePreview ? (
                      <img 
                        src={imagePreview} 
                        alt="Product preview" 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <Input 
                      id="product-image"
                      type="file"
                      onChange={handleImageChange}
                      accept="image/*"
                      className="mb-2"
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" className="gap-2" disabled={isSubmitting}>
                  <Save className="h-4 w-4" />
                  {isSubmitting ? "Saving..." : "Save Product"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        
        {/* Right: Products List */}
        <Card className="h-[700px] overflow-y-auto">
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {products.map((product) => (
                <div 
                  key={product.id}
                  className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => loadProductData(product.id)}
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                    {product.image_url ? (
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package className="text-gray-400 w-8 h-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{product.name}</div>
                    <div className="text-xs text-gray-500">Price: ${product.price.toFixed(2)}</div>
                    <div className="text-xs text-gray-500">Stock: {product.stock_quantity}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product.id);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              {products.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  No products found. Start by adding a new product.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagement;
