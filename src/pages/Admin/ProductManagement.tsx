
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProductStore } from "@/store/productStore";
import { useToast } from "@/hooks/use-toast";
import { Package, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import ProductForm from "@/components/admin/ProductForm";
import ProductList from "@/components/admin/ProductList";

const ProductManagement = () => {
  const { products, categories, fetchProducts, fetchCategories } = useProductStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
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
            <ProductForm 
              initialData={formData}
              categories={categories}
              onSuccess={fetchProducts}
              onReset={resetForm}
            />
          </CardContent>
        </Card>
        
        {/* Right: Products List */}
        <Card className="h-[700px] overflow-y-auto">
          <CardHeader>
            <CardTitle>Product List</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductList 
              products={products}
              onSelectProduct={loadProductData}
              onDeleteProduct={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagement;
