import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Home from "@/app/page";
import AssistedLiving from "@/app/assisted-living/page";
import PhotoGallery from "@/app/photo-gallery/page";
import FloorPlans from "@/app/floor-plans/page";
import ServicesAndAmenities from "@/app/services-and-amenities/page";
import ContactUs from "@/app/contact-us/page";
import LocationsPage from "@/app/contact-us/locations/page";
import MapDirectionsPage from "@/app/contact-us/map-directions/page";
import Blog from "@/app/blog/page";
import { useTourModal } from "@/hooks/use-tour-modal";

function ScheduleATourRoute() {
  const navigate = useNavigate();
  const { openTourModal } = useTourModal();

  useEffect(() => {
    openTourModal();
    navigate("/", { replace: true });
  }, [openTourModal, navigate]);

  return null;
}

export default function RoutesView() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/assisted-living" element={<AssistedLiving />} />
      <Route path="/photo-gallery" element={<PhotoGallery />} />
      <Route path="/floor-plans" element={<FloorPlans />} />
      <Route
        path="/services-and-amenities"
        element={<ServicesAndAmenities />}
      />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/contact-us/locations" element={<LocationsPage />} />
      <Route
        path="/contact-us/map-directions"
        element={<MapDirectionsPage />}
      />
      <Route path="/blog" element={<Blog />} />
      <Route path="/schedule-a-tour" element={<ScheduleATourRoute />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
