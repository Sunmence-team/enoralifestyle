import React, { useEffect } from 'react'
import HeroSection from '../components/herosections/Herosection'
import { assets } from '../assets/assests'
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCartStore } from '../store/cartStore';

const RevervationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  booking_date: Yup.string().required("Booking date is required"),
  booking_time: Yup.string().required("Booking time is required"),
  notes: Yup.string(),
})

const Reservation = () => {

  useEffect(() => {
    window.scroll(0, 0)
    document.title = "Reservation - Enora Lifestyle And Spa";
  }, [])

  const { items } = useCartStore()
  console.log("items from reserve", items)

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      booking_date: "",
      booking_time: "",
      notes: "",
      bookingable_ids: items.map((item) => item.id)
    },
    validationSchema: RevervationSchema,
    onSubmit: async (values) => {
      console.log("values", values)
      try {
        // coming soon
      } catch (error) {
        console.error("Reservation error", error)
      }
    }
  })

  return (
    <div>
      <HeroSection
        title="Reservation"
        backgroundImage={assets.hero}
        height="lg:h-[65vh] h-[35vh]"
      />

      <div>
        <form onSubmit={formik.handleSubmit} className="mt-12 p-8 bg-white shadow-lg rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="floating-label-group relative md:col-span-2">
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="indent-3 text-sm floating-label-input w-full h-[50px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="name" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">Name</label>
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="floating-label-group relative">
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="indent-3 text-sm floating-label-input w-full h-[50px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="email" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">Email</label>
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="floating-label-group relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="indent-3 text-sm floating-label-input w-full h-[50px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="phone" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">Phone</label>
              {formik.touched.phone && formik.errors.phone ? (
                <div className="text-red-500 text-sm">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div className="floating-label-group relative">
              <input
                type="date"
                id="booking_date"
                name="booking_date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.booking_date}
                className="indent-3 text-sm floating-label-input w-full h-[50px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="booking_date" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">Booking Date</label>
              {formik.touched.booking_date && formik.errors.booking_date ? (
                <div className="text-red-500 text-sm">{formik.errors.booking_date}</div>
              ) : null}
            </div>
            <div className="floating-label-group relative">
              <input
                type="time"
                id="booking_time"
                name="booking_time"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.booking_time}
                className="indent-3 text-sm floating-label-input w-full h-[50px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="booking_time" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">Booking Time</label>
              {formik.touched.booking_time && formik.errors.booking_time ? (
                <div className="text-red-500 text-sm">{formik.errors.booking_time}</div>
              ) : null}
            </div>
            <div className="floating-label-group relative md:col-span-2">
              <textarea
                id="notes"
                name="notes"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                className="indent-3 py-3 text-sm resize-none floating-label-input w-full rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                rows={4}
                placeholder=" "
              ></textarea>
              <label htmlFor="notes" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">Notes</label>
            </div>
          </div>
          <div className="mt-8 text-center">
            <button type="submit" className="md:w-1/2 mx-auto w-full bg-(--primary-color) text-white py-3 px-6 rounded-lg transition-colors">
              Book Now
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Reservation