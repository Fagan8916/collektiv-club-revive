
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BASE_PATH, getAssetPath } from "@/utils/assetUtils";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log the route that wasn't found to help with debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Log environment information to help debug routing issues
    console.log("Current BASE_PATH:", BASE_PATH);
    console.log("Full computed path:", getAssetPath('/'));
    console.log("Window location:", window.location.href);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-lg rounded-lg max-w-md">
        <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you're looking for ({location.pathname}) doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="inline-block bg-collektiv-green text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition-colors"
          onClick={() => console.log("Navigating to home page from 404")}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
