"use client";

import { Navigation, MapPin, Clock } from "lucide-react";

export default function MapDirectionsHero() {
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Map & <span className="text-green-600">Directions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find your way to Silver Springs Residency with our interactive maps
            and detailed directions. We're conveniently located and easily
            accessible from major highways and public transportation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Navigation className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Easy Navigation
            </h3>
            <p className="text-gray-600">
              Interactive maps with turn-by-turn directions
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Multiple Locations
            </h3>
            <p className="text-gray-600">
              Choose the location most convenient for you
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Visit Anytime
            </h3>
            <p className="text-gray-600">
              Tours available Monday through Friday, 9AM-5PM
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
