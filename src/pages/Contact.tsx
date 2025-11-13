import React from 'react'
import Contacthero from '../components/Contacthero'
import { assets } from "../assets/assests";

const Contact = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  return (
    <div>
      <Contacthero
        title="Contact Us"
        backgroundImage={assets.contact}
        height="h-[70vh]" // home page is taller 
      />

      <div className='text-center mt-8'>
        <h2 className='text-[30px] md:text-[50px] font-bold'>Reach out to Us anytime</h2>
        <p className='font-semibold '>Feel free to ask us any questions</p>

      </div>
      <div className='flex flex-col gap-6 items-center justify-center h-[50vh] '>
        <div className='flex flex-col md:flex-row lg:flex w-full gap-3 items-center justify-center'>
          <input type='name' placeholder='Fullname' value={name} onChange={(e) => setName(e.target.value)} className='bg-gray-200 w-72 md:w-90 px-4 py-3 rounded-md border border-(--primary-color) text-xs focus:ring-1 focus:ring-(--primary-color) ' />
          <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='bg-gray-200 w-72 md:w-90 px-4 py-3 rounded-md border border-(--primary-color) text-xs focus:ring-1 focus:ring-(--primary-color) ' />
        </div>

        <textarea placeholder='Drop your enquires here' rows={4} className='bg-gray-200 w-72 md:w-[720px] px-4 py-3 rounded-md border border-(--primary-color) text-xs focus:ring-1 focus:ring-primary' />

      </div>
    </div>
  )
}

export default Contact
