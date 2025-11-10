import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assests";
import { GoArrowLeft } from "react-icons/go";
import BlogCard from "../components/cards/Blogcard";

// --- Blog data ---
const blogs = [
  {
    id: 1,
    title: "Anti-Aging Facials: Do They Really Make You Look Younger?",
    heading:
      "Discover how anti-aging facials work, what makes them effective, and whether they truly help your skin look younger and more radiant over time.",
    image: assets.blog1,
    description:
      "Learn the science behind anti-aging facials and if they truly deliver on their promise.",
    content: `Aging is a natural and beautiful process, but it’s okay to want your skin to stay youthful, firm, and glowing... lasting radiance.`,
  },
  {
    id: 2,
    title: "Why Your Skin Isn't Glowing, 5 Mistakes to Avoid",
    heading: "Learn how to fix dull skin and regain your natural glow.",
    image: assets.blog2,
    description:
      "Avoid these common skincare mistakes and restore your skin’s natural radiance.",
    content: `Many people make small skincare mistakes that steal their glow... lasting radiance.`,
  },
  {
    id: 3,
    title: "Why Self-Care Is Not a Luxury but a Necessity",
    heading: "Self-care isn’t selfish — it’s essential for your wellbeing.",
    image: assets.blog3,
    description:
      "Discover why self-care should be a priority for your mind and body.",
    content: `Taking care of yourself helps you give your best to others... lasting radiance.`,
  },
];

interface Comment {
  id: number;
  name: string;
  text: string;
  timestamp: string;
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id.toString() === id);

  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      text: comment.trim(),
      timestamp: new Date().toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };

    setComments([newComment, ...comments]);
    setName("");
    setComment("");
  };

  if (!blog) {
    return (
      <div className="text-center py-20 text-gray-500">Blog not found 😅</div>
    );
  }

  // Filter other blogs for "More Blog Posts"
  const otherBlogs = blogs.filter((b) => b.id !== blog.id);

  return (
    <div className="min-h-screen bg-white">
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
      <div className="px-5 lg:px-10 mt-6">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full max-h-[450px] object-cover rounded-2xl shadow-md"
        />
      </div>

      {/* Blog Content */}
      <div className="px-5 lg:px-10 py-10">
        {blog.heading && (
          <h2 className="text-xl lg:text-2xl font-semibold mb-4 text-gray-800">
            {blog.heading}
          </h2>
        )}
        <p className="text-gray-700 text-[16px] leading-relaxed whitespace-pre-line">
          {blog.content}
        </p>
      </div>

      {/* Comment Section */}
      <div className="px-5 lg:px-10 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 lg:gap-20 gap-10">
          {/* Comments List */}
          <div className="bg-[#C97BB7] rounded-2xl p-6 shadow-md">
            <p className="text-xl font-semibold text-black mb-4">Comments</p>
            {comments.length === 0 ? (
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
                      <p className="text-gray-700 text-sm leading-snug">
                        {c.text}
                      </p>
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
          <div className="p-6">
            <p className="text-xl font-medium text-gray-800 mb-5">
              Drop your comment
            </p>
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
              >
                Submit Comment
              </button>
            </form>
          </div>
        </div>

        {/* Related Blog Cards */}
        <div className="mt-20">
          <h2 className="text-center text-3xl font-semibold mb-10">
            More <span className="text-[var(--primary-color)]">Blog Posts</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {otherBlogs.map((b, index) => (
              <BlogCard key={b.id} blog={b} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
