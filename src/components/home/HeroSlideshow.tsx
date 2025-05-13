
import { useState, useEffect } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { useProductStore } from "@/store/productStore"

interface Slide {
  imageUrl: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

interface HeroSlideshowProps {
  slides: Slide[];
}

const HeroSlideshow = ({ slides }: HeroSlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products, fetchProducts } = useProductStore();
  const [featuredProducts, setFeaturedProducts] = useState<Slide[]>(slides);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  useEffect(() => {
    // Fetch products if not already loaded
    if (products.length === 0) {
      fetchProducts();
    } else {
      // Create dynamic slides from products
      const productSlides = products
        .filter(product => product.image_url) // Only use products with images
        .slice(0, 5) // Limit to 5 products
        .map(product => ({
          imageUrl: product.image_url || '',
          title: product.name,
          description: product.description || 'Premium electronic component with advanced features',
          buttonText: 'View Product',
          buttonLink: `/product/${product.id}`
        }));
      
      // If we have product slides, merge them with any static slides
      if (productSlides.length > 0) {
        setFeaturedProducts([...productSlides, ...slides.slice(0, 2)]);
      }
    }
  }, [products, fetchProducts, slides]);

  return (
    <div className="w-full relative overflow-hidden">
      <Carousel
        opts={{
          loop: true,
          duration: 50,
          startIndex: currentSlide,
        }}
        className="w-full"
        onSelect={(event) => {
          // The Carousel onSelect provides a React event, not an index
          // We'll get the current slide from the Carousel API after the event
          const api = (event.currentTarget as any)._emblaApi;
          if (api) {
            const selectedIndex = api.selectedScrollSnap();
            setCurrentSlide(selectedIndex);
          }
        }}
      >
        <CarouselContent>
          {featuredProducts.map((slide, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full h-[600px] overflow-hidden">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img 
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
                    <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">{slide.description}</p>
                    <Link to={slide.buttonLink}>
                      <Button size="lg" className="bg-red-700 hover:bg-red-800 text-white rounded-none px-8 py-6">
                        {slide.buttonText} <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-6 z-30 bg-red-700 text-white hover:bg-red-800 border-none" />
        <CarouselNext className="right-6 z-30 bg-red-700 text-white hover:bg-red-800 border-none" />
      </Carousel>
      
      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {featuredProducts.map((_, index) => (
          <div 
            key={index} 
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-12 cursor-pointer transition-all duration-300 ${
              index === currentSlide 
                ? "bg-red-700" 
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroSlideshow
