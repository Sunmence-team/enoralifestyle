import React from 'react'
import { assets } from '../assets/assests'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Blog() {
    const blogPosts = [

        {   id: 1, 
            title: "Anti-Aging Facials: Do they really make you look younger?",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.face
        },
        {
            id: 2,
            title: "Why your skin isn't glowing. 5 mistakes to avoid.",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.face
        },
        {   
            id:3,
            title: "Why self-care is not a luxury but necessity.",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.face
        },
        {   id: 4, 
            title: "Anti-Aging Facials: Do they really make you look younger?",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.face
        },
        {
            id: 5,
            title: "Why your skin isn't glowing. 5 mistakes to avoid.",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.face
        },
        {   
            id:6,
            title: "Why self-care is not a luxury but necessity.",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.face
        }
    ]
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg-grid-cols-3'>
        {
            blogPosts.map((blog) => (
                <div key={blog.id} className="max-w-3xl mx-auto my-8 p-6 border border-gray-200 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-3">{blog.title}</h2>
                    <p className='text-gray-600 '>{blog.summary}</p>

                    <div>
                        <img src={blog.img} alt="" />
                        <div>
                        <button className='text-(--(primary-color)) '>Read more</button>
                        <MdKeyboardDoubleArrowRight />
                        </div>
                    </div>
                </div>
            ))
        }
      
    </div>
  )
}
