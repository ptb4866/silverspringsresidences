"use client";

import { useState, useEffect, useCallback } from "react";
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
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating, testimonials.length]);

  const prevTestimonial = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrent(
        (prev) => (prev - 1 + testimonials.length) % testimonials.length
      );
      setTimeout(() => setIsAnimating(false), 500);
    }
  }, [isAnimating, testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
  }, [nextTestimonial]);

  return (
    <section className="py-20 bg-brand-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Quote size={48} className="mx-auto mb-8 opacity-30" />

          <div className="relative h-64">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className={cn(
                  "absolute inset-0 transition-all duration-500",
                  idx === current
                    ? "opacity-100 translate-x-0"
                    : idx < current
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                )}
              >
                <p className="text-xl md:text-2xl italic mb-8 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex flex-col items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={60}
                    height={60}
                    className="rounded-full object-cover mb-3"
                  />
                  <p className="font-bold text-lg">{testimonial.author}</p>
                  <p className="text-brand-light">{testimonial.relation}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-brand-dark hover:bg-brand-primary transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrent(idx);
                      setTimeout(() => setIsAnimating(false), 500);
                    }
                  }}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    idx === current ? "bg-white w-4" : "bg-brand-secondary"
                  )}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-brand-dark hover:bg-brand-primary transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
