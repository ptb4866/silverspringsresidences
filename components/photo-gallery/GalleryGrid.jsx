"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

export default function GalleryGrid() {
  const categories = [
    "All",
    "Maple House",
    "Willow House",
    "Bedrooms",
    "Common Areas",
    "Dining",
    "Gardens",
  ];

  const photos = [
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Exterior view of Silver Springs Residency",
      category: "Maple House",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Comfortable common area with fireplace",
      category: "Common Areas",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Private bedroom with en-suite bathroom",
      category: "Bedrooms",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Family-style dining room",
      category: "Dining",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Landscaped garden and patio area",
      category: "Gardens",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Exterior view of Willow House",
      category: "Willow House",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Activity and game room",
      category: "Common Areas",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Another bedroom layout option",
      category: "Bedrooms",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Fully equipped kitchen",
      category: "Dining",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Enclosed courtyard with seating",
      category: "Gardens",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Welcoming entrance and foyer",
      category: "Maple House",
    },
    {
      src: "/placeholder.svg?height=600&width=800",
      alt: "Accessible bathroom with walk-in shower",
      category: "Bedrooms",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredPhotos =
    activeCategory === "All"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedImage(photo.src)}
            >
              <div className="relative h-64 md:h-80">
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-700">{photo.alt}</p>
                <p className="text-sm text-gray-500">{photo.category}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Image Modal */}
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-5xl p-0 overflow-hidden bg-transparent border-none">
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full z-10"
              >
                <X size={24} />
              </button>
              {selectedImage && (
                <div className="relative h-[80vh] w-full">
                  <Image
                    src={selectedImage || "/placeholder.svg"}
                    alt="Enlarged view"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
