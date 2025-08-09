import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import TourModal from "../components/tour/TourModal";
import { ThemeProvider } from "../components/theme-provider";
import { Toaster } from "../components/ui/toaster";
import { AppProvider } from "../context/AppContext";
import { QueryProvider } from "../components/QueryProvider";

// Pages
import Home from "../app/page";
import AssistedLiving from "../app/assisted-living/page";
import Blog from "../app/blog/page";
import ContactUs from "../app/contact-us/page";
import LocationsPage from "../app/contact-us/locations/page";
import MapDirectionsPage from "../app/contact-us/map-directions/page";
import FloorPlans from "../app/floor-plans/page";
import PhotoGallery from "../app/photo-gallery/page";
import ServicesAndAmenities from "../app/services-and-amenities/page";
import ScheduleATourPage from "../app/schedule-a-tour/page";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryProvider>
        <AppProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/assisted-living" element={<AssistedLiving />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/contact-us/locations" element={<LocationsPage />} />
              <Route
                path="/contact-us/map-directions"
                element={<MapDirectionsPage />}
              />
              <Route path="/floor-plans" element={<FloorPlans />} />
              <Route path="/photo-gallery" element={<PhotoGallery />} />
              <Route path="/schedule-a-tour" element={<ScheduleATourPage />} />
              <Route
                path="/services-and-amenities"
                element={<ServicesAndAmenities />}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <TourModal />
          <Toaster />
        </AppProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
