import React, { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "sonner";
import ConfirmModal from "../../modals/ConfirmDialog";
import ViewContactModal from "../../modals/ViewContact";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
}

const ManageContacts: React.FC = () => {
  const navigate = useNavigate();
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [deletingContacts, setDeletingContacts] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [singleContact, setSingleContact] = useState<Contact | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [currentPageFromApi, setCurrentPageFromApi] = useState(NaN);
  const [totalApiPages, setTotalApiPages] = useState(NaN);
  const [totalPagesInArr, setTotalPagesInArr] = useState<number[]>([]);
  const token = localStorage.getItem("token");
  const apiItemsPerPage = 20;

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
        setCurrentPageFromApi(data.data.current_page);
        setTotalApiPages(data.data.last_page);
        setTotalPagesInArr(
          Array.from({ length: data.data.last_page }, (_, i) => i + 1)
        );
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
        toast.error(`Failed to delete contact. ${data.message}.`);
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

  async function fetchSingleContact() {
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
  }

  const handleViewContact = () => {
    setIsViewOpen(true);
    fetchSingleContact();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }
    fetchContacts();
  }, [token, navigate, currentPageFromApi]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="font-bold text-2xl">Manage Contact</h2>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-full transition hover:scale-105" style={{ backgroundColor: "var(--pink-color)" }}>
                <IoNotifications size={22} style={{ color: "var(--primary-color)" }} />
              </div>
              <div className="p-2.5 rounded-full transition hover:scale-105" style={{ backgroundColor: "var(--pink-color)" }}>
                <FaRegUserCircle size={22} style={{ color: "var(--primary-color)" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow border border-black/10 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr className="text-gray-600 border-b">
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  Email
                </th>
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  Message
                </th>
                <th className="py-6 px-6 uppercase tracking-wider text-sm text-center font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loadingContacts ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse border-b">
                    <td className="py-5 px-6">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="h-5 bg-gray-200 rounded w-full"></div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="flex gap-3 justify-center">
                        <div className="h-5 w-5 bg-gray-300 rounded"></div>
                        <div className="h-5 w-5 bg-gray-300 rounded"></div>
                        <div className="h-5 w-5 bg-gray-300 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : contacts.length === 0 ? (
                <tr className="border-b hover:bg-gray-50 transition-colors duration-200">
                  <td
                    className="py-8 px-6 text-center text-gray-500"
                    colSpan={4}
                  >
                    {"No Contact found."}
                  </td>
                </tr>
              ) : (
                contacts.map((c, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 font-[Raleway]! transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-[#901E76]/20"
                      }`}
                    onMouseOver={() => setSelectedContact(c)}
                  >
                    <td className="py-4 px-6 font-[Raleway]! align-middle">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6 font-[Raleway]! align-middle">
                      {c.name}
                    </td>
                    <td className="py-4 px-6 font-[Raleway]! align-middle">
                      {c.email}
                    </td>
                    <td className="py-4 px-6 font-[Raleway]! align-middle">
                      <p className="line-clamp-1">{c.message}</p>
                    </td>
                    <td className="py-4 px-6 font-[Raleway]! align-middle">
                      <div className="flex gap-3 justify-center text-(--primary-color)">
                        <button
                          className="cursor-pointer hover:bg-gray-200 p-2 rounded-md hover:text-(--primary-color)"
                          onClick={handleViewContact}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(true)}
                          className="cursor-pointer hover:bg-gray-200 p-2 rounded-md hover:text-red-600"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {contacts.length === apiItemsPerPage ? (
              <tfoot>
                <tr className="bg-white/60 h-[77px] border-t border-black/10">
                  {totalPagesInArr.length !== 0 && (
                    <td className="py-4 px-6 text-center" colSpan={8}>
                      <div className="flex gap-3 justify-center items-center">
                        <button
                          className="p-2 text-gray-600 hover:text-black cursor-pointer"
                          disabled={currentPageFromApi === totalApiPages}
                          onClick={() =>
                            setCurrentPageFromApi(currentPageFromApi - 1)
                          }
                        >
                          <FaAngleLeft />
                        </button>
                        {totalPagesInArr.map((t, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentPageFromApi(t)}
                            className={`w-8 h-8 flex items-center justify-center font-bold ${t === currentPageFromApi
                                ? "bg-(--primary-color) text-white"
                                : "bg-gray-300 text-gray-700"
                              } cursor-pointer rounded-lg`}
                          >
                            {t}
                          </button>
                        ))}
                        <span className="text-gray-500">...</span>
                        <button
                          className="p-2 text-gray-600 hover:text-black cursor-pointer"
                          disabled={currentPageFromApi === 1}
                          onClick={() =>
                            setCurrentPageFromApi(currentPageFromApi + 1)
                          }
                        >
                          <FaAngleRight />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              </tfoot>
            ) : null}
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
