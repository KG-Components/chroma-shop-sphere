
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Category } from "@/types"
import { Button } from "@/components/ui/button"

interface CategoriesSlideshowProps {
  categories: Category[];
  title: string;
  description?: string;
}

const CategoriesSlideshow = ({ categories, title, description }: CategoriesSlideshowProps) => {
  return (
    <section className="py-16 bg-gray-50">
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
              {categories.map((category) => (
                <CarouselItem key={category.id} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Link
                    to={`/shop?category=${category.name}`}
                    className="block h-full"
                  >
                    <Card className="overflow-hidden h-full border-0 shadow-md">
                      <div className="h-40 bg-gray-900 flex items-center justify-center">
                        <div className="text-xl font-semibold text-white">
                          {category.name}
                        </div>
                      </div>
                      <CardContent className="p-4 bg-white">
                        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                          {category.description || `Browse our selection of ${category.name.toLowerCase()}`}
                        </p>
                        <Button variant="outline" size="sm" className="w-full border-red-700 text-red-700 hover:bg-red-50 rounded-none">
                          View Products
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 bg-red-700 text-white hover:bg-red-800 border-none" />
            <CarouselNext className="right-1 bg-red-700 text-white hover:bg-red-800 border-none" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

export default CategoriesSlideshow
