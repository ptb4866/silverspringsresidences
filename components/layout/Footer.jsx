import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Clock,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Logo and About */}
          <div>
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center">
                <Image
                  src="/placeholder-jjz05.png"
                  alt="Silver Springs Residency"
                  width={60}
                  height={60}
                  className="mr-2"
                />
                <div className="text-white">
                  <div className="text-lg font-bold leading-none">
                    Silver Springs
                  </div>
                  <div className="text-sm uppercase tracking-wider">
                    Residency
                  </div>
                </div>
              </div>
            </Link>
            <p className="text-gray-300 mb-6">
              Providing luxury assisted living care in two beautiful
              single-family homes, each with 6 bedrooms designed for senior
              comfort and wellbeing.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <nav className="flex flex-col space-y-3">
              <Link
                href="/assisted-living"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Assisted Living
              </Link>
              <Link
                href="/photo-gallery"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Photo Gallery
              </Link>
              <Link
                href="/floor-plans"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Floor Plans
              </Link>
              <Link
                href="/services-and-amenities"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Services & Amenities
              </Link>
              <Link
                href="/blog"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Blog
              </Link>
              <Link
                href="/contact-us"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/schedule-a-tour"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Schedule a Tour
              </Link>
            </nav>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-3 text-green-500 mt-1 flex-shrink-0"
                />
                <p className="text-gray-300">
                  123 Silver Springs Lane
                  <br />
                  Silver City, TX 12345
                </p>
              </div>
              <div className="flex items-center">
                <Phone
                  size={20}
                  className="mr-3 text-green-500 flex-shrink-0"
                />
                <a
                  href="tel:+15551234567"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center">
                <Mail size={20} className="mr-3 text-green-500 flex-shrink-0" />
                <a
                  href="mailto:info@silversprings.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@silversprings.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4 - Hours */}
          <div>
            <h3 className="text-lg font-bold mb-6">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Clock
                  size={20}
                  className="mr-3 text-green-500 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300">
                    <span className="block font-medium">Hours:</span>
                    Monday - Friday: 8AM - 7PM
                    <br />
                    Saturday - Sunday: 10AM - 4PM
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <Link
                  href="/schedule-a-tour"
                  className="inline-block px-6 py-2 bg-[#A7A936] hover:bg-brand-dark rounded transition-colors text-white font-medium"
                >
                  Schedule Your Visit
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Silver Springs Residency. All
              rights reserved.
            </p>
            <div className="flex space-x-4 text-sm text-gray-400">
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
