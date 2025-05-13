
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { ProductWithCategory } from "@/types"

interface FeaturedProductsSlideshowProps {
  products: ProductWithCategory[];
  title: string;
  description?: string;
}

const FeaturedProductsSlideshow = ({ products, title, description }: FeaturedProductsSlideshowProps) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <div className="h-1 w-20 bg-red-700 mx-auto mb-4"></div>
          {description && <p className="text-gray-600">{description}</p>}
        </div>
        
        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/6">
                  <Link to={`/product/${product.id}`} className="block h-full">
                    <div className="bg-white border border-gray-200 hover:shadow-lg transition-shadow h-full">
                      <div className="aspect-square overflow-hidden">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center bg-gray-100">
                            <ShoppingBag className="h-12 w-12 text-gray-300" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                          {product.name}
                        </h3>
                        <p className="font-bold text-red-700">
                          ${Number(product.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-red-700 text-white hover:bg-red-800 border-none" />
            <CarouselNext className="right-1 bg-red-700 text-white hover:bg-red-800 border-none" />
          </Carousel>
        </div>
        
        <div className="text-center mt-10">
          <Link to="/shop">
            <Button className="bg-red-700 hover:bg-red-800 rounded-none">
              View All Products <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedProductsSlideshow
