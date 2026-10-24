import React, { lazy, Suspense } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Header from "../components/layout/EditorialHeader";

import Footer from "../components/layout/EditorialFooter";

import RouteScroll from "../components/layout/RouteScroll";

import { useTourModal } from "../hooks/use-tour-modal";

const TourModal = lazy(() => import("../components/tour/TourModal"));

import { ThemeProvider } from "../components/theme-provider";

import { Toaster } from "../components/ui/toaster";

import { AppProvider } from "../context/AppContext";

import { QueryProvider } from "../components/QueryProvider";

// Pages

import Home from "../app/page";

const About = lazy(() => import("../app/about/page"));

const AssistedLiving = lazy(() => import("../app/assisted-living/page"));

const Blog = lazy(() => import("../app/blog/page"));

const BlogPost = lazy(() => import("../app/blog/[slug]/page"));

const ContactUs = lazy(() => import("../app/contact-us/page"));

const LocationsPage = lazy(() => import("../app/contact-us/locations/page"));

const MapDirectionsPage = lazy(
  () => import("../app/contact-us/map-directions/page"),
);

const FloorPlans = lazy(() => import("../app/floor-plans/page"));

const PhotoGallery = lazy(() => import("../app/photo-gallery/page"));

const ServicesAndAmenities = lazy(
  () => import("../app/services-and-amenities/page"),
);

const ScheduleATourPage = lazy(() => import("../app/schedule-a-tour/page"));

function TourDialog() {
  const { isOpen } = useTourModal();

  return isOpen ? (
    <Suspense
      fallback={
        <div
          role="status"
          className="fixed bottom-4 right-4 z-50 bg-white p-4 shadow"
        >
          Opening your tour request…
        </div>
      }
    >
      <TourModal />
    </Suspense>
  ) : null;
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light">
      <QueryProvider>
        <AppProvider>
          <Header />

          <main id="main-content" tabIndex={-1}>
            <Suspense
              fallback={
                <div role="status" className="site-container section-space">
                  Loading…
                </div>
              }
            >
              <RouteScroll />

              <Routes>
                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/assisted-living" element={<AssistedLiving />} />

                <Route path="/blog" element={<Blog />} />

                <Route path="/blog/:slug" element={<BlogPost />} />

                <Route path="/contact-us" element={<ContactUs />} />

                <Route
                  path="/contact-us/locations"
                  element={<LocationsPage />}
                />

                <Route
                  path="/contact-us/map-directions"

                  element={<MapDirectionsPage />}
                />

                <Route path="/floor-plans" element={<FloorPlans />} />

                <Route path="/photo-gallery" element={<PhotoGallery />} />

                <Route
                  path="/schedule-a-tour"
                  element={<ScheduleATourPage />}
                />

                <Route
                  path="/services-and-amenities"

                  element={<ServicesAndAmenities />}
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />

          <TourDialog />

          <Toaster />
        </AppProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
