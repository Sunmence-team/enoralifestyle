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
      login: "",
      password: "",
      rememberMe: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      login: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Too short"),
      rememberMe: Yup.bool().required("Can only be true or false"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, values, {
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
    <div className="h-screen overflow-hidden bg-(--primary-color)/30 flex flex-row items-center justify-center">
      <div className="md:w-3/5 p-8 md:p-12 w-full space-y-10">
        <h3 className="font-[Raleway]! font-bold! text-4xl">Login</h3>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-800 font-[Raleway]! font-medium! mb-2">Email</label>
            <input
              type="email"
              name="login"
              value={formik.values.login}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 rounded-md border ${
                formik.touched.login && formik.errors.login
                  ? "border-red-500"
                  : "border-(--accent-color)"
              } focus:outline-none focus:ring-2 focus:ring-(--primary-color)`}
              placeholder="you@example.com"
            />
            {formik.touched.login && formik.errors.login && (
              <p className="text-red-500 text-xs mt-1">{formik.errors.login}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-800 font-[Raleway]! font-medium! mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-md border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-(--accent-color)"
                } focus:outline-none focus:ring-2 focus:ring-(--primary-color)`}
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

          <div className="flex items-center justify-between font-[Raleway]!">
            <div className="relative flex items-center gap-2">
            <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`rounded-md focus:outline-none accent-(--primary-color) size-4`}
              />
              <label htmlFor="rememberMe" className="block text-gray-800 font-[Raleway]! font-medium!">Remember me</label>
            </div>
            <Link to="/register" className="text-(--primary-color) font-bold font-[Raleway]!">Forgot Password?</Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="w-full py-4 bg-(--primary-color) hover:bg-[#b23a8a] font-[Raleway]! text-white font-bold rounded-md mt-3 transition-all duration-300 disabled:opacity-60 shadow-lg"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
      <div className="md:w-2/5 md:inline-flex hidden h-full relative">
        <img src={assets.login} alt="..." className="w-full h-full object-cover" />
        <div className="absolute inset-0 p-8 bg-black/50 flex flex-col justify-between">
          <div></div>
          <div className="border border-white bg-white/10 backdrop-blur-md rounded-xl lg:p-8 p-6">
            <h3 className="font-[Raleway]! font-extrabold! text-4xl text-white">Welcome Onboard, Admin</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
