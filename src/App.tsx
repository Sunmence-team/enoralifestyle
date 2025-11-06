import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layout/MainLayout";

import { Toaster } from "sonner";
import Home from "./pages/Home";
import Packages from "./pages/Packages";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

const App: React.FC = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<MainLayout children={<Home />} />} />
        <Route path="/blog" element={<MainLayout children={<Blog />} />} />
        <Route path="/services" element={<MainLayout children={<Services />} />} />
        <Route path="/packages" element={<MainLayout children={<Packages />} />} />
        <Route path="/contact" element={<MainLayout children={<Contact />} />} />
      </Routes>
    </>
  );
};

export default App;
