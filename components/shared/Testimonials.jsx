"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Moving my mother to Silver Springs was the best decision. The home environment is so much more comfortable than a large facility, and the care is exceptional.",
      author: "Margaret W.",
      relation: "Daughter of Resident",
      image: "/senior-woman-portrait.png",
    },
    {
      quote:
        "I was hesitant about moving from my home, but Silver Springs has become my new home. I've made friends and the staff treats me like family.",
      author: "Robert J.",
      relation: "Resident",
      image: "/senior-man-portrait.png",
    },
    {
      quote:
        "The personalized attention my father receives is remarkable. His specific needs are always addressed quickly and with compassion.",
      author: "Thomas B.",
      relation: "Son of Resident",
      image: "/middle-aged-man-portrait.png",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
            What Families Are Saying
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-lg shadow-md flex flex-col"
            >
              <Quote size={36} className="text-green-200 mb-4" />
              <p className="text-gray-700 italic mb-6 flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.author}
                  width={50}
                  height={50}
                  className="rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-bold text-gray-800">
                    {testimonial.author}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonial.relation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
