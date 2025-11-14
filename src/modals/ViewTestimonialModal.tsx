import React from "react";

interface Testimonial {
  id: number;
  full_name: string;
  occupation: string;
  comment: string;
  image: string | File;
}

interface ViewTestimonialModalProps {
  isOpen: boolean;
  testimonial: Testimonial | null;
  isLoading?: boolean;
  onClose: () => void;
}

const ViewTestimonialModal: React.FC<ViewTestimonialModalProps> = ({
  isOpen,
  testimonial,
  isLoading = false,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg animate-in fade-in zoom-in">
        <h2 className="text-lg font-semibold mb-4 text-center">
          View Testimonial Details
        </h2>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-20 w-20 bg-gray-300 rounded-full mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="space-y-3 text-center h-[55vh] overflow-y-scroll pr-5 styled-scrollbar">
            {testimonial?.image && (
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${
                  testimonial.image
                }`}
                alt={testimonial.full_name}
                className="w-24 h-24 rounded-full mx-auto object-cover border"
              />
            )}
            <p>
              <span className="font-semibold">Full Name:</span>{" "}
              {testimonial?.full_name}
            </p>
            <p>
              <span className="font-semibold">Occupation:</span>{" "}
              {testimonial?.occupation}
            </p>
            <p>
              <span className="font-semibold">Comment:</span>
            </p>
            <p className="text-gray-700 whitespace-pre-wrap">
              {decodeURIComponent(
                testimonial?.comment ? testimonial?.comment : ""
              )}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTestimonialModal;
