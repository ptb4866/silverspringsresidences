import { Heart, Users, Clock, Shield } from 'lucide-react'

export default function CarePhilosophy() {
  const philosophies = [
    {
      icon: <Heart className="h-12 w-12 text-green-600" />,
      title: "Person-Centered Care",
      description: "We recognize each resident as an individual with unique needs and preferences, tailoring our care approach accordingly."
    },
    {
      icon: <Users className="h-12 w-12 text-green-600" />,
      title: "Family Involvement",
      description: "We encourage family participation and maintain open communication to ensure residents' needs and wishes are honored."
    },
    {
      icon: <Clock className="h-12 w-12 text-green-600" />,
      title: "24/7 Compassionate Support",
      description: "Our professional care team is available around the clock to provide assistance whenever needed."
    },
    {
      icon: <Shield className="h-12 w-12 text-green-600" />,
      title: "Dignity & Respect",
      description: "We are committed to preserving each resident's dignity and independence while providing necessary support."
    }
  ]
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
            Our Care Philosophy
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            At Silver Springs Residency, our approach to care is guided by these core principles
            that ensure every resident receives exceptional, dignified support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {philosophies.map((item, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-gray-50">
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
