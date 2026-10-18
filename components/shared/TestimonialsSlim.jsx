"use client";

import { useState } from "react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TestimonialsSlim() {
  const testimonials = [
    {
      quote:
        "Moving my mother to Silver Springs was the best decision. The home environment is so much more comfortable than a large facility.",
      author: "Margaret W.",
    },
    {
      quote:
        "I was hesitant about moving from my home, but Silver Springs has become my new home. I've made friends and the staff treats me like family.",
      author: "Robert J.",
    },
    {
      quote:
        "The personalized attention my father receives is remarkable. His specific needs are always addressed quickly and with compassion.",
      author: "Thomas B.",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <section className="py-12 bg-brand-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Quote size={36} className="mx-auto mb-6 opacity-30" />

          <div className="relative min-h-32">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={cn(idx === current ? "block" : "hidden")}
              >
                <p className="text-lg md:text-xl italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className="font-bold">— {testimonial.author}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className="w-11 h-11 flex items-center justify-center"
                aria-pressed={idx === current}
                aria-label={`Go to testimonial ${idx + 1}`}
              >
                <span
                  className={cn(
                    "h-2 rounded-full",
                    idx === current ? "bg-white w-4" : "bg-white/50 w-2",
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
