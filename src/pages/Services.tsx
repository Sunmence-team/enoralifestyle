import React from 'react'
import Packagehero from '../components/Packagehero'
import { assets } from "../assets/assests";
// import service from '../assets/service.jpg'

const Packages = () => {
  return (
    <div>
      <Packagehero 
        title="Packages"
        backgroundImage={assets.service}
        height="h-[100vh]" // home page is taller 

      />
    </div>
  )
}

export default Packages