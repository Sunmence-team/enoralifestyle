// src/pages/BlogDetails.tsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { assets } from "../assets/assests";
import HeroSection from "../components/herosections/Herosection";

const blogs = [
  {
    id: 1,
    title: "Anti-Aging Facials: Do They Really Make You Look Younger?",
    heading:
      "Discover how anti-aging facials work, what makes them effective, and whether they truly help your skin look younger and more radiant over time.",
    image: assets.blog1,
    content: `Aging is a natural and beautiful process, but it’s okay to want your skin to stay youthful, firm, and glowing... lasting radiance.`,
  },
  {
    id: 2,
    title: "Why Your Skin Isn't Glowing, 5 Mistakes to Avoid",
    heading: "Learn how to fix dull skin and regain your natural glow.",
    image: assets.blog1,
    content: `Many people make small skincare mistakes that steal their glow... lasting radiance.`,
  },
  {
    id: 3,
    title: "Why Self-Care Is Not a Luxury but a Necessity",
    heading: "Self-care isn’t selfish — it’s essential for your wellbeing.",
    image: assets.blog1,
    content: `Taking care of yourself helps you give your best to others... lasting radiance.`,
  },
];

interface Comment {
  id: number;
  name: string;
  text: string;
  created_at: string;
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const blog = blogs.find((b) => b.id.toString() === id);

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
      const res = await axios.get(`${API_URL}blogs/${id}/comments?per_page=20`);
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
      await axios.post(`${API_URL}blogs/${id}/comments`, {
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

  // Filter other blogs for "More Blog Posts"
  const otherBlogs = blogs.filter((b) => b.id !== blog.id);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title={blog.title}
        backgroundImage={assets.dets}
        height="lg:h-[65vh] h-[35vh]"
      />

      {/* Blog Content */}
      <div className="px-5 lg:px-20 py-10">
        {blog.heading && (
          <h1 className="text-2xl lg:text-3xl font-semibold mb-6 text-gray-800">
            {blog.heading}
          </h1>
        )}
        <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>
      </div>

      {/* Comment Section */}
      <div className="px-5 lg:px-15 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 lg:gap-20 gap-10">
          {/* Comments List */}
          <div className="bg-[#C97BB7] rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-black mb-4">
              Comments
            </h3>
            {comments.length === 0 ? (
              <p className="text-white italic">No comments yet. Be the first!</p>
            ) : (
              <div
                className="space-y-5 h-74 md:h-86 overflow-y-auto pr-3"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Hide scrollbar for Chrome, Safari, Edge */}
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
                    className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 relative"
                  >
                    <div className="">
                      <h4 className="font-medium text-gray-900">{c.name}</h4>
                     
                    </div>
                    <div className="flex justify-between items-start mt-2">
                      <p className="text-gray-700 text-sm leading-snug">{c.text}</p>
                     <span className="text-xs text-gray-500">
                        {c.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment Form */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Drop your comment
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition"
                required
                className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition text-base"
              />
              <textarea
                placeholder="Drop your Enquires here"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] transition resize-none"
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
          <div className="mt-8">
              <Link
                to="/blog"
                className=" text-center border-[var(--primary-color)] text-[var(--primary-color)] font-semibold p-3 rounded-lg border border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-colors"
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