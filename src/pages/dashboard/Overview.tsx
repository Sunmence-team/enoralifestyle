import React from 'react'
import { IoIosNotifications } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import { BiImageAlt } from "react-icons/bi";
// import { Label } from "@/components/ui/label"

export default function Overview() {

  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [image, setImage] = React.useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className=''>
      <div className='flex justify-between items-center w-full mb-3'>
        <h2 className='font-bold text-2xl'>Add Sercice</h2>
        <div className='flex gap-3'>
          <div className='p-3 rounded-full bg-[var(--pink-color)] '><IoIosNotifications size={25} className='text-[var(--primary-color)]' /></div>
          <div className='p-3 rounded-full bg-[var(--pink-color)]'><FaRegUserCircle size={25} className='text-[var(--primary-color)]' /></div>
        </div>
      </div>

      <div className='bg-white w-auto h-auto p-6 rounded-md'>

        <h2 className='text-lg font-bold mb-2 '>Add Service</h2>

        <div className='flex flex-col lg:flex w-full gap-5 items-center justify-center'>

          <div className='flex flex-col md:flex-row space-x-7 w-full gap-3 '>

            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Name</label>
              <input type='name' placeholder='Fullname' value={name} onChange={(e) => setName(e.target.value)} className='w-100 md:w-125 px-4 py-3 rounded-md border border-(--primary-color) text-xs focus:ring-1 focus:ring-(--primary-color) ' />
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Price</label>
              <input type='Price' placeholder='Price' value={price} onChange={(e) => setPrice(e.target.value)} className='w-100 md:w-125 px-4 py-3 rounded-md border border-(--primary-color) text-xs focus:ring-1 focus:ring-(--primary-color) ' />
            </div>
          </div>

          <div className='flex flex-col gap-2 w-full'>
            <label htmlFor="name">Description</label>
            <textarea placeholder='Description' rows={2} value={description} onChange={(e) => setDescription(e.target.value)} className='w-72 h-30 md:w-auto px-4 py-3 rounded-md border border-(--primary-color) text-xs focus:ring-1 focus:ring-(--primary-color) ' />
          </div>

          <div className='w-full'>
            <label className="mb-4">Image</label>
            <div className="border border-dashed border-(--primary-color) rounded-lg p-6 text-center hover:border-(--primary-color) transition-colors">
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
                      <BiImageAlt className="w-10 h-10 text-(--primary-color)" />
                    </div>
                    <div className='flex items-center gap-3'>
                      <div className="text-sm rounded-full px-2 py-0.5 border border-(--primary-color) ">Choose File</div>
                      <div className="text-xs">No file chosen</div>
                    </div>
                  </>
                )}
              </label>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
