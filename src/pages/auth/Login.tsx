// src/pages/auth/Login.tsx
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { toast } from "sonner";
import { assets } from "../../assets/assests";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: "", // this is email
      password: "",
    },
    validationSchema: Yup.object({
      login: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required").min(6, "Too short"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${API_URL}auth/login`, values, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("authToken", token); // optional: save token
          toast.success("Welcome back! Redirecting...");

          setTimeout(() => {
            navigate("/dashboard/overview"); // or dashboard
          }, 1500);
        }
      } catch (err: any) {
        console.error("Login error:", err);
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message || "Invalid email or password");
        } else {
          toast.error("Login failed. Please try again.");
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
          <img src={assets.logo || assets.hero} alt="Enoralifestyle Spa" className="w-12 mx-auto rounded-full" />
          <h1 className="text-3xl font-bold mt-4">Welcome Back</h1>
          <p className="text-gray-600 text-sm mt-2">Login to book your spa session</p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-800 font-medium mb-2">Email</label>
            <input
              type="email"
              name="login"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 rounded-xl border ${
                formik.touched.login && formik.errors.login
                  ? "border-red-500"
                  : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]`}
              placeholder="you@example.com"
            />
            {formik.touched.login && formik.errors.login && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.login}</p>
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

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="w-full py-4 bg-[var(--primary-color)] hover:bg-[#b23a8a] text-white font-bold rounded-xl transition-all duration-300 disabled:opacity-60 shadow-lg"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[var(--primary-color)] font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;