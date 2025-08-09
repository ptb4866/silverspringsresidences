'use client'

import { useState, useEffect, useCallback } from 'react'
import { Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function TestimonialsSlim() {
  const testimonials = [
    {
      quote: "Moving my mother to Silver Springs was the best decision. The home environment is so much more comfortable than a large facility.",
      author: "Margaret W."
    },
    {
      quote: "I was hesitant about moving from my home, but Silver Springs has become my new home. I've made friends and the staff treats me like family.",
      author: "Robert J."
    },
    {
      quote: "The personalized attention my father receives is remarkable. His specific needs are always addressed quickly and with compassion.",
      author: "Thomas B."
    }
  ]
  
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  
  const nextTestimonial = useCallback(() => {
    if (!isAnimating) {
      setIsAnimating(true)
      setCurrent((prev) => (prev + 1) % testimonials.length)
      setTimeout(() => setIsAnimating(false), 500)
    }
  }, [isAnimating, testimonials.length])
  
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial()
    }, 8000)
    
    return () => clearInterval(interval)
  }, [nextTestimonial])
  
  return (
    <section className="py-12 bg-green-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Quote size={36} className="mx-auto mb-6 opacity-30" />
          
          <div className="relative h-32">
            {testimonials.map((testimonial, idx) => (
              <div 
                key={idx}
                className={cn(
                  "absolute inset-0 transition-all duration-500",
                  idx === current ? "opacity-100 translate-x-0" : 
                  idx < current ? "opacity-0 -translate-x-full" : "opacity-0 translate-x-full"
                )}
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
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true)
                    setCurrent(idx)
                    setTimeout(() => setIsAnimating(false), 500)
                  }
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === current ? "bg-white w-4" : "bg-green-400"
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
