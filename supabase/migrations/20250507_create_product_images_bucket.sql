
-- Create a storage bucket for product images
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'Product Images', true);

-- Create a policy to allow anyone to read from the product-images bucket
CREATE POLICY "Public Access" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'product-images');

-- Create a policy to allow authenticated users to upload images to the product-images bucket
CREATE POLICY "Authenticated users can upload images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'product-images' AND 
  auth.role() = 'authenticated'
);

-- Create a policy to allow authenticated users to update their own images
CREATE POLICY "Authenticated users can update their own images" 
ON storage.objects 
FOR UPDATE 
USING (
  bucket_id = 'product-images' AND 
  auth.uid() = owner
);

-- Create a policy to allow authenticated users to delete their own images
CREATE POLICY "Authenticated users can delete their own images" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'product-images' AND 
  auth.uid() = owner
);
