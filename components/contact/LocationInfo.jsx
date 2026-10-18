import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function LocationInfo() {
  return (
    <div id="locations">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Visit Our Home</h2>

      <div className="space-y-8">
        {/* Location 1 */}
        <div className="contact-location">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            Braverde House
          </h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <MapPin
                size={20}
                className="mr-3 text-green-600 mt-1 flex-shrink-0"
              />
              <p className="text-gray-700">
                32336 Parker Street
                <br />
                Menifee, CA 92584
              </p>
            </div>

            <div className="flex items-center">
              <Phone size={20} className="mr-3 text-green-600 flex-shrink-0" />
              <a
                href="tel:+19512460895"
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                (951) 246 0895
              </a>
            </div>

            <div className="flex items-center">
              <Mail size={20} className="mr-3 text-green-600 flex-shrink-0" />
              <a
                href="mailto:silverspringsresidence@gmail.com"
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                silverspringsresidence@gmail.com
              </a>
            </div>

            <div className="flex items-start">
              <Clock
                size={20}
                className="mr-3 text-green-600 mt-1 flex-shrink-0"
              />
              <div>
                <p className="text-gray-700">
                  <span className="font-medium">Tours available:</span>
                  <br />
                  Monday - Friday: 9AM - 5PM
                  <br />
                  Saturday - Sunday: 10AM - 3PM
                </p>
              </div>
            </div>
          </div>

          <iframe
            className="contact-map"
            title="Braverde House location — 32336 Parker Street, Menifee, CA 92584"
            src="https://maps.google.com/maps?q=32336%20Parker%20Street%2C%20Menifee%2C%20CA%2092584&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <a className="editorial-link" href="https://www.google.com/maps/dir/?api=1&destination=32336%20Parker%20Street%2C%20Menifee%2C%20CA%2092584" target="_blank" rel="noopener noreferrer">Get Directions</a>
        </div>
      </div>
    </div>
  );
}
