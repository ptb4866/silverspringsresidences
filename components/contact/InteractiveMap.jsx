"use client";

import { useState, useEffect } from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";

import markerShadow from "leaflet/dist/images/marker-shadow.png";

import { MapPin, Navigation, Phone, Clock, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

const locations = [
  {
    id: 1,

    name: "Braverde House",

    address: "32336 Parker Street, Menifee, CA 92584",

    phone: "(951) 246 0895",

    coordinates: [33.6971, -117.1853], // Menifee, CA coordinates

    hours: "Mon-Fri: 9AM-5PM",

    description: "Our beautiful assisted living home in Menifee",
  },

  // {

  //   id: 2,

  //   name: "Silver Springs Lakeside",

  //   address: "456 Silver Springs Circle, Lakeside Community, 12346",

  //   phone: "(555) 123-4568",

  //   coordinates: [40.7589, -73.9851],

  //   hours: "Mon-Fri: 9AM-5PM",

  //   description: "Peaceful lakeside setting with beautiful views",

  // },
];

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const [mapLoaded, setMapLoaded] = useState(false);

  const [map, setMap] = useState(null);

  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const mapInstance = L.map("map").setView(locations[0].coordinates, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(mapInstance);

    const icon = L.icon({
      iconUrl: markerIcon,
      iconRetinaUrl: markerIcon2x,
      shadowUrl: markerShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const newMarkers = locations.map((location) => {
      const marker = L.marker(location.coordinates, {
        icon,
        title: location.name,
      }).addTo(mapInstance);

      const content = document.createElement("div");

      const title = document.createElement("h3");

      title.textContent = location.name;

      const address = document.createElement("p");

      address.textContent = location.address;

      const directions = document.createElement("a");

      directions.href = `https://maps.google.com/?q=${encodeURIComponent(location.address)}`;

      directions.target = "_blank";

      directions.rel = "noopener noreferrer";

      directions.textContent = "Get Directions";

      content.append(title, address, directions);

      marker.bindPopup(content);

      return { marker, location };
    });

    setMarkers(newMarkers);

    setMap(mapInstance);

    setMapLoaded(true);

    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (map && mapLoaded) {
      map.setView(selectedLocation.coordinates, 15);

      const selectedMarker = markers.find(
        (m) => m.location.id === selectedLocation.id,
      );

      if (selectedMarker) selectedMarker.marker.openPopup();
    }
  }, [selectedLocation, map, mapLoaded, markers]);

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Select Location
            </h2>

            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}

                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedLocation.id === location.id
                      ? "border-brand-primary bg-brand-light"
                      : "border-gray-200 hover:border-brand-secondary"
                  }`}

                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start space-x-3">
                    <MapPin
                      className={`w-5 h-5 mt-1 ${
                        selectedLocation.id === location.id
                          ? "text-brand-primary"
                          : "text-gray-400"
                      }`}
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {location.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-2">
                        {location.address}
                      </p>

                      <p className="text-sm text-gray-500">
                        {location.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {selectedLocation.name}
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-brand-primary" />

                  <span className="text-sm text-gray-700">
                    {selectedLocation.address}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-brand-primary" />

                  <a
                    href="tel:+19512460895"

                    className="text-sm text-gray-700 hover:text-brand-primary"
                  >
                    {selectedLocation.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-brand-primary" />

                  <span className="text-sm text-gray-700">
                    {selectedLocation.hours}
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  className="w-full bg-brand-primary hover:bg-brand-dark"

                  onClick={() =>
                    window.open(
                      `https://maps.google.com/?q=${encodeURIComponent(
                        selectedLocation.address,
                      )}`,

                      "_blank",
                    )
                  }
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>

                <Button
                  variant="outline"

                  className="w-full border-brand-primary text-brand-primary hover:bg-brand-light bg-transparent"

                  onClick={() => window.open("tel:+19512460895")}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Location
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="relative" style={{ zIndex: 1 }}>
              <div
                id="map"

                className="w-full h-96 lg:h-[600px] rounded-lg border border-gray-200"

                style={{ minHeight: "400px", zIndex: 1, position: "relative" }}
              ></div>

              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <Loader className="w-8 h-8 text-brand-primary animate-spin mx-auto mb-2" />

                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
