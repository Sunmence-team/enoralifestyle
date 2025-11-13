// src/pages/PaymentStatus.tsx
import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CheckCircle2, XCircle, Calendar, Clock, CreditCard } from "lucide-react";

const PaymentStatus: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get("type");
  const status = queryParams.get("status");
  const reference = queryParams.get("reference");
  const purchase_id = queryParams.get("purchase_id") || queryParams.get("booking");

  useEffect(() => {
    if (!reference || !status) {
      navigate("/", { replace: true });
    }
  }, [reference, status, navigate]);

  const isSuccess = status === "success";

  if (status === "failed" || status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-red-50 to-pink-50">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center border border-red-100">
          <XCircle className="mx-auto text-red-600 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-red-700">Payment Failed</h1>
          <p className="text-gray-600 mb-6">
            We couldn't process your payment. Please try again.
          </p>
          <Link
            to="/"
            className="inline-block bg-(--primary-color) text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  if (typeParam === "ebook") {
    const handleDownload = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/resources/files/WELLTHRIX.pdf?id=${purchase_id}`
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "E-book.pdf";
      a.click();
      window.URL.revokeObjectURL(url);
    };

    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center border border-green-100">
          <CheckCircle2 className="mx-auto text-green-600 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-gray-600 mb-6">Your eBook is ready to download.</p>

          <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-700 mb-6">
            <p><strong>Reference:</strong> {reference}</p>
          </div>

          <button
            onClick={handleDownload}
            className="inline-block bg-(--primary-color) text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Download eBook
          </button>
        </div>
      </div>
    );
  }

  // BOOKING SUCCESS
  if (typeParam === "booking" && isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-emerald-50 to-cyan-50">
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md text-center border border-emerald-100">
          <CheckCircle2 className="mx-auto text-emerald-600 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-bold mb-2 text-emerald-700">Booking Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your appointment is secured. We'll see you soon!
          </p>

          <div className="bg-emerald-50 p-5 rounded-2xl mb-6 text-left text-sm space-y-3">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-emerald-600" />
              <span><strong>Date:</strong> {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span><strong>Time:</strong> Confirmed upon arrival</span>
            </div>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-emerald-600" />
              <span><strong>Deposit:</strong> ₦5,000 paid</span>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl text-sm text-gray-700 mb-6">
            <p><strong>Booking ID:</strong> {reference}</p>
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              to="/"
              className="px-5 py-2.5 bg-(--primary-color) text-white rounded-xl font-medium hover:opacity-90 transition"
            >
              Back to Home
            </Link>
            <Link
              to="/services"
              className="px-5 py-2.5 border border-(--primary-color) text-(--primary-color) rounded-xl font-medium hover:bg-(--primary-color)/5 transition"
            >
              Book Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default PaymentStatus;