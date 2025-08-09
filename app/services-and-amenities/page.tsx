import ServicesHero from '@/components/services/ServicesHero'
import ServicesList from '@/components/services/ServicesList'
import AmenitiesList from '@/components/services/AmenitiesList'
import TestimonialsSlim from '@/components/shared/TestimonialsSlim'
import ContactSection from '@/components/shared/ContactSection'

export default function ServicesAndAmenities() {
  return (
    <div className="pb-12">
      <ServicesHero />
      <ServicesList />
      <AmenitiesList />
      <TestimonialsSlim />
      <ContactSection />
    </div>
  )
}
