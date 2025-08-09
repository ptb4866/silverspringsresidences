"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTourModal } from "@/hooks/use-tour-modal";

export default function Hero() {
  const { openTourModal } = useTourModal();

  return (
    <section className="relative bg-gradient-to-br from-green-50 to-blue-50 overflow-hidden">
      <div className="absolute inset-0 bg-white/40"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Exceptional Senior Living at{" "}
              <span className="text-green-600">Silver Springs</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed">
              Experience compassionate care, vibrant community living, and peace
              of mind in our beautiful assisted living residences. Your comfort
              and well-being are our top priorities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                onClick={openTourModal}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Schedule a Tour
              </Button>

              <Link href="/assisted-living">
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 bg-transparent"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    24/7
                  </div>
                  <div className="text-sm text-gray-600">Care Available</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    50+
                  </div>
                  <div className="text-sm text-gray-600">
                    Activities Monthly
                  </div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-green-600">
                    15+
                  </div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/luxury-senior-living-exterior.png"
                alt="Silver Springs Residency - Beautiful senior living community exterior"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />

              {/* Overlay Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Silver Springs Residency
                    </h3>
                    <p className="text-sm text-gray-600">
                      Luxury Senior Living Community
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-green-100 rounded-full opacity-60"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
