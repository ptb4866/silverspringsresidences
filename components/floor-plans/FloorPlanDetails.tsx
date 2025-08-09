import Image from 'next/image'
import { Check } from 'lucide-react'

export default function FloorPlanDetails() {
  const roomFeatures = [
    "Private bedroom with ample space for personal furniture",
    "En-suite bathroom with walk-in shower and safety features",
    "Individual climate control",
    "Cable TV and WiFi access",
    "Emergency call system",
    "Large windows for natural light"
  ]
  
  const commonFeatures = [
    "Spacious living room with fireplace",
    "Family-style dining area",
    "Modern, fully-equipped kitchen",
    "Covered porch and outdoor seating areas",
    "Beautiful landscaped gardens",
    "Laundry facilities",
    "Accessibility features throughout"
  ]
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Room Features */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Private Room Features</h3>
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Private Room"
                  fill
                  className="object-cover"
                />
              </div>
              <ul className="space-y-3">
                {roomFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-600">
                Each private room can be personalized with your own furniture and decorations 
                to create a familiar, comfortable space.
              </p>
            </div>
          </div>
          
          {/* Common Area Features */}
          <div>
            <div className="bg-white p-8 rounded-lg shadow-md h-full">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Common Area Features</h3>
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Common Area"
                  fill
                  className="object-cover"
                />
              </div>
              <ul className="space-y-3">
                {commonFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-600">
                Our shared spaces are designed to foster community while ensuring comfort 
                and accessibility for all residents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
