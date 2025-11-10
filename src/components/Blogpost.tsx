import React from 'react'
import { assets } from '../assets/assests'
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Blogpost() {
    const blogPosts = [

        {
            id: 1,
            title: "Anti-Aging Facials: Do they really make you look younger?",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.blog1
        },
        {
            id: 2,
            title: "Why your skin isn't glowing. 5 mistakes to avoid.",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.blog2
        },
        {
            id: 3,
            title: "Why self-care is not a luxury but necessity.",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.blog3
        },
        {
            id: 4,
            title: "Anti-Aging Facials: Do they really make you look younger?",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.blog1
        },
        {
            id: 5,
            title: "Why your skin isn't glowing. 5 mistakes to avoid.",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.blog2
        },
        {
            id: 6,
            title: "Why self-care is not a luxury but necessity.",
            summary: "You need your face to be amazing and lovely and you need to read this blog to get better abeg.",
            img: assets.blog3
        }
    ]
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 lg-grid-cols-2 gap-3 p-2 lg:px-12 py-7 '>
            {
                blogPosts.map((blog) => (
                    <div key={blog.id} className="max-w-3xl mx-auto my-2 px-4 py-2 border border-gray-200 rounded-lg flex flex-col gap-2 items-center ">
                        <h2 className="text-2xl font-bold mb-3">{blog.title}</h2>
                        <p className='text-gray-600 mb-3 '>{blog.summary}</p>

                        <div className='rounded-tl-md rounded-tr-md w-50 h-65 flex justify-center h-'>
                            <img src={blog.img} alt=""
                                className='w-full h-[] object-cover rounded-md mb-3'
                            />
                        </div>
                        <div className='flex items-center justify-center'>
                            <a href="#" className='text-(--primary-color)'>
                                Read more
                            </a>
                            <span>
                                <MdKeyboardDoubleArrowRight size={25} className='text-(--primary-color)' />
                            </span>
                        </div>
                    </div>
                ))
            }

        </div>
    )
}
