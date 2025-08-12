import {
  Heart,
  Clock,
  Utensils,
  PillIcon,
  Shield,
  Activity,
} from "lucide-react";

export default function ServicesList() {
  const services = [
    {
      icon: <Heart className="h-12 w-12 text-brand-primary" />,
      title: "Personalized Care Plans",
      description:
        "Customized care plans tailored to each resident's needs, regularly reviewed and updated as needs change.",
    },
    {
      icon: <PillIcon className="h-12 w-12 text-brand-primary" />,
      title: "Medication Management",
      description:
        "Professional oversight of all medications, including ordering, dispensing, and administration.",
    },
    {
      icon: <Utensils className="h-12 w-12 text-brand-primary" />,
      title: "Nutritious Meals & Snacks",
      description:
        "Home-cooked meals prepared on-site with attention to dietary needs and preferences.",
    },
    {
      icon: <Activity className="h-12 w-12 text-brand-primary" />,
      title: "Daily Activities",
      description:
        "Engaging social, physical, and recreational activities designed to enhance quality of life.",
    },
    {
      icon: <Clock className="h-12 w-12 text-brand-primary" />,
      title: "24/7 Care Staff",
      description:
        "Trained caregivers available around the clock to provide assistance whenever needed.",
    },
    {
      icon: <Shield className="h-12 w-12 text-brand-primary" />,
      title: "Safety & Security",
      description:
        "Comprehensive safety measures including emergency call systems and monitored entrances.",
    },
  ];

  return (
    <section className="py-16 bg-white" id="care-services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
            Our Care Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Silver Springs Residency provides comprehensive services to support
            each resident's physical, emotional, and social wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-800 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-brand-light rounded-lg border border-brand-light">
          <h3 className="text-xl font-bold mb-3 text-gray-800">
            Additional Services Available:
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-2"></div>
              <span>Assistance with activities of daily living</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-2"></div>
              <span>Coordination of medical appointments</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-2"></div>
              <span>Incontinence care</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-2"></div>
              <span>Mobility assistance</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-2"></div>
              <span>Transportation services</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-2"></div>
              <span>Wellness checks</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-2"></div>
              <span>Housekeeping and laundry</span>
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-brand-primary rounded-full mr-2"></div>
              <span>Care coordination with healthcare providers</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
