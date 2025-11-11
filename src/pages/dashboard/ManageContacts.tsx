import React, { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "sonner";
import ConfirmModal from "../../modals/ConfirmDialog";
import ViewContactModal from "../../modals/ViewContact";
interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
}

const ManageContacts: React.FC = () => {
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [deletingContacts, setDeletingContacts] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [singleContact, setSingleContact] = useState<Contact | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const fetchContacts = async () => {
    setLoadingContacts(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseUrl}/contact`, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      const data: any = await res.json();
      if (res.ok) {
        toast.success("Contact fetched successfully");
        setContacts(data.data.data);
      } else {
        toast.error(`Failed to load contact. ${data.message}.`);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error("An uexpected error occured while loading contacts");
      } else {
        toast.error(error?.message || "Error loading contacts");
      }
    } finally {
      setLoadingContacts(false);
    }
  };

  const handleDeleteContact = async () => {
    setDeletingContacts(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      // const token = localStorage.getItem("authToken");
      const res = await fetch(`${baseUrl}/contact/${selectedContact?.id}`, {
        method: "DELETE",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      const data: any = await res.json();
      if (res.ok) {
        toast.success("Contact deleted successfully");
        setShowDeleteModal(false);
        fetchContacts();
      } else {
        toast.error(`Failed to load contact. ${data.message}.`);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while deleting contacts"
        );
      } else {
        toast.error(error?.message || "Error deleting contacts");
      }
    } finally {
      setDeletingContacts(false);
    }
  };

  const fetchSingleContact = async () => {
    setLoadingView(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${baseUrl}/contact/${selectedContact?.id}`, {
        method: "GET",
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      const data: any = await res.json();
      if (res.ok) {
        setSingleContact(data.data);
      } else {
        toast.error(`Failed to load contact. ${data.message}.`);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while loading single contact"
        );
      } else {
        toast.error(error?.message || "Error loading single contact");
      }
    } finally {
      setLoadingView(false);
    }
  };

  const handleViewContact = () => {
    setIsViewOpen(true);
    fetchSingleContact();
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="font-bold text-2xl">Manage Contact</h2>
          <div className="flex gap-3">
            <div className="p-3 rounded-full bg-[var(--pink-color)] ">
              <IoIosNotifications
                size={25}
                className="text-[var(--primary-color)]"
              />
            </div>
            <div className="p-3 rounded-full bg-[var(--pink-color)]">
              <FaRegUserCircle
                size={25}
                className="text-[var(--primary-color)]"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow border border-black/10 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Message</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loadingContacts ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse border-b">
                    <td className="p-5">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </td>
                    <td className="p-5">
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </td>
                    <td className="p-5">
                      <div className="h-5 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="flex gap-3 justify-center">
                        <div className="h-5 w-5 bg-gray-300 rounded"></div>
                        <div className="h-5 w-5 bg-gray-300 rounded"></div>
                        <div className="h-5 w-5 bg-gray-300 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : contacts.length === 0 ? (
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="p-8 text-center" colSpan={4}>
                    {" "}
                    No Contact found.
                  </td>
                </tr>
              ) : (
                contacts.map((c, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                    onMouseOver={() => setSelectedContact(c)}
                  >
                    <td className="p-5 font-medium">{c.name}</td>
                    <td className="p-5 text-sm text-gray-600">{c.email}</td>
                    <td className="p-5 text-sm text-gray-700 line-clamp-2">
                      {c.message.slice(0, 170)}...
                    </td>
                    <td className="p-5">
                      <div className="flex gap-3 justify-center text-gray-700">
                        <button
                          className="cursor-pointer hover:bg-gray-300 p-2 rounded-sm hover:text-(--primary-color)"
                          onClick={handleViewContact}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="cursor-pointer hover:bg-gray-300 p-2 rounded-sm hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Contact?"
        message="Are you sure you want to delete this contact? This action is permanent."
        confirmText={`${deletingContacts ? "Deleting..." : "Yes, Delete"}`}
        cancelText="Cancel"
        onConfirm={handleDeleteContact}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={deletingContacts}
      />
      <ViewContactModal
        isOpen={isViewOpen}
        contact={singleContact}
        isLoading={loadingView}
        onClose={() => setIsViewOpen(false)}
      />
    </>
  );
};

export default ManageContacts;
