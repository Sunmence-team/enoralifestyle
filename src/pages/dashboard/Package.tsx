import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";

export default function Package() {

  const [packageName, setPackageName] = React.useState('')
  const [image, setImage] = React.useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div className='flex justify-between items-center w-full mb-3'>
        <h2 className='font-bold text-2xl'>Create Package</h2>
        <div className='flex gap-3'>
          <div className='p-3 rounded-full bg-[var(--pink-color)] '><IoIosNotifications size={25} className='text-[var(--primary-color)]' /></div>
          <div className='p-3 rounded-full bg-[var(--pink-color)]'><FaRegUserCircle size={25} className='text-[var(--primary-color)]' /></div>
        </div>
      </div>

      <div className='bg-white rounded-md p-6 space-y-60'>
        <div>
          <label htmlFor="package">Package Name</label>
          <input type="text"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            className='w-full border border-(--primary-color) rounded-lg p-3 text-sm mt-3 ' />
        </div>

        <div className='w-full mb-5 '>
          <label className="mb-7">Image</label>
          <div className="border border-dashed border-[var(--primary-color)] rounded-lg p-6 text-center hover:border-[var(--primary-color)] transition-colors">
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
      </div>
    </div>
  )
}
