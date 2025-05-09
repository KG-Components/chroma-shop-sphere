
import { useState, ChangeEvent } from "react";
import { Image } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    <div className="space-y-3">
      <Label htmlFor="product-image" className="text-sm font-medium">Product Image</Label>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 bg-gray-50 border border-gray-200 rounded-md overflow-hidden">
          <AspectRatio ratio={1/1} className="bg-muted">
            {imagePreview ? (
              <img 
                src={imagePreview} 
                alt="Product preview" 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-50">
                <Image className="w-8 h-8 text-gray-300" />
              </div>
            )}
          </AspectRatio>
        </div>
        <div className="flex-1">
          <Input 
            id="product-image"
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="mb-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" 
                style={{ width: `${uploadProgress}%` }}
              ></div>
              <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
