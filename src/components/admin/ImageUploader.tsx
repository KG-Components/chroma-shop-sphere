
import { useState, ChangeEvent } from "react";
import { Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  imagePreview: string | null;
  onImageChange: (file: File | null) => void;
  uploadProgress: number;
}

export const ImageUploader = ({ 
  imagePreview, 
  onImageChange,
  uploadProgress 
}: ImageUploaderProps) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onImageChange(file);
    }
  };

  return (
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
  );
};

export default ImageUploader;
