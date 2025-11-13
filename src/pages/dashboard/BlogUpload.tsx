// src/pages/dashboard/BlogUpload.tsx
import React, { useState, useEffect } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle, FaTimes } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import DashboardTable from "./Components/DashboardTable";

const API_URL = import.meta.env.VITE_API_BASE_URL || "";
const IMAGE_URL = (import.meta.env.VITE_IMAGE_BASE_URL || "").replace(/\/?$/, "/");

interface Blog {
  id: number;
  title: string;
  cover_image: string | null;
  short_description: string;
  body: { content: string };
  created_at: string;
  updated_at: string;
}

interface Comment {
  id: number;
  name: string;
  text: string;
  created_at: string;
}

export default function BlogUpload() {
  const navigate = useNavigate();

  // Form States
  const [title, setTitle] = useState("");
  const [article, setArticle] = useState("");
  const [blogPost, setBlogPost] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Table & Pagination
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Edit & Delete
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deletingBlog, setDeletingBlog] = useState<Blog | null>(null);

  // View Modal + Comments
  const [viewModal, setViewModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [editText, setEditText] = useState("");

  // Validation Error
  const [error, setError] = useState<{ from: string; errorMessage: string } | null>(null);

  // LOCK BACKGROUND SCROLL WHEN MODALS ARE OPEN
  useEffect(() => {
    if (viewModal || deleteModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [viewModal, deleteModal]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in");
      navigate("/login");
      return;
    }
    fetchBlogs();
  }, [navigate, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/blogs?page=${page}&per_page=10`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBlogs(res.data.data?.data || []);
      setTotal(res.data.data?.total || 0);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError({ from: "title", errorMessage: "Title is required" });
      return;
    }
    if (!image && !isEditing) {
      toast.error("Please upload a cover image");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("short_description", article);
    formData.append("body[content]", blogPost);
    if (image) formData.append("cover_image", image);

    try {
      const token = localStorage.getItem("token");
      if (isEditing && editingId) {
        formData.append("_method", "PUT");
        await axios.post(`${API_URL}/blogs/${editingId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Blog updated!");
      } else {
        await axios.post(`${API_URL}/blogs`, formData, {
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
      if (errors) {
        Object.values(errors).flat().forEach((msg: any) => toast.error(msg));
      } else {
        toast.error(err.response?.data?.message || "Upload failed");
      }
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
    setError(null);
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
    setError(null);

    const imageUrl = blog.cover_image
      ? `${IMAGE_URL}${blog.cover_image.replace(/^public\//, "")}`
      : null;
    setImagePreview(imageUrl);

    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.success("Editing: " + blog.title);
  };

  const openDeleteModal = (blog: Blog) => {
    setDeletingBlog(blog);
    setDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deletingBlog) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/blogs/${deletingBlog.id}`, {
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

  const openViewModal = async (blog: Blog) => {
    setSelectedBlog(blog);
    setViewModal(true);
    setCommentLoading(true);
    setComments([]);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/blogs/${blog.id}/comments?per_page=20`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data.data || []);
    } catch {
      toast.error("Failed to load comments");
    } finally {
      setCommentLoading(false);
    }
  };

  const deleteComment = async (commentId: number) => {
    if (!confirm("Delete this comment?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Comment deleted");
      setComments(comments.filter((c) => c.id !== commentId));
    } catch {
      toast.error("Delete failed");
    }
  };

  const saveCommentEdit = async () => {
    if (!editingComment || !editText.trim()) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/comments/${editingComment.id}`,
        { text: editText },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Comment updated");
      setComments(
        comments.map((c) =>
          c.id === editingComment.id ? { ...c, text: editText } : c
        )
      );
      setEditingComment(null);
      setEditText("");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="flex justify-between items-center w-full mb-8 px-4 lg:px-0">
        <h2 className="font-bold text-3xl text-gray-800">Upload Blog</h2>
        <div className="flex gap-4">
          <div className="p-3 rounded-full bg-(--pink-color)">
            <IoIosNotifications size={28} className="text-(--primary-color)" />
          </div>
          <div className="p-3 rounded-full bg-(--pink-color)">
            <FaRegUserCircle size={28} className="text-(--primary-color)" />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 mx-4 lg:mx-0">
        <h2 className="font-bold text-xl mb-8">Upload Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-[Raleway]! font-medium text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError(null);
              }}
              required
              placeholder="E.g Anti-Aging Facials: Do They Really Make You Look Younger?"
              className="w-full border bg-(--pending-bg)/15 border-(--primary-color) rounded-md p-4 text-base placeholder:text-(--primary-color)/70 focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)/20]"
            />
            {error && error.from === "title" && (
              <span className="text-base mt-2 font-semibold text-red-700 block">
                {error.errorMessage}
              </span>
            )}
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-[Raleway]! font-medium text-gray-700 mb-3">
              Cover Image
            </label>
            <div className="border border-dashed bg-(--pending-bg)/15 border-(--primary-color) rounded-2xl p-10 text-center hover:border-solid transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mx-auto max-h-24 rounded-md shadow-lg"
                    onError={() => setImagePreview("/placeholder.jpg")}
                  />
                ) : (
                  <div className="space-y-4">
                    <BiImageAlt className="mx-auto w-16 h-16 text-(--primary-color)" />
                    <div className="text-sm">
                      <span className="inline-block px-4 py-2 border bg-(--pending-bg)/15 border-(--primary-color) rounded-full font-medium">
                        Choose File
                      </span>
                      <p className="mt-2 text-gray-500">No file chosen</p>
                    </div>
                  </div>
                )}
              </label>
            </div>
            {isEditing && imagePreview && !image && (
              <p className="text-sm text-green-600 text-center mt-3">
                Current image loaded. Upload new to replace.
              </p>
            )}
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-[Raleway]! font-medium text-gray-700 mb-2">
              Short Description
            </label>
            <textarea
              value={article}
              onChange={(e) => setArticle(e.target.value)}
              required
              rows={3}
              placeholder="A brief summary..."
              className="w-full border bg-(--pending-bg)/15 border-(--primary-color) rounded-md p-4 focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)/20]"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-[Raleway]! font-medium text-gray-700 mb-2">
              Body Text
            </label>
            <textarea
              value={blogPost}
              onChange={(e) => setBlogPost(e.target.value)}
              required
              rows={8}
              placeholder="Write your blog post here..."
              className="w-full border bg-(--pending-bg)/15 border-(--primary-color) rounded-md p-4 focus:outline-none focus:ring-4 focus:ring-[var(--primary-color)/20] styled-scrollbar"
            />
          </div>

          <div className="flex gap-4">
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-8 py-4 border border-red-500 text-red-600 rounded-md font-bold hover:bg-red-50 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-(--primary-color) text-white font-bold py-4 rounded-md hover:opacity-90 disabled:opacity-60 transition shadow-lg"
            >
              {submitting ? "Saving..." : isEditing ? "Update Blog" : "Upload Blog"}
            </button>
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mx-4 lg:mx-0">
        <div className="px-8 py-6 bg-(--primary-color)">
          <h2 className="text-3xl font-bold text-white">All Blogs</h2>
        </div>
        <DashboardTable
          data={blogs}
          loading={loading}
          total={total}
          currentPage={page}
          perPage={10}
          onPageChange={setPage}
          onView={openViewModal}
          onEdit={startEdit}
          onDelete={openDeleteModal}
          columns={[
            {
              key: "cover_image",
              header: "IMAGE",
              render: (b: any) => (
                <img
                  src={
                    b.cover_image
                      ? `${IMAGE_URL}${b.cover_image.replace(/^public\//, "")}`
                      : "/placeholder.jpg"
                  }
                  alt=""
                  className="w-12 h-12 object-cover rounded-md shadow"
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                />
              ),
            },
            { key: "title", header: "TITLE" },
            {
              key: "short_description",
              header: "SUMMARY",
              render: (b: any) => (
                <div className="max-w-md text-sm text-gray-600 font-[Raleway]! line-clamp-2">
                  {b.short_description}
                </div>
              ),
            },
            {
              key: "created_at",
              header: "DATE",
              render: (b: any) =>
                new Date(b.created_at).toLocaleDateString("en-GB"),
            },
            { key: "actions", header: "ACTIONS" },
          ]}
        />
      </div>

      {/* VIEW MODAL */}
      {viewModal && selectedBlog && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overscroll-contain">
          <div className="bg-white rounded-3xl shadow-2xl w-full md:w-[70%] max-h-[95vh] overflow-y-auto overscroll-contain styled-scrollbar">
            <div className="sticky top-0 bg-white border-b-2 border-gray-200 p-6 flex justify-between items-center z-10">
              <h2 className="text-3xl font-bold text-gray-800 pr-10">
                {selectedBlog.title}
              </h2>
              <button
                onClick={() => {
                  setViewModal(false);
                  setEditingComment(null);
                  setEditText("");
                }}
                className="p-3 hover:bg-gray-100 rounded-full transition"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-8">
              {selectedBlog.cover_image && (
                <img
                  src={`${IMAGE_URL}${selectedBlog.cover_image.replace(
                    /^public\//,
                    ""
                  )}`}
                  alt={selectedBlog.title}
                  className="w-full h-96 object-cover rounded-2xl mb-8 shadow-xl"
                  onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                />
              )}
              <p className="text-xl text-gray-700 font-medium mb-8 leading-relaxed">
                {selectedBlog.short_description}
              </p>
              <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-line mb-12">
                {selectedBlog.body.content}
              </div>

              <div className="border-t-2 pt-10">
                <h3 className="text-2xl font-bold mb-8">
                  Comments ({comments.length})
                </h3>
                {commentLoading ? (
                  <p className="text-center py-10">Loading comments...</p>
                ) : comments.length === 0 ? (
                  <p className="text-center py-10 text-gray-500 italic">
                    No comments yet.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {comments.map((c) => (
                      <div
                        key={c.id}
                        className="bg-gray-50 rounded-2xl p-6 border border-gray-200"
                      >
                        {editingComment?.id === c.id ? (
                          <div className="space-y-4">
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full p-4 border bg-(--pending-bg)/15 border-(--primary-color) rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)/30]"
                              rows={4}
                            />
                            <div className="flex gap-3">
                              <button
                                onClick={saveCommentEdit}
                                className="px-6 py-3 bg-green-600 text-white rounded-md font-bold hover:bg-green-700 transition"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => {
                                  setEditingComment(null);
                                  setEditText("");
                                }}
                                className="px-6 py-3 bg-gray-500 text-white rounded-md font-bold hover:bg-gray-600 transition"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="text-xl font-bold text-gray-900">
                                {c.name}
                              </h4>
                              <div className="flex gap-4 text-sm">
                                <button
                                  onClick={() => {
                                    setEditingComment(c);
                                    setEditText(c.text);
                                  }}
                                  className="text-blue-600 hover:underline font-medium"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteComment(c.id)}
                                  className="text-red-600 hover:underline font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-3">
                              {c.text}
                            </p>
                            <span className="text-sm text-gray-500">
                              {new Date(c.created_at).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                              })}
                            </span>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {deleteModal && deletingBlog && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overscroll-contain">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10">
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Delete Blog?
            </h3>
            <p className="text-lg text-gray-600 mb-10">
              Permanently delete{" "}
              <span className="font-bold text-pink-600">
                "{deletingBlog.title}"
              </span>
              ? This action{" "}
              <span className="font-bold text-red-600">cannot</span> be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-8 py-4 border border-gray-300 rounded-md font-bold hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-10 py-4 bg-red-600 text-white font-bold rounded-md hover:bg-red-700"
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