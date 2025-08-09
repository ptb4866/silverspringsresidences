import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TourModal from "@/components/tour/TourModal";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AppProvider } from "@/context/AppContext";
import { QueryProvider } from "@/components/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Silver Springs Residency - Luxury Assisted Living",
  description:
    "Silver Springs Residency provides exceptional assisted living care in two beautiful single-family homes, each with 6 bedrooms for seniors.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <QueryProvider>
            <AppProvider>
              <Header />
              <main>{children}</main>
              <Footer />
              <TourModal />
              <Toaster />
            </AppProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
