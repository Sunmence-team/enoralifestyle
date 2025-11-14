// src/pages/auth/Register.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "sonner";
import { assets } from "../../assets/assests"; // adjust path if needed

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Register: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${API_URL}/auth/register`, values, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 201 || response.status === 200) {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (err: any) {
        console.error("Registration error:", err);
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message || "Registration failed");
        } else {
          toast.error("Network error. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-[#fff9f7] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 w-full max-w-md border border-black/10">
        {/* Logo */}
        <div className="text-center mb-8">
          <img src={assets.logo || assets.hero} alt="Enoralifestyle Spa" className="w-24 mx-auto rounded-full" />
          <h1 className="text-3xl font-bold mt-4">
            Create Account
          </h1>
          <p className="text-gray-600 text-sm mt-2">Join the glow revolution</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 rounded-xl border ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
              placeholder="Choose a username"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 rounded-xl border ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
              placeholder="you@example.com"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-xl border ${
                  formik.touched.password_confirmation && formik.errors.password_confirmation
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.password_confirmation}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="w-full py-4 bg-[var(--primary-color)] hover:bg-[#b23a8a] text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
          >
            {formik.isSubmitting ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--primary-color)] font-bold hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;