"use client"
import { Phone, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTourModal } from "@/hooks/use-tour-modal"

export default function ContactSection() {
  const { openTourModal } = useTourModal()

  return (
    <section className="py-16 bg-green-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-light mb-6">Have Questions? We're Here to Help</h2>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
          Contact us today to learn more about our assisted living homes or to schedule a personal tour.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-10">
          <div className="flex items-center justify-center">
            <Phone size={24} className="mr-2" />
            <a href="tel:+15551234567" className="text-xl hover:underline">
              (555) 123-4567
            </a>
          </div>
          <div className="flex items-center justify-center">
            <Mail size={24} className="mr-2" />
            <a href="mailto:info@silversprings.com" className="text-xl hover:underline">
              info@silversprings.com
            </a>
          </div>
        </div>
        <Button onClick={openTourModal} size="lg" className="bg-white text-green-600 hover:bg-gray-100">
          Schedule a Tour
        </Button>
      </div>
    </section>
  )
}
