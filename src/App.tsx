import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import { Toaster } from "sonner";

// Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Packages from "./pages/Packages";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Dashboard Pages
import Overview from "./pages/dashboard/Overview";
import BlogUpload from "./pages/dashboard/BlogUpload";
import Package from "./pages/dashboard/Package";
import Appointments from "./pages/dashboard/Appointments";
import Reservation from "./pages/Reservation";
import ManageContacts from "./pages/dashboard/ManageContacts";
import PaymentStatus from "./pages/PaymentStatus";
import UploadTestimonial from "./pages/dashboard/TestimonialUpload";

const App: React.FC = () => {
  return (
    <>
      <Toaster />

      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main routes with navbar */}
        <Route path="/" element={<MainLayout children={<Home />} />} />
        <Route path="/blog" element={<MainLayout children={<Blog />} />} />
        <Route
          path="/services"
          element={<MainLayout children={<Services />} />}
        />
        <Route
          path="/packages"
          element={<MainLayout children={<Packages />} />}
        />
        <Route
          path="/contact"
          element={<MainLayout children={<Contact />} />}
        />
        <Route
          path="/reservation"
          element={<MainLayout children={<Reservation />} />}
        />
        <Route
          path="/payment-status"
          element={<MainLayout children={<PaymentStatus />} />}
        />

        {/* Blog details route WITHOUT navbar */}
        <Route path="/blog/:id" element={<BlogDetails />} />

        {/* Dashboard routes */}
        <Route
          path="/dashboard/overview"
          element={<DashboardLayout children={<Overview />} />}
        />
        <Route
          path="/dashboard/appointments"
          element={<DashboardLayout children={<Appointments />} />}
        />
        <Route
          path="/dashboard/blogUpload"
          element={<DashboardLayout children={<BlogUpload />} />}
        />
        <Route
          path="/dashboard/package"
          element={<DashboardLayout children={<Package />} />}
        />
        <Route
          path="/dashboard/contacts"
          element={<DashboardLayout children={<ManageContacts />} />}
        />
        <Route
          path="/dashboard/testimonial"
          element={<DashboardLayout children={<UploadTestimonial />} />}
        />
      </Routes>
    </>
  );
};

export default App;
