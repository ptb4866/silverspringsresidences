import Image from 'next/image'

export default function AmenitiesList() {
  const amenityCategories = [
    {
      title: "Home Amenities",
      image: "/placeholder.svg?height=600&width=800",
      items: [
        "Private bedrooms with en-suite bathrooms",
        "Spacious common living areas",
        "Beautiful gardens and outdoor spaces",
        "Family-style dining room",
        "Modern, fully-equipped kitchen",
        "Laundry facilities",
        "Cable TV and WiFi throughout",
        "Accessibility features throughout",
        "Climate-controlled environment"
      ]
    },
    {
      title: "Lifestyle Amenities",
      image: "/placeholder.svg?height=600&width=800",
      items: [
        "Daily social activities and events",
        "Book and movie library",
        "Game and puzzle collection",
        "Gardening opportunities",
        "Regular outings to local attractions",
        "Holiday and birthday celebrations",
        "Visiting entertainment",
        "Religious service options",
        "Pet therapy visits"
      ]
    }
  ]
  
  return (
    <section className="py-16 bg-gray-50" id="amenities">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
            Community Amenities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Silver Springs Residency offers a variety of amenities designed to 
            enhance comfort, engagement, and overall quality of life.
          </p>
        </div>
        
        <div className="space-y-16">
          {amenityCategories.map((category, index) => (
            <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className={index % 2 === 0 ? "order-1 lg:order-1" : "order-1 lg:order-2"}>
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className={index % 2 === 0 ? "order-2 lg:order-2" : "order-2 lg:order-1"}>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">{category.title}</h3>
                <ul className="space-y-3">
                  {category.items.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-2"></div>
                      <span className="text-gray-700">{item}</span>
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
