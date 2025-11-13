// src/pages/Reservation.tsx
import React, { useEffect, useState, useRef } from "react";
import HeroSection from "../components/herosections/Herosection";
import { assets } from "../assets/assests";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCartStore } from "../store/cartStore";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const DEPOSIT = 5000;

const BANK_DETAILS = {
  accountName: "Enora Lifestyle And Spa",
  bankName: "GTBank",
  accountNumber: "0123456789",
};

const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const ReservationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  booking_date: Yup.string()
    .required("Booking date is required")
    .test("is-future-date", "Date cannot be in the past", (value) => {
      if (!value) return false;
      return new Date(value) >= new Date(getTodayDate());
    }),
  booking_time: Yup.string()
    .required("Booking time is required")
    .test("is-valid-time", "Time must be between 9:00 AM and 6:00 PM", (value) => {
      if (!value) return false;
      const [hours, minutes] = value.split(":").map(Number);
      const totalMinutes = hours * 60 + minutes;
      const start = 9 * 60;
      const end = 18 * 60;
      return totalMinutes >= start && totalMinutes < end;
    }),
  notes: Yup.string(),
});

const Reservation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Reservation - Enora Lifestyle And Spa";
  }, []);

  const { items, clearCart } = useCartStore();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"online" | "manual" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showPaymentModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPaymentModal]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      booking_date: "",
      booking_time: "",
      notes: "",
    },
    validationSchema: ReservationSchema,
    onSubmit: () => setShowPaymentModal(true),
  });

  const totalAmount = items.reduce((s, i) => s + i.price, 0);

  const createBooking = async () => {
    const payload = {
      name: formik.values.name,
      email: formik.values.email,
      phone: formik.values.phone,
      booking_date: formik.values.booking_date,
      booking_time: formik.values.booking_time,
      notes: formik.values.notes,
      bookingable_ids: items.map((i) => parseInt(i.id)),
      payment_method: paymentMethod,
      amount: totalAmount.toFixed(2),
    };
    const { data } = await axios.post<{ data: { id: number } }>(`${API_URL}/bookings`, payload);
    return data.data.id;
  };

  const processPayment = async (payment_method?: string) => {
    if (!payment_method) return;
    setSubmitting(true);
    try {
      const bookingId = await createBooking();

      if (payment_method === "online") {
        const form = new FormData();
        form.append("amount", DEPOSIT.toFixed(2));
        form.append("payment_type", "online");
        const { data } = await axios.post(
          `${API_URL}/bookings/${bookingId}/transactions`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const authUrl = data.authorization_url;
        if (!authUrl) throw new Error("Payment failed: No authorization URL.");
        sessionStorage.setItem("pendingBookingId", bookingId.toString());
        window.location.href = authUrl;
        return;
      }

      if (paymentMethod === "manual" && proofFile) {
        const form = new FormData();
        form.append("amount", DEPOSIT.toFixed(2));
        form.append("payment_type", "manual");
        form.append("proof_of_payment", proofFile);
        await axios.post(
          `${API_URL}/bookings/${bookingId}/transactions`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("Booking confirmed! Pay ₦5,000 deposit on arrival.", {
          duration: 5000,
          style: { background: "#10b981", color: "white" },
        });
        closeModalAndReset();
        clearCart?.();
        navigate("/payment-status?type=booking&status=success&reference=manual&booking=" + bookingId, { replace: true });
      }
    } catch (e: any) {
      const message = e.response?.data?.message || e.message || "Something went wrong.";
      toast.error(message);
      setSubmitting(false);
    }
  };

  const closeModalAndReset = () => {
    setShowPaymentModal(false);
    setPaymentMethod(null);
    setProofFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const reference = query.get("reference");
    const status = query.get("status");
    if (!reference) return;
    const pendingId = sessionStorage.getItem("pendingBookingId") || "0";
    sessionStorage.removeItem("pendingBookingId");
    const isSuccess = status === "success";
    const target = `/payment-status?type=booking&status=${isSuccess ? "success" : "failed"}&reference=${reference}&booking=${pendingId}`;
    navigate(target, { replace: true });
  }, [location.search, navigate]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen">
        <HeroSection title="Reservation" backgroundImage={assets.hero} height="lg:h-[65vh] h-[35vh]" />
        <div className="max-w-4xl mx-auto mt-12 p-8 text-center">
          <h2 className="text-2xl font-bold text-(--accent-color) mb-4">Your cart is empty</h2>
          <Link to="/services" className="bg-(--primary-color) text-white py-2 px-6 rounded-lg inline-block">
            Browse Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection title="Reservation" backgroundImage={assets.hero} height="lg:h-[65vh] h-[35vh]" />

      {/* FORM */}
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NAME */}
            <div className="floating-label-group relative md:col-span-2">
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="indent-3 text-base floating-label-input w-full h-[56px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="name" className="floating-label absolute top-1 text-(--accent-color) text-base pointer-events-none transition-all duration-200 left-3">
                Name
              </label>
              {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>}
            </div>

            {/* EMAIL & PHONE */}
            <div className="floating-label-group relative">
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="indent-3 text-base floating-label-input w-full h-[56px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="email" className="floating-label absolute top-1 text-(--accent-color) text-base pointer-events-none transition-all duration-200 left-3">
                Email
              </label>
              {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>}
            </div>

            <div className="floating-label-group relative">
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="indent-3 text-base floating-label-input w-full h-[56px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="phone" className="floating-label absolute top-1 text-(--accent-color) text-base pointer-events-none transition-all duration-200 left-3">
                Phone
              </label>
              {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>}
            </div>

            {/* DATE & TIME */}
            <div className="floating-label-group relative">
              <input
                type="date"
                id="booking_date"
                name="booking_date"
                min={getTodayDate()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.booking_date}
                className="indent-3 text-base floating-label-input w-full h-[56px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="booking_date" className="floating-label absolute top-1 text-(--accent-color) text-base pointer-events-none transition-all duration-200 left-3">
                Booking Date
              </label>
              {formik.touched.booking_date && formik.errors.booking_date && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.booking_date}</div>
              )}
            </div>

            <div className="floating-label-group relative">
              <input
                type="time"
                id="booking_time"
                name="booking_time"
                min="09:00"
                max="17:59"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.booking_time}
                className="indent-3 text-base floating-label-input w-full h-[56px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="booking_time" className="floating-label absolute top-1 text-(--accent-color) text-base pointer-events-none transition-all duration-200 left-3">
                Booking Time (9 AM – 6 PM)
              </label>
              {formik.touched.booking_time && formik.errors.booking_time && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.booking_time}</div>
              )}
            </div>

            {/* NOTES */}
            <div className="floating-label-group relative md:col-span-2">
              <textarea
                id="notes"
                name="notes"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.notes}
                className="indent-3 py-3 text-base resize-none floating-label-input w-full rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                rows={4}
                placeholder=" "
              />
              <label htmlFor="notes" className="floating-label absolute top-1 text-(--accent-color) text-base pointer-events-none transition-all duration-200 left-3">
                Notes (Optional)
              </label>
            </div>
          </div>

          {/* CART SUMMARY - SCROLLABLE */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <p className="font-semibold text-(--accent-color) mb-2">Selected Services:</p>

            {/* Scrollable List */}
            <div className="max-h-64 overflow-y-auto pr-2 space-y-2 text-base">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <div className="">
                    <span className="font-medium!">{i.title}</span>
                    &nbsp;&nbsp;&nbsp;<span className="text-(--primary-color) font-medium! font-[Inter]!">X {i.quantity}</span>
                  </div>
                  <span>₦{i.price.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <p className="mt-3 font-bold text-right text-lg">Total: ₦{totalAmount.toLocaleString()}</p>
            <p className="mt-1 text-sm text-gray-600">
              *Pay <strong>₦5,000 deposit</strong> to confirm. Balance on arrival.
            </p>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={formik.isSubmitting || submitting}
              className="md:w-1/2 w-full bg-(--primary-color) text-white py-3 px-6 rounded-lg transition-all disabled:opacity-60 hover:opacity-90 font-medium"
            >
              {formik.isSubmitting || submitting ? "Please wait..." : "Proceed to Payment"}
            </button>
          </div>
        </form>
      </div>

      {/* PAYMENT MODAL – 70vh + SCROLLABLE CONTENT */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md h-[80vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-2xl font-bold text-(--accent-color)">Confirm Deposit</h3>
              <button
                onClick={closeModalAndReset}
                disabled={submitting}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-2xl">
                <p className="font-bold text-lg">₦5,000 Deposit Required</p>
                <p className="text-sm text-gray-600">To secure your booking</p>
              </div>

              <div className="space-y-3">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between text-base">
                    <div className="">
                      <span>{i.title}</span>
                      X<span>{i.quantity}</span>
                    </div>
                    <span className="font-medium">₦{i.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-bold flex justify-between text-lg">
                  <span>Total</span>
                  <span>₦{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment Options */}
              {!paymentMethod ? (
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => processPayment("online")}
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-(--primary-color) to-purple-700 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Redirecting...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h10m-9 4h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Pay Online Now
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentMethod("manual")}
                    disabled={submitting}
                    className="w-full border-2 border-(--primary-color) text-(--primary-color) py-3.5 rounded-xl font-semibold hover:bg-(--primary-color)/5 transition"
                  >
                    Pay Manually (Upload Proof)
                  </button>
                </div>
              ) : paymentMethod === "manual" ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-base">
                    <p className="font-bold text-blue-900 mb-2">Bank Transfer Details</p>
                    <div className="space-y-1 text-gray-700">
                      <p><strong>Account Name:</strong> {BANK_DETAILS.accountName}</p>
                      <p><strong>Bank:</strong> {BANK_DETAILS.bankName}</p>
                      <p className="flex items-center gap-2">
                        <strong>Account No:</strong>
                        <span
                          className="font-mono text-(--primary-color) cursor-pointer underline flex items-center gap-1"
                          onClick={() => {
                            navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
                            toast.success("Copied!", { duration: 1500 });
                          }}
                        >
                          {BANK_DETAILS.accountNumber}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-base font-medium mb-2">Upload Proof of Payment</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && setProofFile(e.target.files[0])}
                      className="block w-full text-base text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-(--primary-color) file:text-white hover:file:bg-(--primary-color)/90"
                    />
                    {proofFile && <p className="mt-2 text-xs text-green-600 font-medium">{proofFile.name}</p>}
                  </div>

                  <button
                    onClick={() => processPayment("manual")}
                    disabled={submitting || !proofFile}
                    className="w-full bg-green-600 text-white py-3.5 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-60 transition flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      "Confirm Payment"
                    )}
                  </button>
                </div>
              ) : null}
            </div>

            {/* Footer */}
            <div className="p-6 border-t">
              <button
                onClick={closeModalAndReset}
                disabled={submitting}
                className="w-full text-sm text-gray-500 hover:text-gray-700 underline text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;