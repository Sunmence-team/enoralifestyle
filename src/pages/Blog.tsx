import React from 'react'
import Bloghero from '../components/Bloghero'
import { assets } from "../assets/assests";
import Blogpost from '../components/Blogpost';

export default function Blog() {
  return (
    <div>
      <div>
        <Bloghero
          title="Blog"
          backgroundImage={assets.blogImg}
          height="h-[70vh]" // home page is taller 
        />
        <Blogpost />
      </div>
    </div>
  )
}
