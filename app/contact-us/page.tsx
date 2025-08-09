import ContactHero from '@/components/contact/ContactHero'
import ContactForm from '@/components/contact/ContactForm'
import LocationInfo from '@/components/contact/LocationInfo'

export default function ContactUs() {
  return (
    <div className="pb-12">
      <ContactHero />
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ContactForm />
          <LocationInfo />
        </div>
      </div>
    </div>
  )
}
