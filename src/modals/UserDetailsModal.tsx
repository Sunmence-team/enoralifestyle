import React, { useState, useEffect } from "react";
import { formatterUtility } from "../utilities/formatterutility";

interface UserDetailsModalProps {
  isOpen: boolean;
  isLoading: boolean;
  initialName?: string;
  initialEmail?: string;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string }) => void;
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({
  isOpen,
  isLoading,
  initialName = "",
  initialEmail = "",
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);

  useEffect(() => {
    setName(initialName);
    setEmail(initialEmail);
  }, [initialName, initialEmail]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ name, email });
        }}
      >
        <h2 className="text-2xl font-semibold! mb-4 text-center">
          Provide your details
        </h2>

        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-[Raleway]! font-medium mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-md font-[Inter]!"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-[Raleway]! font-medium mb-1">Email</label>
            <input
              type="email"
              required
              className="w-full p-2 border rounded-md font-[Inter]!"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            className="px-4 py-2 rounded-md border"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            className="px-4 py-2 cursor-pointer hover:bg-[#550342] bg-(--primary-color) text-white rounded-md"
          >
            {isLoading ? `Initializing Payment...` : `Pay ${formatterUtility(Number(5000))} Now`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserDetailsModal;
