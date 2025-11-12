import React from "react";

const TestimonialCardSkeleton: React.FC = () => {
  return (
    <div
      className={`
        flex flex-col flex-shrink-0 w-[300px] h-[360px] snap-center 
        lg:flex-1 lg:min-w-[350px] lg:h-[380px]
        transition-all duration-300 animate-pulse
      `}
    >
      {/* Top section (review content skeleton) */}
      <div className="border border-black/20 rounded-t-2xl px-4 py-8 flex-1 flex flex-col bg-white">
        <div className="flex items-center gap-1 mb-4">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded"></div>
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-300 rounded"></div>
        </div>

        <div className="flex-1 space-y-2">
          <div className="h-3 bg-gray-300 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-4/5"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>

      {/* Bottom section (profile skeleton) */}
      <div className="p-3 rounded-b-2xl bg-gray-300/50">
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-300 flex-shrink-0"></div>
          <div className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-24"></div>
            <div className="h-2.5 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCardSkeleton;
