import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { CheckCircle2, XCircle } from "lucide-react";

const PaymentStatus: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const typeParam = queryParams.get("type");
  const status = queryParams.get("status");
  const reference = queryParams.get("reference");
  const purchase_id = queryParams.get("purchase_id");
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
  useEffect(() => {
    if (!reference || !status) {
      navigate("/", { replace: true });
    }
  }, [reference, navigate]);

  return status === "error" ? (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md text-center border border-black/10">
          <XCircle className="mx-auto text-red-600 w-16 h-16 mb-4" />
          <h1 className="text-2xl font-semibold mb-2 text-red-600">
            Payment Failed
          </h1>
          <p className="text-gray-600 mb-6 font-[Playfair]!">
            Unfortunately, your payment was not successful. Please try again.
          </p>
          <Link
            to="/"
            className="inline-block hover:bg-[#550342] bg-(--primary-color) text-white px-6 py-2 rounded-md transition cursor-pointer"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    ) : typeParam === "ebook" ? (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md text-center border border-black/10">
          {status === "success" && (
            <>
              <CheckCircle2 className="mx-auto text-green-600 w-16 h-16 mb-4" />
              <h1 className="text-2xl font-semibold mb-2">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your payment has been confirmed.
              </p>

              <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700 mb-6">
                <p>
                  <strong>Reference:</strong> {reference}
                </p>
              </div>

              <button
                onClick={handleDownload}
                className="inline-block hover:bg-[#550342] bg-(--primary-color) text-white px-6 py-2 rounded-md transition cursor-pointer"
              >
                Download eBook
              </button>
            </>
          )}
        </div>
      </div>
    ) : null;
};

export default PaymentStatus;
