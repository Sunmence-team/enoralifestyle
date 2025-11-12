import React, { useState, useEffect } from "react";
import type { testimonialProps } from "../utilities/sharedInterFaces";

interface EditTestimonialModalProps {
  isOpen: boolean;
  testimonial: testimonialProps | null;
  isSubmitting?: boolean;
  onClose: () => void;
  onSubmit: (updatedTestimonial: EditTestimonialProps) => void;
}

export interface EditTestimonialProps {
  full_name: string;
  occupation: string;
  comment: string;
}

const EditTestimonialModal: React.FC<EditTestimonialModalProps> = ({
  isOpen,
  testimonial,
  isSubmitting = false,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<EditTestimonialProps>({
    full_name: "",
    occupation: "",
    comment: "",
  });

  useEffect(() => {
    if (testimonial) {
      setFormData({
        full_name: testimonial.full_name,
        occupation: testimonial.occupation,
        comment: testimonial.comment,
      });
    }
  }, [testimonial]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTestimonial: EditTestimonialProps = {
      full_name: formData.full_name,
      occupation: formData.occupation,
      comment: formData.comment,
    };
    onSubmit(updatedTestimonial);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg animate-in fade-in zoom-in">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Edit Testimonial
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 h-[50vh] overflow-y-auto styled-scrollbar pr-5 pb-5"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Occupation</label>
            <input
              type="text"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Comment</label>
            <textarea
              name="comment"
              value={decodeURIComponent(formData.comment)}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring focus:ring-indigo-100"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 rounded-lg bg-(--primary-color) text-white hover:bg-[#550342] transition cursor-pointer disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTestimonialModal;
