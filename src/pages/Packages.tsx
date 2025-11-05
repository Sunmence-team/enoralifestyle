// import React from 'react'
import Packagehero from '../components/Packagehero'
import { assets } from "../assets/assests";
import PackageList from '../components/PackageList';

const Packages = () => {
  return (
    <div>
      <Packagehero 
        title="Packages"
        backgroundImage={assets.packageImg}
        height="h-[70vh]" // home page is taller 
      />
      <PackageList />
    </div>
  )
}

export default Packages