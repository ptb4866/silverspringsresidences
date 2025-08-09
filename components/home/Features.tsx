import Image from 'next/image'
import { Check } from 'lucide-react'

export default function Features() {
  const features = [
    {
      title: "Homelike Environment",
      description: "Our two residential homes provide a warm, familiar setting that feels just like home.",
      image: "/cozy-senior-living-room.png"
    },
    {
      title: "Personalized Care",
      description: "With just 6 bedrooms per home, our staff provides individualized attention to each resident.",
      image: "/caregiver-helping-senior.png"
    },
    {
      title: "Safe & Secure",
      description: "24/7 monitoring and assistance with carefully designed safety features throughout.",
      image: "/secure-senior-living.png"
    }
  ]
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-4">
            Why Choose Silver Springs Residency
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our residential approach to senior living offers unique benefits that larger facilities simply can't match.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg">
              <div className="relative h-64">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-center">
                      <Check size={18} className="text-green-600 mr-2" />
                      <span className="text-gray-600">Feature benefit {item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
