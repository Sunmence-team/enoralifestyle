import React, { useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";
import type { blogProps } from "../../utilities/sharedInterFaces";
import { toast } from "sonner";

export default function UploadBlog() {
  const [prevImage, setPrevImage] = React.useState<string | null>(null);
  const [creatingBlog, setCreateBlog] = useState(false);
  const [blogDetails, setBlogDetails] = useState<blogProps>({
    title: "",
    short_description: "",
    body: "",
    cover_image: "",
  });
  const [error, setError] = useState<{ from: string; errorMessage: string }>({
    from: "",
    errorMessage: "",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBlogDetails((prev) => ({ ...prev, cover_image: file }));
      setPrevImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setBlogDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateBlog = async () => {
    if (!blogDetails.title) {
      setError({ from: "title", errorMessage: "Title field is required" });
      return;
    }
    if (!blogDetails.cover_image) {
      setError({
        from: "cover_image",
        errorMessage: "Cover Image field is required",
      });
      return;
    }
    if (!blogDetails.short_description) {
      setError({
        from: "short_description",
        errorMessage: "Short Description field is required",
      });
      return;
    }
    if (!blogDetails.body) {
      setError({ from: "body", errorMessage: "Body field is required" });
      return;
    }

    setCreateBlog(true);

    try {
      const formdata = new FormData();
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const token = localStorage.getItem("authToken");
      formdata.append("title", blogDetails.title);
      formdata.append("short_description", blogDetails.short_description);
      formdata.append("body", encodeURIComponent(blogDetails.body));
      formdata.append("cover_image", blogDetails.cover_image);
      const res = await fetch(`${baseUrl}/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formdata,
      });
      const data: any = await res.json();
      if (res.ok) {
        toast.success("Blog created successfully");
        setBlogDetails({
          title: "",
          short_description: "",
          body: "",
          cover_image: "",
        });
      } else {
        toast.error(`Failed to create blog. ${data.message}.`);
      }
    } catch (error) {
      if (
        error?.message?.includes("Unexpected token '<'") ||
        error?.message === "Failed to fetch"
      ) {
        return toast.error("An uexpected error occured while uploading blog");
      } else {
        toast.error(error?.message || "Error uploading blog");
      }
    } finally {
      setCreateBlog(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center w-full mb-3">
        <h2 className="font-bold text-2xl">Uplaod Blug</h2>
        <div className="flex gap-3">
          <div className="p-3 rounded-full bg-[var(--pink-color)] ">
            <IoIosNotifications
              size={25}
              className="text-[var(--primary-color)]"
            />
          </div>
          <div className="p-3 rounded-full bg-[var(--pink-color)]">
            <FaRegUserCircle
              size={25}
              className="text-[var(--primary-color)]"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md p-6">
        <div>
          <h2 className="font-bold mb-4 text-2xl">Upload Blog</h2>

          <div className="mb-5 ">
            <label className="block text-sm text-gray-700 mb-2">
              Post Title
            </label>
            <input
              type="text"
              value={blogDetails.title}
              name="title"
              onChange={handleChange}
              placeholder="E.g Anti-Aging Facials: Do They Really Make You Look Younger?"
              className="w-full border border-(--primary-color) rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            {error && !blogDetails.title && error.from === "title" ? (
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

        <label htmlFor="description"> Short Description</label>
        <div className="w-full h-30 mt-2">
          <textarea
            value={blogDetails.short_description}
            onChange={handleChange}
            placeholder="A brief summary of the article"
            rows={3}
            name="short_description"
            className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
          />
          {error &&
          !blogDetails.short_description &&
          error.from === "short_description" ? (
            <span className="text-base mt-6 font-semibold text-red-700">
              {error.errorMessage}
            </span>
          ) : null}
        </div>

        <label htmlFor="description">Body Text</label>
        <div className="w-full h-30 mt-2">
          <textarea
            value={blogDetails.body}
            name="body"
            onChange={handleChange}
            placeholder="Write your blog post here..."
            rows={4}
            className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
          />
          {error && !blogDetails.body && error.from === "body" ? (
            <span className="text-base mt-6 font-semibold text-red-700">
              {error.errorMessage}
            </span>
          ) : null}
        </div>
        <button
          onClick={handleCreateBlog}
          disabled={creatingBlog}
          className="w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg cursor-pointer transition"
        >
          {creatingBlog ? "Uploading Blog..." : "Upload Blog"}
        </button>
      </div>
    </div>
  );
}
