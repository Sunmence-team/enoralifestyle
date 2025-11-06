import React from 'react'
import Bloghero from '../components/Bloghero'
import { assets } from "../assets/assests";

const Blog = () => {
  return (
    <div>
      <Bloghero
        title="Blog"
        backgroundImage={assets.blogImg}
        height="h-[70vh]" // home page is taller 
      />
    </div>
  )
}

export default Blog
