import Image from "next/image";
import { Check } from "lucide-react";

export default function Facilities() {
  const homes = [
    {
      name: "Maple House",
      features: [
        "6 private bedrooms with en-suite bathrooms",
        "Spacious common living areas",
        "Wheelchair accessible throughout",
        "Beautiful garden and patio area",
        "Modern safety features",
        "Home-cooked meals prepared on-site",
      ],
      image: "/senior-care-home-exterior.png",
    },
    {
      name: "Willow House",
      features: [
        "6 private bedrooms with en-suite bathrooms",
        "Cozy fireplace gathering area",
        "Accessible walk-in showers",
        "Covered porch and garden space",
        "24/7 monitoring systems",
        "Family-style dining room",
      ],
      image: "/senior-care-interior.png",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
            Our Residential Homes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Silver Springs Residency features two beautiful residential homes,
            each designed to provide comfort, safety, and a warm environment for
            our residents.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {homes.map((home, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={home.image || "/placeholder.svg"}
                  alt={home.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {home.name}
                </h3>
                <ul className="space-y-3">
                  {home.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check
                        size={20}
                        className="text-green-600 mr-2 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
