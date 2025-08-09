'use client'

import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'

export default function FAQs() {
  const faqs = [
    {
      question: "What levels of care do you provide?",
      answer: "We provide personalized care for seniors who need assistance with activities of daily living, medication management, and general supervision. Our homes are ideal for those who need more support than independent living but don't require the intensive medical care of a nursing home."
    },
    {
      question: "How do you determine the care each resident needs?",
      answer: "We conduct a comprehensive assessment before move-in to understand each resident's physical, emotional, and cognitive needs. This assessment helps us create an individualized care plan that is regularly reviewed and updated as needs change."
    },
    {
      question: "What is the staff-to-resident ratio?",
      answer: "With just 6 residents per home, we maintain an excellent staff-to-resident ratio that exceeds industry standards. This allows us to provide more personalized attention and quicker response times than larger facilities."
    },
    {
      question: "What training do your caregivers receive?",
      answer: "All of our caregivers are certified nursing assistants or have equivalent training. They receive ongoing education in areas such as dementia care, fall prevention, and emergency response. Each staff member is also trained in our person-centered care philosophy."
    },
    {
      question: "Do you accept long-term care insurance?",
      answer: "Yes, we work with most long-term care insurance providers. We can help you understand your policy and benefits as they apply to our services."
    },
    {
      question: "How do you handle medical emergencies?",
      answer: "Our staff is trained in emergency response procedures and CPR. We have 24/7 monitoring systems in place, and we maintain close relationships with local emergency services to ensure quick response times when needed."
    }
  ]
  
  const [openItems, setOpenItems] = useState<string[]>(['item-0'])
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our assisted living homes and services.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
