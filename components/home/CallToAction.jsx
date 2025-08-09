"use client";

import Link from "next/link";
import { useTourModal } from "@/hooks/use-tour-modal";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  const { openTourModal } = useTourModal();

  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-6 text-gray-700">
          Experience the Silver Springs Difference
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          We invite you to visit our homes and see firsthand the warmth,
          comfort, and exceptional care we provide.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            onClick={openTourModal}
            size="lg"
            className="bg-green-600 hover:bg-green-700"
          >
            Schedule a Tour
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact-us">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
