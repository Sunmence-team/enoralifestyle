// src/pages/BlogDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_IMAGE_BASE_URL;

interface Blog {
  id: number;
  title: string;
  short_description: string;
  body: { content: string };
  cover_image: string | null;
  created_at: string;
}

interface Comment {
  id: number;
  name: string;
  text: string;
  created_at: string;
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${blog?.title} - Enora Lifestyle And Spa`;
  }, []);

  // FETCH BLOG
  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return setError("Invalid blog ID");

      try {
        const res = await axios.get(`${API_URL}/blogs/${id}`);
        setBlog(res.data?.data || res.data);
      } catch (err) {
        setError("Blog not found.");
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
    if (blog) fetchComments();
  }, [blog]);

  // POST COMMENT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim() || !id) return;

    setSubmitting(true);
    try {
      await axios.post(`${API_URL}/blogs/${id}/comments`, {
        name: name.trim(),
        text: comment.trim(),
      });

      setName("");
      setComment("");
      fetchComments();
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
        <p className="text-2xl text-red-600 mb-6">Blog not found</p>
        <Link to="/blog" className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:opacity-90">
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        title={blog.title}
        backgroundImage={
          blog.cover_image
            ? `${IMAGE_URL}${blog.cover_image.replace(/^public\//, "")}`
            : assets.dets
        }
        height="lg:h-[65vh] h-[35vh]"
      />

      <div className="px-5 lg:px-20 py-12 bg-white">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
          {blog.short_description || blog.title}
        </h1>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.body.content.split("\n").map((p, i) => (
            <p key={i} className="mb-5">{p || <br />}</p>
          ))}
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <div className="px-5 py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          
          {/* Comments List */}
          <div className="bg-[#C97BB7] rounded-3xl p-4 md:p-6 shadow-xl">
            <h3 className="text-2xl font-bold text-black mb-6">Comments ({comments.length})</h3>

            {loadingComments ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></div>
              </div>
            ) : comments.length === 0 ? (
              <p className="text-white italic text-center py-8">No comments yet. Be the first!</p>
            ) : (
              <div
                className="space-y-5 h-74 md:h-86 overflow-y-auto pr-3"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>

                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative"
                  >
                    <h4 className="font-bold text-gray-900 text-lg pr-32">
                      {c.name}
                    </h4>
                    <p className="text-gray-700 leading-relaxed mt-2">
                      {c.text}
                    </p>
                    {/* DATE & TIME — BOTTOM RIGHT */}
                    <span className="absolute bottom-4 right-6 text-xs text-gray-500">
                      {new Date(c.created_at).toLocaleString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment Form */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Drop your comment</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition text-base"
              />
              <textarea
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition resize-none text-base"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-[var(--primary-color)] text-white font-bold py-4 rounded-xl hover:opacity-90 transition shadow-lg disabled:opacity-60"
              >
                {submitting ? "Posting..." : "Submit Comment"}
              </button>
            </form>
          </div>

          {/* Back Button */}
          <div className="lg:col-span-2 text-center mt-10">
            <Link
              to="/blog"
              className="inline-block px-10 py-4 border-2 border-[var(--primary-color)] text-[var(--primary-color)] font-bold rounded-xl hover:bg-[var(--primary-color)] hover:text-white transition text-lg"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;