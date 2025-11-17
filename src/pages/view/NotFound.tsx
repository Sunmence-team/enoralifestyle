import { assets } from '../../assets/assests'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='w-screen h-screen overflow-hidden'>
        <div className="w-full h-full flex flex-col gap-8 items-center justify-center p-4">
            <img src={assets.faintellipse} alt="..." className='object-cover lg:h-[70%] md:h-[500px] h-[250px] absolute top-1/2 -translate-y-[65%] left-1/2 -translate-x-[40%] animate-spin [animation-duration:15s] [animation-direction:reverse] [animation-delay:1s]' />
            <img src={assets.faintellipse} alt="..." className='object-cover lg:h-[70%] md:h-[500px] h-[250px] absolute top-1/2 -translate-y-[65%] left-1/2 -translate-x-[60%] animate-spin [animation-duration:15s] [animation-delay:2s]' />
            <div className="relative lg:h-[70%] md:h-[500px] h-[250px] flex items-center justify-center">
                <img src={assets.thickellipse} alt="..." className='w-full h-full animate-spin [animation-duration:15s] [animation-delay:4s] [animation-direction:reverse]' />
                <div className="absolute text-white text-center">
                    <h3 className='md:text-9xl text-7xl font-extrabold! font-[Inter]!'>404</h3>
                    <p className='text-2xl font-[Inter]!'>Page not found</p>
                </div>
            </div>
            <Link
                to={"/"}
                className='bg-[#C97BB7] h-[50px] flex items-center justify-between px-6 rounded-lg font-[Inter]! text-white font-semibold!'
            >Go back to Home</Link>
        </div>
    </div>
  )
}

export default NotFound