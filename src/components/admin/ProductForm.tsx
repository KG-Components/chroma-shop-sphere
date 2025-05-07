
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Category, Product } from "@/types";
import ImageUploader from "./ImageUploader";

interface ProductFormData {
  id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  stock_quantity: number;
  image_url: string;
}

interface ProductFormProps {
  initialData: ProductFormData;
  categories: Category[];
  onSuccess: () => void;
  onReset: () => void;
}

const ProductForm = ({ initialData, categories, onSuccess, onReset }: ProductFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ProductFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData.image_url || null
  );
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const handleImageChange = (file: File | null) => {
    setProductImage(file);
    
    if (file) {
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(formData.image_url || null);
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

      // Set initial upload progress
      setUploadProgress(10);
      
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

      // Reset form and notify parent of success
      onSuccess();
      onReset();
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

  return (
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
      
      <ImageUploader
        imagePreview={imagePreview}
        onImageChange={handleImageChange}
        uploadProgress={uploadProgress}
      />
      
      <div className="flex justify-end pt-4">
        <Button type="submit" className="gap-2" disabled={isSubmitting}>
          <Save className="h-4 w-4" />
          {isSubmitting ? "Saving..." : "Save Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
