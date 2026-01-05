// import { assets } from '../../assets/assests'

// const Loader = () => {
//   return (
//     <div className='w-screen h-screen overflow-hidden'>
//         <div className="w-full h-full flex flex-col gap-8 items-center justify-center p-4">
//             <img src={assets.faintellipse} alt="..." className='object-cover lg:h-[70%] md:h-[500px] h-[250px] absolute top-1/2 -translate-y-[55%] left-1/2 -translate-x-[40%] animate-spin [animation-duration:15s] [animation-direction:reverse] [animation-delay:1s]' />
//             <img src={assets.faintellipse} alt="..." className='object-cover lg:h-[70%] md:h-[500px] h-[250px] absolute top-1/2 -translate-y-[55%] left-1/2 -translate-x-[60%] animate-spin [animation-duration:15s] [animation-delay:1s]' />
//             <div className="relative lg:h-[70%] md:h-[500px] h-[250px] flex items-center justify-center">
//                 <img src={assets.thickellipse} alt="..." className='w-full h-full animate-spin [animation-duration:15s] [animation-delay:2s] [animation-direction:reverse]' />
//                 <div className="absolute text-white text-center">
//                     <h3 className='md:text-5xl text-2xl font-extrabold! font-[Inter]!'>Enora spa</h3>
//                     <p className='text-2xl font-[Inter]!'>Loading...</p>
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }

// export default Loader

import { assets } from '../../assets/assests'

const Loader = () => {
  return (
    <div className='w-screen h-screen overflow-hidden'>
        <div className="w-full h-full flex flex-col gap-8 items-center justify-center p-4">
            {/* Background Ellipses */}
            <img src={assets.faintellipse} alt="..." className='object-cover lg:h-[70%] md:h-[500px] h-[250px] absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-[40%] animate-spin [animation-duration:15s] [animation-direction:reverse]' />
            <img src={assets.faintellipse} alt="..." className='object-cover lg:h-[70%] md:h-[500px] h-[250px] absolute top-1/2 -translate-y-[50%] left-1/2 -translate-x-[60%] animate-spin [animation-duration:15s]' />
            
            <div className="relative lg:h-[70%] md:h-[500px] h-[250px] flex items-center justify-center">
                <img src={assets.thickellipse} alt="..." className='w-full h-full animate-spi [animation-duration:10s] [animation-direction:reverse] rotate-45' />
                
                <div className="absolute text-white text-center flex flex-col items-center">
                    {/* Main Title: Fades in from bottom */}
                    <h3 className='md:text-5xl text-3xl font-extrabold! font-[Inter]! fadeInUp'>
                        Enora spa
                    </h3>
                    
                    {/* Loading Text: Appears with delay and pulsing dots */}
                    <p className='text-xl text-white/70 font-[Inter]!'>
                        Loading
                        <span className="inline-flex ml-1">
                            <span className="animate-bounce [animation-delay:1.2s]">.</span>
                            <span className="animate-bounce [animation-delay:1.4s]">.</span>
                            <span className="animate-bounce [animation-delay:1.6s]">.</span>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Loader
