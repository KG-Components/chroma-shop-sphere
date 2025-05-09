
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, TrendingUp, Award, Box, RefreshCcw, Shield, Clock, Cpu, CircuitBoard } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import FeaturedProductsSlideshow from "@/components/home/FeaturedProductsSlideshow";
import CategoriesSlideshow from "@/components/home/CategoriesSlideshow";
import HomePageComponent3D from "@/components/three/HomePageComponent3D";

const Index = () => {
  const { products, fetchProducts, fetchCategories, categories } = useProductStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const featuredProducts = products.slice(0, 8);

  // Enhanced hero slideshow data with better electronic-focused images
  const heroSlides = [
    {
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=3000&auto=format&fit=crop",
      title: "Premium Electronic Components",
      description: "Professional tools and components for engineers, hobbyists, and businesses",
      buttonText: "Shop Now",
      buttonLink: "/shop"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=3000&auto=format&fit=crop",
      title: "Test & Measurement Equipment",
      description: "Precision instruments for accurate readings and reliable results",
      buttonText: "Explore",
      buttonLink: "/shop?category=Test%20and%20Measurements"
    },
    {
      imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3000&auto=format&fit=crop",
      title: "Professional Tools For Every Task",
      description: "High-quality equipment from trusted brands with guaranteed performance",
      buttonText: "View Tools",
      buttonLink: "/shop?category=Tools"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Slideshow Section with 3D Animation */}
      <HeroSlideshow slides={heroSlides} />

      {/* Promo Banner with LED indicator */}
      <section className="bg-blue-50 py-4 border-b border-blue-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center text-blue-800">
            <span className="led-indicator"></span>
            <p className="font-medium">Free shipping on orders over $100 | <span className="underline cursor-pointer">Learn More</span></p>
          </div>
        </div>
      </section>

      {/* 3D Component Showcase */}
      <section className="py-16 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Explore Our Components in 3D</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Click on any component in the scene to get a closer look and learn more about our product offerings
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <HomePageComponent3D className="shadow-lg border border-gray-200" />
            </div>
            <div className="flex flex-col justify-center bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold mb-4">Premium Electronic Components</h3>
              <p className="text-gray-600 mb-6">
                Our catalog features high-quality electronic components sourced from trusted manufacturers. 
                From resistors and capacitors to integrated circuits and specialized modules, we have everything 
                you need for your next project.
              </p>
              <Link to="/shop">
                <Button size="lg" className="w-full">
                  Browse Components <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props Section with Enhanced 3D Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start space-x-4 group component-card p-6 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full transition-all group-hover:bg-blue-200">
                <CircuitBoard className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Premium Selection</h3>
                <p className="text-gray-600">Carefully selected quality components from trusted manufacturers</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group component-card p-6 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full transition-all group-hover:bg-blue-200">
                <Shield className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Quality Guaranteed</h3>
                <p className="text-gray-600">All products undergo rigorous quality testing before shipping</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group component-card p-6 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full transition-all group-hover:bg-blue-200">
                <Clock className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick processing and shipping to get your orders to you faster</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 group component-card p-6 rounded-lg">
              <div className="bg-blue-100 p-3 rounded-full transition-all group-hover:bg-blue-200">
                <Cpu className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Technical Support</h3>
                <p className="text-gray-600">Expert assistance for all your component and equipment needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Banner with Circuit Board Background */}
      <section className="py-12 relative circuit-bg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1580508174046-170816f65662?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Precision Components for Every Project</h2>
            <p className="text-xl mb-8">Discover our extensive range of electronic components, tools, and test equipment</p>
            <Link to="/shop">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-6 text-base font-semibold">
                Browse Catalog <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Slideshow Section */}
      <CategoriesSlideshow 
        categories={categories} 
        title="Browse Our Categories"
        description="Find exactly what you need for your next project"
      />

      {/* Featured Products Slideshow Section */}
      <FeaturedProductsSlideshow
        products={featuredProducts}
        title="Featured Products"
        description="Top picks from our extensive catalog"
      />

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-gray-600 mt-2">Trusted by professionals and hobbyists alike</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "John K.",
                role: "Electrical Engineer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=687&auto=format&fit=crop",
                comment: "The quality of components I've received has been consistently excellent. My go-to supplier for all electronic needs.",
              },
              {
                name: "Sarah T.",
                role: "DIY Enthusiast",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop",
                comment: "As a hobbyist, I appreciate the vast selection and helpful customer service when I need guidance on my projects.",
              },
              {
                name: "Michael R.",
                role: "Product Developer",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop",
                comment: "Fast shipping and reliable parts. I've been using KG Components for all my prototyping needs for years.",
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 text-yellow-400 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-700 flex-grow">"{testimonial.comment}"</p>
                    <div className="mt-6 flex items-center">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img src={testimonial.image} alt={testimonial.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges and Brands */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Trusted Brands We Carry</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Texas_Instruments_Logo.svg/1024px-Texas_Instruments_Logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Analog_Devices_logo_and_wordmark.svg/2560px-Analog_Devices_logo_and_wordmark.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Intel_Logo.svg/1280px-Intel_Logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Arduino_Logo.svg/1280px-Arduino_Logo.svg.png",
              "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microchip_logo.svg/2560px-Microchip_logo.svg.png"
            ].map((logo, index) => (
              <div key={index} className="w-24 md:w-32 h-12 md:h-16 flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
                <img src={logo} alt={`Brand logo ${index+1}`} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of satisfied customers who trust us for their electronic component needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-blue-50 px-8 py-6 text-base font-semibold">
                Start Shopping
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-6 text-base font-semibold">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Improved Design */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-blue-50 rounded-2xl p-8 shadow-sm">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-8">
                Subscribe to receive updates on new products, special offers, and useful tips for your projects.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 flex-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-blue-700 hover:bg-blue-800 py-6 px-8 text-base font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
