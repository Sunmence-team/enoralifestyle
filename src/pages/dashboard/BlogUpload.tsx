import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
// import { MdImage } from "react-icons/md";
import { BiImageAlt } from "react-icons/bi";

export default function UploadBlog() {

  // const [fileName, setFileName] = React.useState("No file chosen");  
  const [image, setImage] = React.useState<string | null>(null);
  const [title, setTitle] = React.useState('')
  const [article, setArticle] = React.useState('')
  const [blogPost, setblogPost] = React.useState('')

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center w-full mb-3'>
        <h2 className='font-bold text-2xl'>Uplaod Blug</h2>
        <div className='flex gap-3'>
          <div className='p-3 rounded-full bg-[var(--pink-color)] '><IoIosNotifications size={25} className='text-[var(--primary-color)]' /></div>
          <div className='p-3 rounded-full bg-[var(--pink-color)]'><FaRegUserCircle size={25} className='text-[var(--primary-color)]' /></div>
        </div>
      </div>

      <div className='bg-white rounded-md p-6'>
        <div>
          <h2 className='font-bold mb-4 text-2xl'>Upload Blug</h2>

          <div className="mb-5 ">
            <label className="block text-sm text-gray-700 mb-2">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.g Anti-Aging Facials: Do They Really Make You Look Younger?"
              className="w-full border border-(--primary-color) rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>
        </div>


        <div className='w-full mb-5 '>
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
              {image ? (
                <img src={image} alt="Preview" className="max-h-40 rounded" />
              ) : (
                <>
                  <div className="w-10 h-10 flex items-center justify-center">
                    <BiImageAlt className="w-10 h-10 text-[var(--primary-color)]" />
                  </div>
                  <div className='flex items-center gap-3 mt-2'>
                    <div className="text-sm rounded-full px-2 py-0.5 border border-[var(--primary-color)] ">Choose File</div>
                    <div className="text-xs">No file chosen</div>
                  </div>
                </>
              )}
            </label>
          </div>
        </div>

        <label htmlFor="description"> Short Description</label>
        <div className='w-full h-30 mt-2'>
          <textarea
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            placeholder="A brief summary of the article"
            rows={3}
            className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
          />
        </div>

        <label htmlFor="description">Body Text</label>
        <div className='w-full h-30 mt-2'>
          <textarea
            value={blogPost}
            onChange={(e) => setblogPost(e.target.value)}
            placeholder="Write your blog post here..."
            rows={4}
            className="w-full border border-[var(--primary-color)] rounded-lg p-3 text-sm placeholder:text-[var(--primary-color)] bg-[var(--light-primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
          />
        </div>
        <button className="w-full bg-[var(--primary-color)] text-white font-medium py-3 rounded-lg cursor-pointer transition">
          Upload Blog
        </button>
      </div>

    </div>
  )
}
