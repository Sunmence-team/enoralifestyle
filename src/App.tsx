import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";

import { Toaster } from "sonner";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Overview from "./pages/dashboard/Overview";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Appointments from "./pages/dashboard/Appointments";
import BlogUpload from "./pages/dashboard/BlogUpload";
import Package from "./pages/dashboard/Package";
import Packages from "./pages/Packages";
import BlogDetails from "./pages/BlogDetails";


const App: React.FC = () => {
  return (
    <>
      <Toaster />

      {/* Main route */}
      <Routes>
        <Route path="/" element={<MainLayout children={<Home />} />} />
        <Route path="/blog" element={<MainLayout children={<Blog />} />} />
        <Route path="/blog/:id" element={<MainLayout children={<BlogDetails />} />} />
        <Route path="/appointment" element={<MainLayout children={<BookAppointment />} />} />
        <Route path="/services" element={<MainLayout children={<Services />} />} />
        <Route path="/packages" element={<MainLayout children={<Packages />} />} />
        <Route path="/contact" element={<MainLayout children={<Contact />} />} />

        {/* Dashboard Route */}
        <Route path="/dashboard/overview" element={<DashboardLayout children={<Overview />} />} />
        <Route path="/dashboard/appointments" element={<DashboardLayout children={<Appointments />} />} />
        <Route path="/dashboard/blogUpload" element={<DashboardLayout children={<BlogUpload/>} />} />
        <Route path="/dashboard/package" element={<DashboardLayout children={<Package /> } />} />
      </Routes>

    </>
  );
};

export default App;
