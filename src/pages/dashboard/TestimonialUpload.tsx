import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";
import type { testimonialProps } from "../../utilities/sharedInterFaces";
import { toast } from "sonner";
import { FaAngleLeft, FaAngleRight, FaPencil } from "react-icons/fa6";
import { Eye, Trash2 } from "lucide-react";
import ConfirmModal from "../../modals/ConfirmDialog";
import ViewTestimonialModal from "../../modals/ViewTestimonialModal";
import EditTestimonialModal, {
  type EditTestimonialProps,
} from "../../modals/EditTestimonialModal";
import { useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";

export default function UploadTestimonial() {
  const navigate = useNavigate();

  const [prevImage, setPrevImage] = React.useState<string | null>(null);
  const [creatingTestimonial, setCreatingTestimonial] = useState(false);
  const [loadingTestimonials, setLoadingTestimonials] = useState(false);
  const [deletingTestimonials, setDeletingTestimonials] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [testimonials, setTestimonials] = useState<testimonialProps[]>([]);
  const [selectedTestimonial, setSelectedTestimonial] =
    useState<testimonialProps | null>(null);
  const [singleTestimonial, setSingleTestimonial] =
    useState<testimonialProps | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(false);
  const [currentPageFromApi, setCurrentPageFromApi] = useState(NaN);
  const [totalApiPages, setTotalApiPages] = useState(NaN);
  const apiItemsPerPage = 10;
  const [totalPagesInArr, setTotalPagesInArr] = useState<number[]>([]);

  const [testimonialDetails, setTestimonialDetails] =
    useState<testimonialProps>({
      id: NaN,
      full_name: "",
      occupation: "",
      comment: "",
      image: "",
    });
  const [error, setError] = useState<{ from: string; errorMessage: string }>({
    from: "",
    errorMessage: "",
  });

  const token = localStorage.getItem("token");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTestimonialDetails((prev) => ({ ...prev, image: file }));
      setPrevImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setTestimonialDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateTestimonial = async () => {
    if (!testimonialDetails.full_name) {
      setError({
        from: "full_name",
        errorMessage: "Full name field is required",
      });
      return;
    }
    if (!testimonialDetails.image) {
      setError({
        from: "image",
        errorMessage: "Image field is required",
      });
      return;
    }
    if (!testimonialDetails.comment) {
      setError({
        from: "comment",
        errorMessage: "Comment field is required",
      });
      return;
    }
    if (!testimonialDetails.occupation) {
      setError({
        from: "occupation",
        errorMessage: "Occupation field is required",
      });
      return;
    }

    setCreatingTestimonial(true);

    try {
      const formdata = new FormData();
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");
      formdata.append("full_name", testimonialDetails.full_name);
      formdata.append("image", testimonialDetails.image);
      formdata.append(
        "comment",
        encodeURIComponent(testimonialDetails.comment)
      );
      formdata.append("occupation", testimonialDetails.occupation);
      const res = await fetch(`${baseUrl}/testimonials`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formdata,
      });
      const data: any = await res.json();
      if (res.ok) {
        toast.success("Testimonial created successfully");
        setTestimonialDetails({
          id: NaN,
          full_name: "",
          occupation: "",
          comment: "",
          image: "",
        });
        fetchTestimonials();
        setPrevImage("");
      } else {
        toast.error(`Failed to create testimonial. ${data.message}.`);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while uploading testimonial"
        );
      } else {
        toast.error(error?.message || "Error uploading testimonial");
      }
    } finally {
      setCreatingTestimonial(false);
    }
  };

  async function fetchTestimonials() {
    setLoadingTestimonials(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${baseUrl}/testimonials?page=${currentPageFromApi}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: any = await res.json();
      if (res.ok) {
        toast.success("Testimonials fetched successfully");
        setTestimonials(data.data.data);
        setCurrentPageFromApi(data.data.current_page);
        setTotalApiPages(data.data.last_page);
        setTotalPagesInArr(
          Array.from({ length: data.data.last_page }, (_, i) => i + 1)
        );
      } else {
        toast.error(`Failed to load testimonials. ${data.message}.`);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while loading testimonials"
        );
      } else {
        toast.error(error?.message || "Error loading testimonials");
      }
    } finally {
      setLoadingTestimonials(false);
    }
  }

  const handleDeleteTestimonial = async () => {
    setDeletingTestimonials(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${baseUrl}/testimonials/${selectedTestimonial?.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: any = await res.json();
      if (res.ok) {
        toast.success("Testimonial deleted successfully");
        setShowDeleteModal(false);
        fetchTestimonials();
      } else {
        toast.error(`Failed to delete testimonial. ${data.message}.`);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while deleting testimonial"
        );
      } else {
        toast.error(error?.message || "Error deleting testimonial");
      }
    } finally {
      setDeletingTestimonials(false);
    }
  };

  const fetchSingleTestimonial = async () => {
    setLoadingView(true);
    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${baseUrl}/testimonials/${selectedTestimonial?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data: any = await res.json();
      if (res.ok) {
        setSingleTestimonial(data.data);
      } else {
        toast.error(`Failed to load contact. ${data.message}.`);
      }
    } catch (error: any) {
      setIsViewOpen(false)
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while loading single testimonial"
        );
      } else {
        toast.error(error?.message || "Error loading single testimonial");
      }
    } finally {
      setLoadingView(false);
    }
  };

  const handleViewTestimonial = () => {
    setIsViewOpen(true);
    fetchSingleTestimonial();
  };

  const handleEditTestimonial = async (
    updatedTestimonial: EditTestimonialProps
  ) => {
    setEditingTestimonial(true);

    try {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${baseUrl}/testimonials/${selectedTestimonial?.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTestimonial),
        }
      );
      const data: any = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success("Testimonial updated successfully");
        fetchTestimonials();
        setIsEditOpen(false);
      } else {
        toast.error(`Failed to edit testimonial. ${data.message}.`);
      }
    } catch (error: any) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error(
          "An uexpected error occured while editing testimonial"
        );
      } else {
        toast.error(error?.message || "Error editing testimonial");
      }
    } finally {
      setEditingTestimonial(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }
    fetchTestimonials();
  }, [token, navigate, currentPageFromApi]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full mb-3">
          <h2 className="font-bold text-2xl">Uplaod Testimonial</h2>
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

        <div className="bg-white rounded-md p-6">
          <div>
            <h2 className="font-bold mb-4 text-2xl">Upload Testimonial</h2>

            <div className="mb-5 ">
              <label className="block text-sm text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={testimonialDetails.full_name}
                name="full_name"
                onChange={handleChange}
                placeholder="Provide your full name"
                className="w-full border border-(--primary-color) rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
              />
              {error &&
                !testimonialDetails.full_name &&
                error.from === "full_name" ? (
                <span className="text-base mt-6 font-semibold text-red-700">
                  {error.errorMessage}
                </span>
              ) : null}
            </div>
          </div>

          <div className="w-full mb-5 ">
            <label className="mb-4">Image</label>
            <div className="border border-dashed border-[var(--primary-color)] rounded-lg p-6 text-center hover:border-[var(--primary-color)] bg-[var(--light-primary)] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                {prevImage ? (
                  <img
                    src={prevImage}
                    alt="Preview"
                    className="max-h-40 rounded"
                  />
                ) : (
                  <>
                    <div className="w-10 h-10 flex items-center justify-center">
                      <BiImageAlt className="w-10 h-10 text-[var(--primary-color)]" />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="text-sm rounded-full px-2 py-0.5 border border-[var(--primary-color)] ">
                        Choose File
                      </div>
                      <div className="text-xs">No file chosen</div>
                    </div>
                  </>
                )}
              </label>
              {error && !prevImage && error.from === "cover_image" ? (
                <span className="text-base mt-6 font-semibold text-red-700">
                  {error.errorMessage}
                </span>
              ) : null}
            </div>
          </div>

          <label htmlFor="description">Comment</label>
          <div className="w-full h-30 mt-2">
            <textarea
              value={testimonialDetails.comment}
              onChange={handleChange}
              placeholder="A brief summary of the testimonial"
              rows={3}
              name="comment"
              className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
            />
            {error &&
              !testimonialDetails.comment &&
              error.from === "comment" ? (
              <span className="text-base mt-6 font-semibold text-red-700">
                {error.errorMessage}
              </span>
            ) : null}
          </div>

          <label htmlFor="description">Occupation</label>
          <div className="w-full h-30 mt-2">
            <input
              value={testimonialDetails.occupation}
              name="occupation"
              onChange={handleChange}
              placeholder="Input your occupation here..."
              className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
            />
            {error &&
              !testimonialDetails.occupation &&
              error.from === "occupation" ? (
              <span className="text-base mt-6 font-semibold text-red-700">
                {error.errorMessage}
              </span>
            ) : null}
          </div>
          <button
            onClick={handleCreateTestimonial}
            disabled={creatingTestimonial}
            className="w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg cursor-pointer transition"
          >
            {creatingTestimonial
              ? "Uploading Testimonial..."
              : "Upload Testimonial"}
          </button>
        </div>
        {/*  */}

        <div className="bg-white rounded-xl shadow border border-black/10 overflow-hidden p-4 flex flex-col gap-4">
          <h2 className="font-bold text-2xl">Manage Testimonials</h2>
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr className="text-gray-600 border-b">
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  ID
                </th>
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  Full Name
                </th>
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  Occupation
                </th>
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  Comment
                </th>
                <th className="py-6 px-6 uppercase tracking-wider text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {loadingTestimonials ? (
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
              ) : testimonials.length === 0 ? (
                <tr className="border-b hover:bg-gray-50 transition">
                  <td className="p-8 text-center" colSpan={4}>
                    {" "}
                    No Testimonial found.
                  </td>
                </tr>
              ) : (
                testimonials.map((t, index) => (
                  <tr
                    key={index}
                    className={`border-b hover:bg-gray-50 transition-colors duration-200 ${index % 2 === 0 ? "bg-white" : "bg-[#901E76]/20"
                      }`}
                    onMouseOver={() => setSelectedTestimonial(t)}
                  >
                    <td className="py-4 px-6 align-middle">{index + 1}</td>
                    <td className="py-4 px-6 align-middle">{t.full_name}</td>
                    <td className="py-4 px-6 align-middle">{t.occupation}</td>
                    <td className="py-7 px-6 align-middle line-clamp-1">
                      {decodeURIComponent(t.comment.slice(0, 170))}...
                    </td>
                    <td className="py-4 px-6 align-middle">
                      <div className="flex gap-3 justify-center text-[var(--primary-color)]">
                        <button
                          className="cursor-pointer hover:bg-gray-300 p-2 rounded-sm hover:text-(--primary-color)"
                          onClick={handleViewTestimonial}
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="cursor-pointer hover:bg-gray-300 p-2 rounded-sm hover:text-(--primary-color)"
                          onClick={() => setIsEditOpen(true)}
                        >
                          <FaPencil size={18} />
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
            {testimonials.length === apiItemsPerPage ? (
              <tfoot>
                <tr className={"bg-white/61 h-[77px] border-t border-black/10"}>
                  {totalPagesInArr.length !== 0 ? (
                    <td className="text-center p-4" colSpan={8}>
                      <div className="flex gap-3 justify-center items-center">
                        <button
                          className="p-2 text-gray-600 hover:text-black cursor-pointer"
                          disabled={
                            currentPageFromApi === totalApiPages ? true : false
                          }
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
                                ? "bg-[var(--primary-color)]"
                                : "bg-gray-300"
                              } cursor-pointer text-white rounded-lg`}
                          >
                            {t}
                          </button>
                        ))}
                        <span className="text-gray-500">...</span>
                        <button
                          className="p-2 text-gray-600 hover:text-black cursor-pointer"
                          disabled={currentPageFromApi === 1 ? true : false}
                          onClick={() =>
                            setCurrentPageFromApi(currentPageFromApi + 1)
                          }
                        >
                          <FaAngleRight />
                        </button>
                      </div>
                    </td>
                  ) : null}
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
      </div>
      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Testimonial?"
        message="Are you sure you want to delete this testimonial? This action is permanent."
        confirmText={`${deletingTestimonials ? "Deleting..." : "Yes, Delete"}`}
        cancelText="Cancel"
        onConfirm={handleDeleteTestimonial}
        onCancel={() => setShowDeleteModal(false)}
        isLoading={deletingTestimonials}
      />
      <ViewTestimonialModal
        isOpen={isViewOpen}
        testimonial={singleTestimonial}
        isLoading={loadingView}
        onClose={() => setIsViewOpen(false)}
      />
      <EditTestimonialModal
        isOpen={isEditOpen}
        testimonial={selectedTestimonial}
        isSubmitting={editingTestimonial}
        onClose={() => setIsEditOpen(false)}
        onSubmit={(updatedTestimonial) => {
          handleEditTestimonial(updatedTestimonial);
        }}
      />
    </>
  );
}
