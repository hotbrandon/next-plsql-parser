import React from "react";

const LoadingOverlay = () => {
  return (
    <div class="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center">
      <div class="absolute w-full h-full bg-gray-900 opacity-75"></div>
      <div class="text-white font-bold text-2xl tracking-widest uppercase">
        Loading...
      </div>
      <div class="relative">
        <div class="inline-block animate-spin ease duration-300 w-10 h-10 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
