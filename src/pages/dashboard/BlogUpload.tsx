// src/pages/UploadBlog.tsx
import React, { useState, useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DashboardTable from "./Components/DashboardTable";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

interface Blog {
  id: number;
  title: string;
  cover_image: string | null;
  short_description: string;
  body: {
    content: string;
  };
  created_at: string;
  updated_at: string;
}

export default function UploadBlog() {
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState(""); // short_description
  const [blogPost, setBlogPost] = useState(""); // body.content
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Data & UI
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Edit & Delete
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }
    fetchBlogs(); // GET /blogs?per_page=100
  }, [navigate]);

  // ──────────────────────────────────────────────────────────────
  // FETCH ALL BLOGS
  // ──────────────────────────────────────────────────────────────
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}blogs?per_page=100`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = res.data?.data?.data || [];
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err: any) {
      toast.error("Failed to load blogs");
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

  // ──────────────────────────────────────────────────────────────
  // CREATE OR UPDATE BLOG
  // ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image && !isEditing) return toast.error("Please upload a cover image");

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_description", article);
    formData.append("body[content]", blogPost);
    if (image) formData.append("cover_image", image);

    try {
      const token = localStorage.getItem("token");

      if (isEditing && editingId) {
        // POST /blogs/{id} (Laravel spoofing for PUT)
        formData.append("_method", "PUT");
        await axios.post(`${API_URL}blogs/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Blog updated!");
      } else {
        // POST /blogs
        await axios.post(`${API_URL}blogs`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Blog uploaded!");
      }

      resetForm();
      fetchBlogs();
    } catch (err: any) {
      const errors = err.response?.data?.errors;
      if (errors) Object.values(errors).flat().forEach((msg: any) => toast.error(msg));
      else toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setTitle("");
    setArticle("");
    setBlogPost("");
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
    const input = document.getElementById("image-upload") as HTMLInputElement;
    if (input) input.value = "";
  };

  const startEdit = (blog: Blog) => {
    setIsEditing(true);
    setEditingId(blog.id);
    setTitle(blog.title);
    setArticle(blog.short_description);
    setBlogPost(blog.body.content);
    setImage(null);
    setImagePreview(
      blog.cover_image
        ? `${IMAGE_URL}${blog.cover_image.replace(/^public\//, "")}`
        : null
    );
    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success(`Editing: ${blog.title}`);
  };

  const openDeleteModal = (blog: Blog) => {
    setDeletingBlog(blog);
    setDeleteModal(true);
  };

  // ──────────────────────────────────────────────────────────────
  // DELETE BLOG
  // ──────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!deletingBlog) return;
    try {
      const token = localStorage.getItem("token");
      // DELETE /blogs/{id}
      await axios.delete(`${API_URL}blogs/${deletingBlog.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Blog deleted");
      setDeleteModal(false);
      setDeletingBlog(null);
      fetchBlogs();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-3">
        <h2 className="font-bold text-2xl">Upload Blog</h2>
        <div className="flex gap-3">
          <div className="p-3 rounded-full bg-[var(--pink-color)]">
            <IoIosNotifications size={25} className="text-[var(--primary-color)]" />
          </div>
          <div className="p-3 rounded-full bg-[var(--pink-color)]">
            <FaRegUserCircle size={25} className="text-[var(--primary-color)]" />
          </div>
        </div>
      </div>

      {/* Form – Your EXACT Design */}
      <div className="bg-white rounded-md p-6 mb-8">
        <h2 className="font-bold mb-4 text-2xl">Upload Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-2">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g Anti-Aging Facials: Do They Really Make You Look Younger?"
              required
              className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          {/* Image Upload */}
          <div className="w-full mb-5">
            <label className="mb-4 block">Image</label>
            <div className="border border-dashed border-[var(--primary-color)] rounded-lg p-6 text-center hover:border-[var(--primary-color)] bg-[var(--light-primary)] transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-2">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="max-h-40 rounded" />
                ) : (
                  <>
                    <div className="w-10 h-10 flex items-center justify-center">
                      <BiImageAlt className="w-10 h-10 text-[var(--primary-color)]" />
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="text-sm rounded-full px-2 py-0.5 border border-[var(--primary-color)]">
                        Choose File
                      </div>
                      <div className="text-xs">No file chosen</div>
                    </div>
                  </>
                )}
              </label>
            </div>
            {isEditing && imagePreview && !image && (
              <p className="text-xs text-green-600 mt-2 text-center">
                Current image loaded. Upload new to replace.
              </p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="description" className="block mb-2">Short Description</label>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              placeholder="A brief summary of the article"
              rows={3}
              required
              className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
            />
          </div>

          {/* Body Text */}
          <div>
            <label htmlFor="description" className="block mb-2">Body Text</label>
            <textarea
              value={blogPost}
              onChange={(e) => setBlogPost(e.target.value)}
              placeholder="Write your blog post here..."
              rows={6}
              required
              className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
            />
          </div>

          <div className="flex gap-3">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-3 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg cursor-pointer transition hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Uploading..." : isEditing ? "Update Blog" : "Upload Blog"}
            </button>
          </div>
        </form>
      </div>

      {/* Reusable DashboardTable */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="px-8 py-6 bg-[var(--primary-color)]">
          <h2 className="text-2xl font-bold text-white">All Blogs</h2>
        </div>

        <DashboardTable
          data={blogs}
          loading={loading}
          onEdit={startEdit}
          onDelete={openDeleteModal}
          columns={[
            {
              key: "cover_image",
              header: "IMAGE",
              render: (blog: any) => (
                <img
                  src={
                    blog.cover_image
                      ? `${IMAGE_URL}${blog.cover_image.replace(/^public\//, "")}`
                      : "/placeholder.jpg"
                  }
                  alt={blog.title}
                  className="w-8 h-8 object-cover rounded-lg shadow"
                  onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder.jpg")}
                />
              ),
            },
            { key: "title", header: "TITLE" },
            {
              key: "short_description",
              header: "SUMMARY",
              render: (blog: any) => (
                <div className="max-w-xs text-sm text-gray-600">
                  {blog.short_description?.slice(0, 80)}...
                </div>
              ),
            },
            {
              key: "created_at",
              header: "DATE",
              render: (blog: any) =>
                new Date(blog.created_at).toLocaleDateString("en-GB"),
            },
            { key: "actions", header: "ACTIONS" },
          ]}
        />
      </div>

      {/* Delete Modal */}
      {deleteModal && deletingBlog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Delete Blog?</h3>
              <button onClick={() => setDeleteModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <FaTimes className="text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-8 text-lg">
              Permanently delete <span className="font-bold text-pink-600">"{deletingBlog.title}"</span>?
              This action <span className="font-bold text-red-600">cannot</span> be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-8 py-3 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-10 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700"
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