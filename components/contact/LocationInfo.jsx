import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LocationInfo() {
  return (
    <div id="locations">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Locations</h2>

      <div className="space-y-8">
        {/* Location 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Maple House</h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <MapPin
                size={20}
                className="mr-3 text-green-600 mt-1 flex-shrink-0"
              />
              <p className="text-gray-700">
                123 Silver Springs Lane
                <br />
                Silver City, TX 12345
              </p>
            </div>

            <div className="flex items-center">
              <Phone size={20} className="mr-3 text-green-600 flex-shrink-0" />
              <a
                href="tel:+15551234567"
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                (555) 123-4567
              </a>
            </div>

            <div className="flex items-center">
              <Mail size={20} className="mr-3 text-green-600 flex-shrink-0" />
              <a
                href="mailto:maple@silversprings.com"
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                maple@silversprings.com
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

          <div className="bg-gray-100 h-[200px] flex items-center justify-center mb-4 rounded">
            <p className="text-gray-500">Map Embed Would Go Here</p>
          </div>

          <Button asChild className="w-full bg-green-700 hover:bg-green-800">
            <Link href="/schedule-a-tour">Schedule a Tour</Link>
          </Button>
        </div>

        {/* Location 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Willow House</h3>

          <div className="space-y-4 mb-6">
            <div className="flex items-start">
              <MapPin
                size={20}
                className="mr-3 text-green-600 mt-1 flex-shrink-0"
              />
              <p className="text-gray-700">
                456 Silver Springs Circle
                <br />
                Silver City, TX 12345
              </p>
            </div>

            <div className="flex items-center">
              <Phone size={20} className="mr-3 text-green-600 flex-shrink-0" />
              <a
                href="tel:+15557654321"
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                (555) 765-4321
              </a>
            </div>

            <div className="flex items-center">
              <Mail size={20} className="mr-3 text-green-600 flex-shrink-0" />
              <a
                href="mailto:willow@silversprings.com"
                className="text-gray-700 hover:text-green-700 transition-colors"
              >
                willow@silversprings.com
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

          <div className="bg-gray-100 h-[200px] flex items-center justify-center mb-4 rounded">
            <p className="text-gray-500">Map Embed Would Go Here</p>
          </div>

          <Button asChild className="w-full bg-green-700 hover:bg-green-800">
            <Link href="/schedule-a-tour">Schedule a Tour</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
