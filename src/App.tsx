import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import DashboardLayout from "./Layout/DashboardLayout";
import { Toaster } from "sonner";
import { delay } from "./utilities/delay";

// Pages
const Home = lazy(() => delay(import('./pages/Home')));
const Services = lazy(() => delay(import("./pages/Services")));
const Blog = lazy(() => delay(import("./pages/Blog")));
const BlogDetails = lazy(() => delay(import("./pages/BlogDetails")));
const Contact = lazy(() => delay(import("./pages/Contact")));
const Packages = lazy(() => delay(import("./pages/Packages")));
const Login = lazy(() => delay(import("./pages/auth/Login")));
const Register = lazy(() => delay(import("./pages/auth/Register")));

// Dashboard Pages
import Overview from "./pages/dashboard/Overview";
import BlogUpload from "./pages/dashboard/BlogUpload";
import Package from "./pages/dashboard/Package";
import Appointments from "./pages/dashboard/Appointments";
import Reservation from "./pages/Reservation";
import ManageContacts from "./pages/dashboard/ManageContacts";
import PaymentStatus from "./pages/PaymentStatus";
import UploadTestimonial from "./pages/dashboard/TestimonialUpload";
import Ebooks from "./pages/Ebooks";

// Utility Pages
import NotFound from "./pages/view/NotFound";
import Loader from "./pages/view/Loader";

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="*" element={<NotFound />} />
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
            path="/ebooks"
            element={<MainLayout children={<Ebooks />} />}
          />
        

          {/* Blog details route WITHOUT navbar */}
          <Route path="/blog/:id" element={<BlogDetails />} />

          {/* Dashboard routes */}
          <Route
            path="/dashboard/services"
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
          <Route path="/payment-status" element={<PaymentStatus />} />

        </Routes>
      </Suspense>
    </>
  );
};

export default App;
