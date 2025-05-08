
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { BASE_PATH, getAssetPath, getImagePath, LOGO_PATHS } from "@/utils/assetUtils";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log detailed information to help with debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    console.log("Environment information:");
    console.log("- BASE_PATH:", BASE_PATH);
    console.log("- Computed root path:", getAssetPath('/'));
    console.log("- Current URL:", window.location.href);
    console.log("- Pathname:", window.location.pathname);
    console.log("- Origin:", window.location.origin);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg text-center">
        <div className="mb-6">
          <div className="mb-6 flex justify-center">
            <img 
              src={getImagePath(LOGO_PATHS.main)}
              alt="the Collektiv Club" 
              className="h-16 mb-4" 
            />
          </div>
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
            <span className="text-4xl font-bold text-red-500">404</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-600 mb-4">
            We couldn't find the page you're looking for.
          </p>
          <div className="px-4 py-3 bg-gray-100 rounded-md mb-6 overflow-auto max-w-full">
            <code className="text-sm text-gray-800 break-all">
              {location.pathname}
            </code>
          </div>
          <p className="text-sm text-gray-500 mb-6">
            This might be because of a mistyped URL, a broken link, or the page has been moved or deleted.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <Link 
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-collektiv-green text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
