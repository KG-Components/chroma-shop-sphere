
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-red-700 mb-4">404</h1>
        <p className="text-2xl text-gray-800 mb-8">Page Not Found</p>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-red-700 hover:bg-red-800 rounded-none">
            <ArrowLeft className="mr-2 h-5 w-5" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
