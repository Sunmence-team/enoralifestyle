// src/pages/Overview.tsx
import React, { useState, useEffect, useCallback } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DashboardTable from "./Components/DashboardTable";
import { formatterUtility } from "../../utilities/formatterutility";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface Service {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  type: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  data: {
    data: Service[];
    total: number;
    per_page: number;
    current_page: number;
  };
  total: number;
  per_page: number;
  current_page: number;
}

export default function Overview() {
  const navigate = useNavigate();

  // Form States
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [total, setTotal] = useState(0);

  // Edit & Delete
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingService, setDeletingService] = useState<Service | null>(null);

  const fetchServices = useCallback(
    async (page: number) => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get<ApiResponse>(
          `${API_URL}/services?page=${page}&per_page=${perPage}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const { data, total, per_page, current_page } =
          response.data.data || {};
        setServices(Array.isArray(data) ? data : []);
        setTotal(total || 0);
        setPerPage(per_page || 10);
        setCurrentPage(current_page || 1);
      } catch (err) {
        const error = err as AxiosError<{
          message: string;
          errors: Record<string, string[]>;
        }>;
        console.error("Fetch error:", error.response?.data);
        toast.error("Failed to load services");
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate, perPage]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }
    fetchServices(currentPage);
  }, [navigate, currentPage, fetchServices]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // ──────────────────────────────────────────────────────────────
  // CREATE OR UPDATE SERVICE
  // ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !isEditing) {
      toast.error("Please upload an image");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("type", "service");
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");

      if (isEditing && editingId) {
        // PUT /services/{id}
        await axios.put(`${API_URL}/services/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Service updated successfully!");
      } else {
        // POST /services
        await axios.post(`${API_URL}/services`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Service created!");
      }

      resetForm();
      fetchServices(currentPage);
    } catch (err) {
      const error = err as AxiosError<{
        message: string;
        errors: Record<string, string[]>;
      }>;
      console.error("Operation failed:", error.response?.data);
      const errors = error.response?.data?.errors;
      if (errors)
        Object.values(errors)
          .flat()
          .forEach((msg: string) => toast.error(msg));
      else toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
    const input = document.getElementById("image-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const startEdit = (service: Service) => {
    setIsEditing(true);
    setEditingId(service.id);
    setName(service.name);
    setPrice(service.price.replace(/[^0-9.-]+/g, ""));
    setDescription(service.description || "");
    setImage(null);

    const imageUrl = service.image
      ? `${IMAGE_URL}/${service.image.replace(/^public\//, "")}`
      : null;
    setImagePreview(imageUrl);

    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success(`Now editing: ${service.name}`, { duration: 2000 });
  };

  const openDeleteModal = (service: Service) => {
    setDeletingService(service);
    setDeleteModal(true);
  };

  // ──────────────────────────────────────────────────────────────
  // DELETE SERVICE (Laravel method spoofing)
  // ──────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deletingService) return;
    try {
      const token = localStorage.getItem("token");
      // POST /services/{id} with _method=DELETE
      await axios.post(
        `${API_URL}/services/${deletingService.id}`,
        { _method: "DELETE" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Deleted successfully");
      setDeleteModal(false);
      setDeletingService(null);
      fetchServices(currentPage);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-3">
        <h2 className="font-bold text-2xl">
          {isEditing ? "Edit Service" : "Add Service"}
        </h2>
        <div className="flex gap-3">
          <div className="p-3 rounded-full bg-[var(--pink-color)]">
            <IoIosNotifications
              size={25}
              className="text-(--primary-color)"
            />
          </div>
          <div className="p-3 rounded-full bg-[var(--pink-color)]">
            <FaRegUserCircle
              size={25}
              className="text-(--primary-color)"
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-md mb-8">
        <h2 className="text-lg font-bold mb-4">
          {isEditing ? "Update Service" : "Add Service"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-2 flex-col font-[Raleway]!">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Service Name"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-(--primary-color)"
              />
            </div>
            <div className="flex gap-2 flex-col font-[Raleway]!">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                placeholder="Price (e.g. 25000)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                id="price"
                className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-(--primary-color)"
              />
            </div>
          </div>

          <div className="flex gap-2 flex-col font-[Raleway]!">
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Service description..."
              id="description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md resize-none focus:ring-2 focus:ring-(--primary-color)"
            />
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              className="hidden"
            />
            <div className="flex gap-2 flex-col font-[Raleway]!">
              <label htmlFor="image">Image</label>
            <label
              htmlFor="image-upload"
              className="block border-2 border-dashed border-(--primary-color) rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto max-h-48 rounded"
                />
              ) : (
                <div>
                  <BiImageAlt className="mx-auto text-5xl text-(--primary-color) mb-2" />
                  <p className="text-sm">Click to upload image</p>
                </div>
              )}
            </label>

            </div>
            {isEditing && imagePreview && !image && (
              <p className="text-xs text-green-600 font-medium mt-2 text-center">
                Current image loaded. Upload new one to replace.
              </p>
            )}
          </div>

          <div className="flex gap-3">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-md hover:bg-red-50 font-medium"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-(--primary-color) text-white font-bold rounded-md hover:opacity-90 disabled:opacity-60 transition shadow-lg"
            >
              {submitting
                ? "Saving..."
                : isEditing
                ? "Update Service"
                : "Add Service"}
            </button>
          </div>
        </form>
      </div>

      {/* Reusable Table */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-(--primary-color)">
          <h2 className="text-2xl font-bold text-white">All Services</h2>
        </div>

        <DashboardTable
          data={services.filter((s) => s.type === "service")} // Only real services
          loading={loading}
          onEdit={startEdit}
          onDelete={openDeleteModal}
          columns={[
            { key: "image", header: "IMAGE" },
            { key: "name", header: "NAME" },
            {
              key: "price",
              header: "PRICE",
              render: (service: Service) => (
                <span className="font-bold text-pink-600 text-xl">
                  {formatterUtility(Number(service.price))}
                </span>
              ),
            },
            {
              key: "description",
              header: "DESCRIPTION",
              render: (service: Service) => (
                <div className="md:max-w-md max-w-lg text-gray-600 font-[Raleway]! line-clamp-3">
                  {service.description || (
                    <span className="text-gray-400 italic font-[Raleway]!">No description</span>
                  )}
                </div>
              ),
            },
            { key: "actions", header: "ACTIONS" },
          ]}
          total={total}
          currentPage={currentPage}
          perPage={perPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Delete Modal */}
      {deleteModal && deletingService && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">
                Delete Service?
              </h3>
              <button
                onClick={() => setDeleteModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              Permanently delete{" "}
              <span className="font-bold text-pink-600">
                "{deletingService.name}"
              </span>
              ? This action{" "}
              <span className="font-bold text-red-600">cannot</span> be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-10 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
