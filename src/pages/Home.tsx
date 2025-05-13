
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/productStore";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const { products, fetchProducts, fetchCategories, categories } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const featuredProducts = products.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative bg-black">
        <div className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black/60"></div>
          <img 
            src="https://images.unsplash.com/photo-1580508174046-170816f65662?q=80&w=1470&auto=format&fit=crop" 
            alt="Hero Image" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 max-w-4xl">
              Electronic Components & Accessories
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Quality electronic components for industry professionals, technicians, and enthusiasts
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" className="bg-sircony hover:bg-sircony/90 text-white border-0 rounded-none px-8 py-6 text-lg">
                  Shop Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-none px-8 py-6 text-lg">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Categories</h2>
            <div className="h-1 w-20 bg-sircony mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/shop?category=${category.name}`}
                className="group"
              >
                <div className="overflow-hidden bg-gray-100 aspect-square relative">
                  <div className="absolute inset-0 bg-gray-900/30 group-hover:bg-gray-900/50 transition-all z-10"></div>
                  <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                    <h3 className="text-2xl font-bold text-white text-center">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <div className="h-1 w-20 bg-sircony mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
                    {product.name}
                  </h3>
                  <p className="font-bold text-sircony">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/shop">
              <Button className="bg-sircony hover:bg-sircony/90 rounded-none">
                View All Products <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                About Our Company
              </h2>
              <div className="h-1 w-20 bg-sircony mb-6"></div>
              <p className="text-gray-700 mb-6">
                We are a leading supplier of electronic components and accessories, serving 
                technicians, engineers, and hobbyists alike. With years of experience in the industry,
                we pride ourselves on offering quality products at competitive prices.
              </p>
              <p className="text-gray-700 mb-6">
                Our extensive inventory includes a wide range of electronic components, 
                test equipment, tools, and accessories to meet all your project needs.
              </p>
              <Link to="/about">
                <Button className="bg-sircony hover:bg-sircony/90 rounded-none">
                  Learn More About Us <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop" 
                  alt="About Us" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sircony text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Browse our extensive catalog of quality electronic components.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-sircony hover:bg-gray-100 rounded-none px-8 py-6">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
