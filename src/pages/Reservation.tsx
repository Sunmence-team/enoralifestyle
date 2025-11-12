// src/pages/Reservation.tsx
import React, { useEffect, useState, useRef } from "react";
import HeroSection from "../components/herosections/Herosection";
import { assets } from "../assets/assests";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCartStore } from "../store/cartStore";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

const DEPOSIT = 5000;

const BANK_DETAILS = {
  accountName: "Enora Lifestyle And Spa",
  bankName: "GTBank",
  accountNumber: "0123456789", // CHANGE TO YOUR REAL ACCOUNT
};

const ReservationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  booking_date: Yup.string().required("Booking date is required"),
  booking_time: Yup.string().required("Booking time is required"),
  notes: Yup.string(),
});

const Reservation = () => {
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
    onSubmit: () => {
      if (items.length === 0) {
        toast.error("Please add at least one service to your cart.");
        return;
      }
      setShowPaymentModal(true);
    },
  });

  const totalAmount = items.reduce((s, i) => s + i.price, 0);

  /* --------------------------------------------------------------- */
  /*  CREATE BOOKING                                                 */
  /* --------------------------------------------------------------- */
  const createBooking = async (method: "online" | "manual") => {
    const payload = {
      name: formik.values.name,
      email: formik.values.email,
      phone: formik.values.phone,
      booking_date: formik.values.booking_date,
      booking_time: formik.values.booking_time,
      notes: formik.values.notes,
      bookingable_ids: items.map((i) => parseInt(i.id)),
      payment_method: method,
      amount: totalAmount.toFixed(2),
    };

    const { data } = await axios.post<{ data: { id: number } }>(`${API_URL}/bookings`, payload);
    return data.data.id;
  };

  /* --------------------------------------------------------------- */
  /*  PROCESS PAYMENT                                                */
  /* --------------------------------------------------------------- */
  const processPayment = async () => {
    if (!paymentMethod) return;
    setSubmitting(true);

    try {
      const bookingId = await createBooking(paymentMethod);

      if (paymentMethod === "online") {
        const form = new FormData();
        form.append("amount", DEPOSIT.toFixed(2));
        form.append("payment_type", "online");

        const { data } = await axios.post(
          `${API_URL}/bookings/${bookingId}/transactions`,
          form,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        const proof = JSON.parse(data.transaction.proof_of_payment);
        const authUrl = proof.data.authorization_url;

        sessionStorage.setItem("pendingBookingId", bookingId.toString());
        toast.success("Redirecting to Paystack...");
        setTimeout(() => {
          window.location.href = authUrl;
        }, 800);
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

        toast.success("Booking confirmed! Pay ₦5,000 on arrival.");
        setShowPaymentModal(false);
        formik.resetForm();
        clearCart?.();
      }
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Payment failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* --------------------------------------------------------------- */
  /*  PAYSTACK CALLBACK                                              */
  /* --------------------------------------------------------------- */
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const reference = query.get("reference");
    const status = query.get("status");

    if (!reference) return;

    const pendingId = sessionStorage.getItem("pendingBookingId") || "0";
    sessionStorage.removeItem("pendingBookingId");

    const isSuccess = status === "success";
    const target = `/payment-status?type=booking&status=${isSuccess ? "success" : "failed"}&reference=${reference}&purchase_id=${pendingId}`;

    navigate(target, { replace: true });
  }, [location.search, navigate]);

  return (
    <div>
      <HeroSection title="Reservation" backgroundImage={assets.hero} height="lg:h-[65vh] h-[35vh]" />

      {/* ==================== FORM ==================== */}
      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white lg:shadow-lg rounded-lg">
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
                className="indent-3 text-sm floating-label-input w-full h-[50px] rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20"
                placeholder=" "
              />
              <label htmlFor="name" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">
                Name
              </label>
              {formik.touched.name && formik.errors.name && <div className="text-red-500 text-sm mt-1">{formik.errors.name}</div>}
            </div>

            {/* EMAIL */}
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
              <label htmlFor="email" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">
                Email
              </label>
              {formik.touched.email && formik.errors.email && <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>}
            </div>

            {/* PHONE */}
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
              <label htmlFor="phone" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">
                Phone
              </label>
              {formik.touched.phone && formik.errors.phone && <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>}
            </div>

            {/* DATE */}
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
              <label htmlFor="booking_date" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">
                Booking Date
              </label>
              {formik.touched.booking_date && formik.errors.booking_date && (
                <div className="text-red-500 text-sm mt-1">{formik.errors.booking_date}</div>
              )}
            </div>

            {/* TIME */}
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
              <label htmlFor="booking_time" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">
                Booking Time
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
                className="indent-3 py-3 text-sm resize-none floating-label-input w-full rounded-md transition-all duration-200 outline-0 bg-[#d9d9d9]/15 border border-(--primary-color)/20 styled-scrollbar"
                rows={4}
                placeholder=" "
              />
              <label htmlFor="notes" className="floating-label absolute top-1 text-(--accent-color) text-sm pointer-events-none transition-all duration-200 left-3">
                Notes
              </label>
            </div>
          </div>

          {/* CART SUMMARY */}
          {items.length > 0 ? (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <p className="font-semibold text-(--accent-color) mb-2">Selected Services:</p>
              <div className="space-y-2 text-sm">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span className="font-medium">{i.title}</span>
                    <span>₦{i.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-bold text-right text-lg">Total: ₦{totalAmount.toLocaleString()}</p>
              <p className="mt-1 text-sm text-gray-600">
                *Pay <strong>₦5,000 deposit</strong> to confirm. Balance on arrival.
              </p>
            </div>
          ) : (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-sm text-center">
              <p>Your cart is empty. Please <strong>add services</strong> before booking.</p>
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={items.length === 0}
              style={{ backgroundColor: "var(--primary-color)" }}
              className="md:w-1/2 w-full text-white py-3 px-6 rounded-lg transition-all disabled:opacity-60 hover:opacity-90 font-medium"
            >
              Proceed to Payment
            </button>
          </div>
        </form>
      </div>

      {/* ==================== PAYMENT MODAL ==================== */}
      {showPaymentModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50" onClick={() => !submitting && setShowPaymentModal(false)} />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-(--accent-color) mb-4">Deposit – ₦5,000</h3>

              {/* Summary */}
              <div className="mb-5 text-sm space-y-1">
                {items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>{i.title}</span>
                    <span className="font-medium">₦{i.price.toLocaleString()}</span>
                  </div>
                ))}
                <div className="border-t pt-2 font-bold flex justify-between">
                  <span>Total</span>
                  <span>₦{totalAmount.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Pay <strong>₦5,000 deposit</strong> to secure your booking.
                </p>
              </div>

              {/* CHOOSE METHOD */}
              {!paymentMethod && (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    disabled={submitting}
                    style={{ backgroundColor: "var(--primary-color)" }}
                    className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
                  >
                    Pay Online Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("manual")}
                    disabled={submitting}
                    style={{ borderColor: "var(--primary-color)", color: "var(--primary-color)" }}
                    className="w-full border py-3 rounded-lg font-medium hover:bg-(--primary-color)/5 disabled:opacity-60"
                  >
                    Pay Manually (Upload Proof)
                  </button>
                </div>
              )}

              {/* MANUAL FLOW */}
              {paymentMethod === "manual" && (
                <>
                  <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
                    <p className="font-semibold text-blue-900 mb-2">Transfer to:</p>
                    <div className="space-y-1 text-gray-800">
                      <p><span className="font-medium">Account Name:</span> {BANK_DETAILS.accountName}</p>
                      <p><span className="font-medium">Bank:</span> {BANK_DETAILS.bankName}</p>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">Account No:</span>
                        <span
                          className="font-mono text-(--primary-color) underline cursor-pointer flex items-center gap-1"
                          onClick={() => {
                            navigator.clipboard.writeText(BANK_DETAILS.accountNumber);
                            toast.success("Account number copied!");
                          }}
                        >
                          {BANK_DETAILS.accountNumber}
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Upload Proof of Payment</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && setProofFile(e.target.files[0])}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-(--primary-color) file:text-white"
                    />
                    {proofFile && <p className="mt-1 text-xs" style={{ color: "#28a745" }}>{proofFile.name}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={processPayment}
                    disabled={submitting || !proofFile}
                    style={{ backgroundColor: "#28a745" }}
                    className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-60"
                  >
                    {submitting ? "Submitting..." : "Confirm Manual Payment"}
                  </button>
                </>
              )}

              {/* ONLINE FLOW */}
              {paymentMethod === "online" && !submitting && (
                <button
                  type="button"
                  onClick={processPayment}
                  style={{ backgroundColor: "var(--primary-color)" }}
                  className="w-full text-white py-3 rounded-lg font-medium hover:opacity-90"
                >
                  Redirecting to Paystack...
                </button>
              )}

              {/* CANCEL */}
              <button
                type="button"
                onClick={() => {
                  setShowPaymentModal(false);
                  setPaymentMethod(null);
                  setProofFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                disabled={submitting}
                className="mt-4 text-sm underline text-gray-500 hover:text-gray-700 w-full text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Reservation;