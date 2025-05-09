
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, Trash, Edit, Star } from "lucide-react";

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
          className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
          onClick={() => onSelectProduct(product.id)}
        >
          <div className="w-20 h-20 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Package className="text-gray-300 w-8 h-8" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-base font-medium text-gray-900 truncate">{product.name}</div>
                <div className="flex items-center mt-1">
                  <Badge variant="outline" className="text-xs font-normal bg-blue-50 text-blue-700 border-blue-200 mr-2">
                    ID: {product.id.toString().substring(0, 8)}
                  </Badge>
                  <div className="flex items-center text-amber-500 text-xs">
                    <Star className="h-3 w-3 fill-current mr-1" />
                    <span>4.5</span>
                  </div>
                </div>
              </div>
              <div className="text-base font-semibold text-blue-700">${product.price.toFixed(2)}</div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm text-gray-600">Stock: {product.stock_quantity}</div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-blue-700 hover:bg-blue-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product.id);
                  }}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-red-600 hover:bg-red-50"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProduct(product.id);
                  }}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {products.length === 0 && (
        <div className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900">No products found</h3>
          <p className="mt-1 text-sm text-gray-500">Start by adding a new product using the form.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
