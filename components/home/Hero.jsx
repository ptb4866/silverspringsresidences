"use client";

import Link from "next/link";
import { useTourModal } from "@/hooks/use-tour-modal";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const { openTourModal } = useTourModal();

  return (
    <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/luxury-senior-living-exterior.png')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4">
        <div className="mb-4">
          <p className="text-sm uppercase tracking-[0.2em] font-medium mb-2">
            SILVER SPRINGS RESIDENCY
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-8 leading-tight">
            Live Life Well
          </h1>
        </div>
        <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-100">
          Assisted living in a warm, comfortable home environment
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={openTourModal}
            size="lg"
            className="bg-[#A7A936] hover:bg-brand-dark"
          >
            Schedule a Tour
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="bg-transparent border-white text-white hover:bg-white hover:text-green-900"
          >
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
