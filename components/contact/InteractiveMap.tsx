"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Phone, Clock, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"

const locations = [
  {
    id: 1,
    name: "Silver Springs Downtown",
    address: "123 Silver Springs Lane, Downtown District, 12345",
    phone: "(555) 123-4567",
    coordinates: [40.7128, -74.006], // NYC coordinates for demo
    hours: "Mon-Fri: 9AM-5PM",
    description: "Our flagship location in the heart of downtown",
  },
  {
    id: 2,
    name: "Silver Springs Lakeside",
    address: "456 Silver Springs Circle, Lakeside Community, 12346",
    phone: "(555) 123-4568",
    coordinates: [40.7589, -73.9851], // Central Park coordinates for demo
    hours: "Mon-Fri: 9AM-5PM",
    description: "Peaceful lakeside setting with beautiful views",
  },
]

export default function InteractiveMap() {
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [markers, setMarkers] = useState<any[]>([])

  useEffect(() => {
    // Dynamically load Leaflet
    const loadLeaflet = async () => {
      if (typeof window !== "undefined") {
        // Load Leaflet CSS
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)

        // Load Leaflet JS
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.onload = () => {
          initializeMap()
        }
        document.head.appendChild(script)
      }
    }

    const initializeMap = () => {
      if (typeof window !== "undefined" && (window as any).L) {
        const L = (window as any).L

        // Initialize map
        const mapInstance = L.map("map").setView(selectedLocation.coordinates, 13)

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance)

        // Add markers for all locations
        const newMarkers = locations.map((location) => {
          const marker = L.marker(location.coordinates).addTo(mapInstance)

          const popupContent = `
            <div class="p-3">
              <h3 class="font-bold text-lg mb-2">${location.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${location.address}</p>
              <p class="text-sm text-gray-600 mb-2">${location.phone}</p>
              <p class="text-sm text-gray-600 mb-3">${location.hours}</p>
              <button onclick="window.open('https://maps.google.com/?q=${encodeURIComponent(location.address)}', '_blank')" 
                      class="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">
                Get Directions
              </button>
            </div>
          `

          marker.bindPopup(popupContent)

          return { marker, location }
        })

        setMarkers(newMarkers)
        setMap(mapInstance)
        setMapLoaded(true)

        // Open popup for selected location
        const selectedMarker = newMarkers.find((m) => m.location.id === selectedLocation.id)
        if (selectedMarker) {
          selectedMarker.marker.openPopup()
        }
      }
    }

    loadLeaflet()

    return () => {
      // Cleanup
      if (map) {
        map.remove()
      }
    }
  }, [])

  useEffect(() => {
    if (map && mapLoaded) {
      // Center map on selected location
      map.setView(selectedLocation.coordinates, 15)

      // Open popup for selected location
      const selectedMarker = markers.find((m) => m.location.id === selectedLocation.id)
      if (selectedMarker) {
        selectedMarker.marker.openPopup()
      }
    }
  }, [selectedLocation, map, mapLoaded, markers])

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Location Selector */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Location</h2>

            <div className="space-y-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedLocation.id === location.id
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <div className="flex items-start space-x-3">
                    <MapPin
                      className={`w-5 h-5 mt-1 ${
                        selectedLocation.id === location.id ? "text-green-600" : "text-gray-400"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{location.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{location.address}</p>
                      <p className="text-sm text-gray-500">{location.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Location Details */}
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedLocation.name}</h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{selectedLocation.address}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-green-600" />
                  <a href={`tel:${selectedLocation.phone}`} className="text-sm text-gray-700 hover:text-green-600">
                    {selectedLocation.phone}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-700">{selectedLocation.hours}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() =>
                    window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedLocation.address)}`, "_blank")
                  }
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                  onClick={() => window.open(`tel:${selectedLocation.phone}`)}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Location
                </Button>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div
                id="map"
                className="w-full h-96 lg:h-[600px] rounded-lg border border-gray-200"
                style={{ minHeight: "400px" }}
              ></div>

              {!mapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <Loader className="w-8 h-8 text-green-600 animate-spin mx-auto mb-2" />
                    <p className="text-gray-600">Loading map...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Driving Directions */}
            <div className="mt-6 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Driving Directions to {selectedLocation.name}
              </h3>

              <div className="space-y-3 text-sm text-gray-700">
                {selectedLocation.id === 1 ? (
                  <>
                    <p>
                      <strong>From North:</strong> Take I-95 South to Exit 15 (Silver Springs Lane). Turn right and
                      continue for 0.5 miles.
                    </p>
                    <p>
                      <strong>From South:</strong> Take I-95 North to Exit 15 (Silver Springs Lane). Turn left and
                      continue for 0.5 miles.
                    </p>
                    <p>
                      <strong>From East:</strong> Take Route 101 West to Silver Springs Lane. Turn left and continue for
                      0.3 miles.
                    </p>
                    <p>
                      <strong>Parking:</strong> Free parking available in our main lot and covered garage.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>From Downtown:</strong> Take Route 45 North for 3 miles to Lakeside Drive. Turn right and
                      continue for 1 mile.
                    </p>
                    <p>
                      <strong>From Highway:</strong> Take Exit 22 (Lakeside Drive) and head east for 2 miles.
                    </p>
                    <p>
                      <strong>From Airport:</strong> Take Airport Boulevard to Route 45 North, then follow signs to
                      Lakeside Drive.
                    </p>
                    <p>
                      <strong>Parking:</strong> Ample parking with covered options available near the main entrance.
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
