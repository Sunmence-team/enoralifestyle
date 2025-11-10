import React, { useState, useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle, FaEdit, FaTrashAlt, FaTimes } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

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

  // Edit Mode
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingService, setDeletingService] = useState<Service | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }
    fetchServices();
  }, [navigate]);

  // GET /services – Real GET
  const fetchServices = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}services`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const servicesArray = response.data?.data?.data || [];
      setServices(Array.isArray(servicesArray) ? servicesArray : []);
    } catch (err: any) {
      console.error("Fetch error:", err.response?.data);
      toast.error("Failed to load services");
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

  // CREATE OR UPDATE
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
        // UPDATE
        console.log("UPDATING SERVICE ID:", editingId);
        console.log("SENDING DATA:", {
          name,
          price,
          description,
          image: image ? image.name : "No change (keeping old image)",
        });

        const response = await axios.put(`${API_URL}services/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("UPDATE SUCCESS:", response.data);
        toast.success("Service updated successfully!");
      } else {
        // CREATE
        await axios.post(`${API_URL}services`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Service created!");
      }

      resetForm();
      fetchServices();
    } catch (err: any) {
      console.error("Operation failed:", err.response?.data);
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
    setImage(null); // Don't pre-fill file input

    // FIXED: Correct image URL with missing "/"
  const imageUrl = service.image
  ? `${IMAGE_URL.replace(/\/$/, "")}/${service.image.replace(/^\/+/, "")}`
  : null;

setImagePreview(imageUrl);


    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success(`Now editing: ${service.name}`, { duration: 2000 });
  };

  const openDeleteModal = (service: Service) => {
    setDeletingService(service);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingService) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}services/${deletingService.id}`,
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
      fetchServices();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-3">
        <h2 className="font-bold text-2xl">
          {isEditing ? "Edit Service" : "Add Service"}
        </h2>
        <div className="flex gap-3">
          <div className="p-3 rounded-full bg-[var(--pink-color)]">
            <IoIosNotifications size={25} className="text-[var(--primary-color)]" />
          </div>
          <div className="p-3 rounded-full bg-[var(--pink-color)]">
            <FaRegUserCircle size={25} className="text-[var(--primary-color)]" />
          </div>
        </div>
      </div>

      {/* FORM – NOW FULLY POPULATED ON EDIT */}
      <div className="bg-white p-6 rounded-md mb-8">
        <h2 className="text-lg font-bold mb-4">
          {isEditing ? "Update Service" : "Add Service"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            <input
              type="number"
              placeholder="Price (e.g. 25000)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="name">Description</label>
            <textarea placeholder='Description' rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className='w-auto md:w-auto px-4 py-3 rounded-md border border-(--primary-color)/40 text-xs focus:ring-1 focus:ring-[var(--primary-color)] ' />
          </div>

          <div className='w-full'>
            <label className="mb-4">Image</label>
            <div className="border-2 border-dashed border-(--primary-color)/40 rounded-lg p-6 text-center hover:border-(--primary-color) transition-colors">
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
                {image ? (
                  <img src={image} alt="Preview" className="max-h-40 rounded" />
                ) : (
                  <>
                    <div className="w-10 h-10 flex items-center justify-center">
                      <BiImageAlt className="w-10 h-10 text-[var(--primary-color)]" />
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className="text-sm rounded-full px-2 py-0.5 border border-(--primary-color)/20 ">Choose File</div>
                      <div className="text-xs">No file choosen</div>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}