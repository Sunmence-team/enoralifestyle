import React from "react";

const BlogCardSkeleton : React.FC = () => {
  return (
    <div
      className="relative bg-white rounded-3xl shadow flex flex-col gap-2 justify-between border border-black/10 overflow-hidden animate-pulse"
      aria-hidden="true" // Hide from screen readers as it's purely decorative
    >
      {/* Skeleton Text Area */}
      <div className="px-5 pt-6 text-start">
        {/* Skeleton Title (e.g., two lines) */}
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="h-6 bg-gray-200 rounded w-5/6 mb-4"></div>

        {/* Skeleton Description (e.g., two lines) */}
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-11/12"></div>
      </div>

      {/* Skeleton Image Area */}
      <div className="relative overflow-hidden p-5">
        {/* Skeleton Blog image placeholder */}
        <div className="wave-div z-1 rounded-t-3xl h-[300px] overflow-hidden mb-8 bg-gray-300">
          {/* Image placeholder content (e.g., a simple color block) */}
        </div>
        
        {/* Skeleton "Read more" link placeholder */}
        <div className="absolute z-9 bottom-0 left-1/2 -translate-x-1/2 pb-6">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSkeleton;