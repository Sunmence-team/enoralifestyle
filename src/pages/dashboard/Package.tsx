// src/pages/Package.tsx
import React, { useState, useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DashboardTable from "./Components/DashboardTable";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface Service {
  id: number;
  name: string;
  price: string;
}

interface Package {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image: string | null;
  services: number[] | string[];
}

export default function Package() {
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Data
  const [packages, setPackages] = useState<Package[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Edit & Delete
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingPackage, setDeletingPackage] = useState<Package | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }
    fetchServices();   // ← GET /services
    fetchPackages();   // ← GET /packages
  }, [navigate]);

  // ──────────────────────────────────────────────────────────────
  // FETCH ALL SERVICES (with per_page=100 to avoid pagination limit)
  // ──────────────────────────────────────────────────────────────
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("token");
      // GET /services?per_page=100  → forces backend to return more items
      const res = await axios.get(`${API_URL}/services?per_page=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allItems = res.data?.data?.data || [];
      // Keep only real services (type === "service")
      const onlyServices = allItems.filter((item: any) => item.type === "service");
      setServices(onlyServices);

      console.log("Fetched services:", onlyServices.length); // Debug
    } catch (err: any) {
      toast.error("Failed to load services");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  // ──────────────────────────────────────────────────────────────
  // FETCH ALL PACKAGES
  // ──────────────────────────────────────────────────────────────
  const fetchPackages = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      // GET /packages?per_page=100
      const res = await axios.get(`${API_URL}/packages?per_page=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = res.data?.data?.data || [];
      setPackages(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error("Failed to load packages");
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleServiceToggle = (id: number) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // ──────────────────────────────────────────────────────────────
  // CREATE OR UPDATE PACKAGE
  // ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !isEditing) return toast.error("Please upload an image");
    if (selectedServices.length === 0) return toast.error("Select at least one service");

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description || "");
    formData.append("price", price);
    formData.append("type", "package");
    selectedServices.forEach((id) => formData.append("services[]", id.toString()));
    if (image) formData.append("image", image);

    try {
      const token = localStorage.getItem("token");

      if (isEditing && editingId) {
        // PUT /packages/{id}
        await axios.put(`${API_URL}/packages/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Package updated!");
      } else {
        // POST /packages
        await axios.post(`${API_URL}/packages`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Package created!");
      }

      resetForm();
      fetchPackages(); // ← refresh list
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors) Object.values(errors).flat().forEach((msg: any) => toast.error(msg));
      else toast.error(err.response?.data?.message || "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setSelectedServices([]);
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
    const input = document.getElementById("package-image") as HTMLInputElement;
    if (input) input.value = "";
  };

  const startEdit = (pkg: Package) => {
    setIsEditing(true);
    setEditingId(pkg.id);
    setName(pkg.name);
    setPrice(pkg.price.replace(/[^0-9.-]+/g, ""));
    setDescription(pkg.description || "");

    const serviceIds = pkg.services.map((s) => (typeof s === "string" ? parseInt(s) : s));
    setSelectedServices(serviceIds);

    setImage(null);
    setImagePreview(pkg.image ? `${IMAGE_URL}${pkg.image.replace(/^public\//, "")}` : null);

    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success(`Editing: ${pkg.name}`);
  };

  const openDeleteModal = (pkg: Package) => {
    setDeletingPackage(pkg);
    setDeleteModal(true);
  };

  // ──────────────────────────────────────────────────────────────
  // DELETE PACKAGE (Laravel method spoofing)
  // ──────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deletingPackage) return;
    try {
      const token = localStorage.getItem("token");
      // POST /packages/{id} with _method=DELETE
      await axios.post(
        `${API_URL}/packages/${deletingPackage.id}`,
        { _method: "DELETE" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Package deleted");
      setDeleteModal(false);
      setDeletingPackage(null);
      fetchPackages();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-3">
        <h2 className="font-bold text-2xl">
          {isEditing ? "Edit Package" : "Create Package"}
        </h2>
        <div className="flex gap-3">
          <div className="p-3 rounded-full bg-(--pink-color)">
            <IoIosNotifications size={25} className="text-(--primary-color)" />
          </div>
          <div className="p-3 rounded-full bg-(--pink-color)">
            <FaRegUserCircle size={25} className="text-(--primary-color)" />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-md mb-8">
        <h2 className="text-lg font-bold mb-4">
          {isEditing ? "Update Package" : "Create New Package"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Package Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-(--primary-color)"
            />
            <input
              type="number"
              placeholder="Price (e.g. 92000)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-(--primary-color)"
            />
          </div>

          <textarea
            placeholder="Description (optional)"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border rounded-md resize-none focus:ring-2 focus:ring-(--primary-color)"
          />

          {/* Services Multi-Select */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Select Services ({selectedServices.length} selected)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-4 border rounded-md bg-gray-50">
              {services.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">Loading services...</p>
              ) : (
                services.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-2 cursor-pointer p-2 hover:bg-pink-100 rounded transition"
                  >
                    <input
                      type="checkbox"
                      checked={selectedServices.includes(s.id)}
                      onChange={() => handleServiceToggle(s.id)}
                      className="w-4 h-4 text-(--primary-color) rounded focus:ring-(--primary-color)"
                    />
                    <span className="text-sm font-medium">{s.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Image */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              id="package-image"
              className="hidden"
            />
            <label
              htmlFor="package-image"
              className="block border-2 border-dashed border-(--primary-color) rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition"
            >
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto max-h-48 rounded" />
              ) : (
                <div>
                  <BiImageAlt className="mx-auto text-5xl text-(--primary-color) mb-2" />
                  <p className="text-sm">Click to upload image</p>
                </div>
              )}
            </label>
            {isEditing && imagePreview && !image && (
              <p className="text-xs text-green-600 mt-2 text-center">
                Current image loaded. Upload new to replace.
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
              {submitting ? "Saving..." : isEditing ? "Update Package" : "Create Package"}
            </button>
          </div>
        </form>
      </div>

      {/* Table – using reusable DashboardTable */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-(--primary-color)">
          <h2 className="text-2xl font-bold text-white">All Packages</h2>
        </div>

        <DashboardTable
          data={packages}
          loading={loading}
          onEdit={startEdit}
          onDelete={openDeleteModal}
          columns={[
            { key: "image", header: "IMAGE" },
            { key: "name", header: "NAME" },
            {
              key: "price",
              header: "PRICE",
              render: (pkg: any) => (
                <span className="font-bold text-pink-600">
                  ₦{parseFloat(pkg.price).toLocaleString()}
                </span>
              ),
            },
            {
              key: "services",
              header: "SERVICES",
              render: (pkg: any) => (
                <ul className="text-sm space-y-1">
                  {pkg.services?.length > 0 ? (
                    pkg.services.map((sid: any) => {
                      const service = services.find(
                        (s) => s.id === (typeof sid === "string" ? parseInt(sid) : sid)
                      );
                      return <li key={sid}>• {service?.name || `ID: ${sid}`}</li>;
                    })
                  ) : (
                    <span className="text-gray-400 italic">None</span>
                  )}
                </ul>
              ),
            },
            { key: "actions", header: "ACTION" },
          ]}
        />
      </div>

      {/* Delete Modal */}
      {deleteModal && deletingPackage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Delete Package?</h3>
              <button onClick={() => setDeleteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FaTimes className="text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              Permanently delete{" "}
              <span className="font-bold text-pink-600">"{deletingPackage.name}"</span>?
              This action <span className="font-bold text-red-600">cannot</span> be undone.
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