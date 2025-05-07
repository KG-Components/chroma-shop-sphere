
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Package, Trash } from "lucide-react";

interface ProductListProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
}

const ProductList = ({ products, onSelectProduct, onDeleteProduct }: ProductListProps) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <div 
          key={product.id}
          className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
          onClick={() => onSelectProduct(product.id)}
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
              onDeleteProduct(product.id);
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
  );
};

export default ProductList;
