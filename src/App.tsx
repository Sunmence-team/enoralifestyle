import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import { Toaster } from "sonner";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Overview from "./pages/dashboard/Overview";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Appointments from "./pages/dashboard/Appointments";
import BlogUpload from "./pages/dashboard/BlogUpload";
import Package from "./pages/dashboard/Package";
import BlogDetails from "./pages/BlogDetails";
import Packages from "./pages/Packages";
import BookAppointment from "./pages/BookAppointment";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";


const App: React.FC = () => {
  return (
    <>
      <Toaster />

      {/* Main route */}
      <Routes>


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout children={<Home />} />} />
        <Route path="/blog" element={<MainLayout children={<Blog />} />} />
         <Route path="/blog/:id" element={<MainLayout children={<BlogDetails />} />} />
        <Route path="/appointment" element={<MainLayout children={<BookAppointment />} />} />
        <Route path="/services" element={<MainLayout children={<Services />} />} />
        <Route path="/packages" element={<MainLayout children={<Packages />} />} />
      </Routes>

    </>
  );
};

export default App;
