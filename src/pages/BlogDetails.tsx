// src/pages/BlogDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { GoArrowLeft } from "react-icons/go";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface Blog {
  id: number;
  title: string;
  content: string;
  short_description: string;
  cover_image: string | null;
  created_at: string;
}

interface Comment {
  id: number;
  name: string;
  text: string;
  created_at: string;
}

export default function BlogDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch blog
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${API_URL}/blogs/${id}`);
        setBlog(res.data?.data || res.data);
      } catch (err) {
        setError("Failed to load blog details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // FETCH COMMENTS
  const fetchComments = async () => {
    if (!id) return;
    setLoadingComments(true);
    try {
      const res = await axios.get(`${API_URL}/blogs/${id}/comments?per_page=20`);
      const data = res.data?.data || [];
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load comments");
    } finally {
      setLoadingComments(false);
    }
  };

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      setLoadingComments(true);
      try {
        const res = await axios.get(`${API_URL}/blogs/${id}/comments`);
        const data = res.data?.data || [];
        setComments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load comments");
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [id]);

  // Post new comment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || !id) return;

    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/blogs/${id}/comments`, {
        name: name.trim(),
        text: comment.trim(),
      });
      setComments((prev) => [res.data.data, ...prev]);
      setName("");
      setComment("");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="text-center py-32 bg-white">
        <p className="text-2xl text-red-600 mb-6">{error || "Blog not found"}</p>
        <button
          onClick={() => navigate("/blog")}
          className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90 transition"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      {/* Back Button */}
      <div className="flex items-center gap-3 px-5 lg:px-10 pt-8">
        <button
          onClick={() => navigate("/blog")}
          className="flex items-center gap-1 text-[var(--primary-color)] hover:text-black transition"
        >
          <GoArrowLeft size={30} />
          <span className="font-medium text-lg"></span>
        </button>
      </div>

      {/* Blog Title */}
      <div className="px-5 lg:px-10 mt-6">
        <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 leading-snug">
          {blog.title}
        </h1>
      </div>

      {/* Blog Image */}
      {blog.cover_image && (
        <div className="px-5 lg:px-10 mt-6">
          <img
            src={`${IMAGE_URL}${blog.cover_image.replace(/^public\//, "")}`}
            alt={blog.title}
            className="w-full max-h-[450px] object-cover rounded-2xl shadow-md"
          />
        </div>
      )}

      {/* Blog Content */}
      <div className="px-5 lg:px-10 py-10">
        <p className="text-gray-700 text-[16px] leading-relaxed whitespace-pre-line">
          {blog.content || blog.short_description}
        </p>
      </div>

      {/* Comment Section */}
      <div className="px-5 lg:px-10 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 lg:gap-20 gap-10">
          {/* Comments List */}
          <div className="bg-[#C97BB7] rounded-2xl p-6 shadow-md">
            <p className="text-xl font-semibold text-black mb-4">Comments</p>
            {loadingComments ? (
              <p className="text-white italic">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-white italic">No comments yet. Be the first!</p>
            ) : (
              <div
                className="space-y-4 max-h-[280px] overflow-y-auto pr-2"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                <style>
                  {`
                    div::-webkit-scrollbar {
                      display: none;
                    }
                  `}
                </style>
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
                  >
                    <h4 className="font-medium text-gray-900">{c.name}</h4>
                    <div className="flex justify-between items-start mt-2">
                      <p className="text-gray-700 text-sm leading-snug">{c.text}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(c.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment Form */}
          <div className="p-6">
            <p className="text-xl font-medium text-gray-800 mb-5">Drop your comment</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 transition"
                required
              />
              <textarea
                placeholder="Drop your Enquires here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 transition resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg hover:bg-opacity-90 transition"
                disabled={submitting}
              >
                {submitting ? "Posting..." : "Submit Comment"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
