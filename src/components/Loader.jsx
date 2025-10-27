import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative flex justify-center items-center">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-neutral-200 rounded-full"></div>
        {/* Spinning accent ring */}
        <div className="absolute w-16 h-16 border-4 border-t-black border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
