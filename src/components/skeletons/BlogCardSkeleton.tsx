import React from "react";

const BlogCardSkeleton = () => {
  return (
    <div className="relative bg-white rounded-3xl shadow animate-pulse flex flex-col gap-2 justify-between text-center border border-black/10 overflow-hidden">
      <div className="px-5 pt-6 text-start space-y-3">
        <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
      </div>

      <div className="relative overflow-hidden p-5 flex justify-center items-center">
        <div className="wave-div z-1 rounded-t-3xl h-[300px] overflow-hidden mb-8 bg-gray-200 w-full"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-3 h-4 w-24 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;
