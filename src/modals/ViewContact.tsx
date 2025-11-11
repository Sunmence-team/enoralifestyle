import React from "react";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
}

interface ViewContactModalProps {
  isOpen: boolean;
  contact: Contact | null;
  isLoading?: boolean;
  onClose: () => void;
}

const ViewContactModal: React.FC<ViewContactModalProps> = ({
  isOpen,
  contact,
  isLoading = false,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg animate-in fade-in zoom-in">
        <h2 className="text-lg font-semibold mb-4 text-center">View Contact</h2>

        {isLoading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : (
          <div className="space-y-2 h-[50vh] overflow-y-scroll pr-5 styled-scrollbar">
            <p>
              <span className="font-semibold">Name:</span> {contact?.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {contact?.email}
            </p>
            <p>
              <span className="font-semibold">Message:</span>
            </p>
            <p className="text-gray-700 whitespace-pre-wrap">
              {contact?.message}
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

export default ViewContactModal;
