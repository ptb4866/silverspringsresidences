import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TourModal from "@/components/tour/TourModal";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/context/AppContext";
import { QueryProvider } from "@/components/QueryProvider";
import RoutesView from "./router";

export default function Root() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryProvider>
        <AppProvider>
          <Header />
          <main>
            <RoutesView />
          </main>
          <Footer />
          <TourModal />
          <Toaster />
        </AppProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
