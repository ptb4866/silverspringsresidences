"use client";

import { MapPin, Phone, Clock, Car, Bus, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTourModal } from "@/hooks/use-tour-modal";

const locations = [
  {
    id: 1,
    name: "Braverde House",
    address: "32336 Parker Street",
    city: "Menifee",
    zipCode: "92584",
    phone: "(951) 246-0108",
    email: "silverspringsresidence@gmail.com",
    hours: { weekdays: "9:00 AM - 5:00 PM", weekends: "By Appointment" },
    amenities: [
      "Memory Care Unit",
      "Physical Therapy",
      "Dining Room",
      "Activity Center",
      "Garden Courtyard",
      "24/7 Nursing Care",
    ],
    transportation: {
      driving: "Easy access from Highway 101, Exit 15",
      parking: "Free parking available on-site",
      publicTransit: "Bus routes 12, 15, and 22 stop nearby",
      airport: "15 minutes from Downtown Airport",
    },
  },
  // {
  //   id: 2,
  //   name: "Silver Springs Lakeside",
  //   address: "456 Silver Springs Circle",
  //   city: "Lakeside Community",
  //   zipCode: "12346",
  //   phone: "(555) 123-4568",
  //   email: "lakeside@silversprings.com",
  //   hours: { weekdays: "9:00 AM - 5:00 PM", weekends: "By Appointment" },
  //   amenities: [
  //     "Lakefront Views",
  //     "Wellness Center",
  //     "Library",
  //     "Art Studio",
  //     "Walking Trails",
  //     "24/7 Nursing Care",
  //   ],
  //   transportation: {
  //     driving: "Take Route 45 to Lakeside Drive",
  //     parking: "Ample parking with covered options",
  //     publicTransit: "Lakeside Express Bus Service",
  //     airport: "20 minutes from Regional Airport",
  //   },
  // },
];

export default function LocationsList() {
  const { openTourModal } = useTourModal();
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {locations.map((location, index) => (
            <div
              key={location.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="bg-gray-50 rounded-2xl p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    {location.name}
                  </h2>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900 font-medium">
                          {location.address}
                        </p>
                        <p className="text-gray-600">
                          {location.city}, {location.zipCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <a
                        href={`tel:${location.phone}`}
                        className="text-gray-900 hover:text-green-600 transition-colors"
                      >
                        {location.phone}
                      </a>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-900">
                          Monday - Friday: {location.hours.weekdays}
                        </p>
                        <p className="text-gray-600">
                          Weekends: {location.hours.weekends}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Key Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {location.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">
                            {amenity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    onClick={openTourModal}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-semibold"
                  >
                    Schedule Tour at {location.name}
                  </Button>
                </div>
              </div>
              <div
                className={
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Getting Here
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Driving
                        </h4>
                        <p className="text-gray-600 text-sm mb-1">
                          {location.transportation.driving}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {location.transportation.parking}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bus className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Public Transit
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {location.transportation.publicTransit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Plane className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          Airport Access
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {location.transportation.airport}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                      onClick={() =>
                        window.open(
                          `https://maps.google.com/?q=${encodeURIComponent(
                            location.address + ", " + location.city
                          )}`,
                          "_blank"
                        )
                      }
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
