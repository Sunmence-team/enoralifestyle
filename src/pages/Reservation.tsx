// src/pages/Reservation.tsx
import React, { useEffect, useState, useRef } from 'react';
import HeroSection from '../components/herosections/Herosection';
import { assets } from '../assets/assests';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCartStore } from '../store/cartStore';
import axios from 'axios';
import { toast } from 'sonner';
import { CheckCircle, Copy, Upload, X, CreditCard, BanknoteArrowUp } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const IMAGE_URL = import.meta.env.VITE_API_IMAGE_URL;

interface ServiceItem {
  id: number;
  name: string;
  price: string;
  type: "service" | "package";
  image: string | null;
}

const RevervationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  booking_date: Yup.string().required("Booking date is required"),
  booking_time: Yup.string().required("Booking time is required"),
  notes: Yup.string(),
});

const Reservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Reservation - Enora Lifestyle And Spa";
  }, []);

  const { items, setItems, clearCart } = useCartStore();
  const [allServices, setAllServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [paymentType, setPaymentType] = useState<"online" | "manual" | null>(null);
  const [uploading, setUploading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${API_URL}services`);
        const data = res.data.data?.data || [];

        setAllServices(data);

        const defaultItems = data.slice(0, 2).map((item: ServiceItem) => ({
          id: item.id.toString(),
          title: item.name,
          price: parseFloat(item.price),
          image: item.image ? `${IMAGE_URL}${item.image}` : assets.our1,
        }));

        setItems(defaultItems);
      } catch (err) {
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [setItems]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      booking_date: "",
      booking_time: "",
      notes: "",
    },
    validationSchema: RevervationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        booking_date: values.booking_date,
        booking_time: values.booking_time,
        notes: values.notes,
        bookingable_ids: items.map(i => parseInt(i.id)),
      };

      try {
        const response = await axios.post(`${API_URL}bookings`, payload);
        setBookingId(response.data.data.id);
        setShowPaymentModal(true);
        toast.success("Booking created! Complete payment.");
        resetForm();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Booking failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Online Payment
  const handleOnlinePayment = async () => {
    if (!bookingId) return;

    try {
      const res = await axios.post(`${API_URL}bookings/${bookingId}/transactions`, {
        payment_type: "online",
        amount: 5000,
      });

      const authUrl = res.data.authorization_url;
      if (authUrl) {
        setPaymentSuccess(true);
        toast.success("Redirecting...");
        setTimeout(() => {
          window.location.href = authUrl;
        }, 1500);
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Payment failed");
    }
  };

  // Manual Payment
  const handleManualPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingId || !fileInputRef.current?.files?.[0]) {
      toast.error("Please upload proof");
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("payment_type", "manual");
    formData.append("amount", "5000");
    formData.append("proof_of_payment", file);

    setUploading(true);
    try {
      await axios.post(`${API_URL}bookings/${bookingId}/transactions`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPaymentSuccess(true);
      toast.success("Proof submitted!");
      setTimeout(() => {
        setShowPaymentModal(false);
        clearCart(); // CART CLEARED HERE
      }, 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied!");
  };

  // Lock scroll
  useEffect(() => {
    if (showPaymentModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [showPaymentModal]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      <HeroSection title="Reservation" backgroundImage={assets.hero} height="lg:h-[65vh] h-[35vh]" />

      <div className="max-w-4xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* === FORM FIELDS (unchanged) === */}
          {/* ... (your existing form fields) ... */}
          {/* CART SUMMARY */}
          {items.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
              <p className="font-semibold text-(--accent-color) mb-2">Selected Services:</p>
              <div className="space-y-2 text-sm">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span className="font-medium">{item.title}</span>
                    <span>₦{item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-bold text-right text-lg">
                Total: ₦{items.reduce((sum, i) => sum + i.price, 0).toLocaleString()}
              </p>
            </div>
          )}

          <div className="mt-8 text-center">
            <button
              type="submit"
              disabled={formik.isSubmitting || items.length === 0}
              className="md:w-1/2 w-full bg-(--primary-color) text-white py-3 px-6 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 font-medium"
            >
              {formik.isSubmitting ? "Booking..." : "Book Now"}
            </button>
          </div>
        </form>
      </div>

      {/* PAYMENT MODAL */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-screen overflow-y-auto relative">
            <button
              onClick={() => !paymentSuccess && setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              disabled={paymentSuccess}
            >
              <X className="w-5 h-5" />
            </button>

            {paymentSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
                <p className="text-sm text-gray-600">
                  {paymentType === "online" ? "Redirecting..." : "We’ll verify your proof."}
                </p>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold">Complete Booking</h3>
                  <p className="text-sm text-gray-600 mt-2">
                    Pay <strong className="text-(--primary-color)">₦5,000</strong> deposit now.
                  </p>
                </div>

                {!paymentType ? (
                  <div className="grid grid-cols-1 gap-4">
                    <button
                      onClick={() => setPaymentType("online")}
                      className="flex items-center justify-center gap-3 p-5 border-2 border-(--primary-color) rounded-xl hover:bg-(--primary-color) hover:text-white transition-all font-medium text-lg"
                    >
                      <CreditCard className="w-6 h-6" /> Pay Online
                    </button>
                    <button
                      onClick={() => setPaymentType("manual")}
                      className="flex items-center justify-center gap-3 p-5 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium text-lg"
                    >
                      <BanknoteArrowUp className="w-6 h-6" /> Pay via Transfer
                    </button>
                  </div>
                ) : paymentType === "online" ? (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm font-medium text-blue-900">Secure via Paystack</p>
                    </div>
                    <button
                      onClick={handleOnlinePayment}
                      className="w-full bg-(--primary-color) text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" /> Pay ₦5,000
                    </button>
                    <button onClick={() => setPaymentType(null)} className="w-full text-gray-500 text-sm underline">
                      Back
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleManualPayment} className="space-y-5">
                    <div className="bg-gray-50 p-5 rounded-xl space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Bank:</span>
                        <button type="button" onClick={() => copyToClipboard("GTBank")} className="flex items-center gap-1 text-(--primary-color)">
                          GTBank <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Account Name:</span>
                        <button type="button" onClick={() => copyToClipboard("Enora Lifestyle & Spa")} className="flex items-center gap-1 text-(--primary-color)">
                          Enora Lifestyle & Spa <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Account No:</span>
                        <button type="button" onClick={() => copyToClipboard("0123456789")} className="flex items-center gap-1 text-(--primary-color) font-mono">
                          0123456789 <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Upload Proof
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        required
                        className="w-full text-sm file:mr-4 file:py-2.5 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-(--primary-color) file:text-white"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        disabled={uploading}
                        className="flex-1 bg-(--primary-color) text-white py-3 rounded-xl font-medium disabled:opacity-60"
                      >
                        {uploading ? "Uploading..." : "Submit"}
                      </button>
                      <button type="button" onClick={() => setPaymentType(null)} className="flex-1 border border-gray-300 py-3 rounded-xl font-medium">
                        Back
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservation;