
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-collektiv-accent via-white to-green-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-collektiv-green mx-auto"></div>
        <p className="mt-4 text-collektiv-green">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
