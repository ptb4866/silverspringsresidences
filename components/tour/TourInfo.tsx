import Image from 'next/image'
import { Check, MapPin, Clock, Phone } from 'lucide-react'

export default function TourInfo() {
  const tourBenefits = [
    "See our comfortable, homelike environment firsthand",
    "Meet our caring, professional staff",
    "Learn about our personalized care approach",
    "View private rooms and common areas",
    "Discover our amenities and activities",
    "Get answers to all your questions"
  ]
  
  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">What to Expect During Your Tour</h3>
        
        <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="Tour Experience"
            fill
            className="object-cover"
          />
        </div>
        
        <ul className="space-y-3">
          {tourBenefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check size={20} className="text-green-600 mr-2 mt-1 flex-shrink-0" />
              <span className="text-gray-700">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-gray-50 p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Tour Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Clock size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Tour Hours:</span><br />
                Monday - Friday: 9AM - 5PM<br />
                Saturday - Sunday: 10AM - 3PM
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <MapPin size={20} className="text-green-600 mr-3 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium mb-1">Our Locations:</p>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Maple House:</span><br />
                123 Silver Springs Lane<br />
                Silver City, TX 12345
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Willow House:</span><br />
                456 Silver Springs Circle<br />
                Silver City, TX 12345
              </p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Phone size={20} className="text-green-600 mr-3 flex-shrink-0" />
            <div>
              <p className="font-medium">Questions? Call us:</p>
              <a href="tel:+15551234567" className="text-green-700 hover:text-green-800 transition-colors">
                (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
