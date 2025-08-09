"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTourModal } from "@/hooks/use-tour-modal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openTourModal } = useTourModal();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Assisted Living", href: "/assisted-living" },
    { name: "Photo Gallery", href: "/photo-gallery" },
    { name: "Floor Plans", href: "/floor-plans" },
    {
      name: "Services and Amenities",
      href: "/services-and-amenities",
      dropdown: [
        {
          name: "Care Services",
          href: "/services-and-amenities#care-services",
        },
        {
          name: "Community Amenities",
          href: "/services-and-amenities#amenities",
        },
      ],
    },
    {
      name: "Contact Us",
      href: "/contact-us",
      dropdown: [
        { name: "Contact Information", href: "/contact-us" },
        { name: "Our Locations", href: "/contact-us/locations" },
        { name: "Map & Directions", href: "/contact-us/map-directions" },
      ],
    },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="container mx-auto px-8 py-2">
          <div className="flex items-center justify-between h-28 sm:h-32">
            {/* Logo */}
            <Link href="/" className="flex flex-col items-center py-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mr-4 sm:mr-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-2xl">
                    SS
                  </span>
                </div>
              </div>
              <div className="text-gray-800">
                <div className="text-base sm:text-lg font-bold leading-tight">
                  Silver Springs
                </div>
                <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">
                  Residency
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              {navItems.map((item) =>
                item.dropdown ? (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors text-sm xl:text-base">
                      {item.name} <ChevronDown size={16} className="ml-1" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.dropdown.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            href={subItem.href}
                            className="w-full cursor-pointer"
                          >
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "text-gray-700 hover:text-green-600 font-medium transition-colors text-sm xl:text-base",
                      pathname === item.href ? "text-green-600" : ""
                    )}
                  >
                    {item.name}
                  </Link>
                )
              )}
              <Button
                onClick={openTourModal}
                className="bg-green-600 hover:bg-green-700 text-white px-4 xl:px-6 py-2 rounded-md font-medium text-sm xl:text-base"
              >
                Schedule a Tour
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-3 max-h-96 overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block py-3 text-gray-700 font-medium hover:text-green-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-2 pb-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block py-2 text-gray-600 text-sm hover:text-green-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button
                onClick={() => {
                  openTourModal();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white mt-4 py-3"
              >
                Schedule a Tour
              </Button>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
