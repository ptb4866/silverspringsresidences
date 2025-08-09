import type { Metadata } from "next"
import LocationsHero from "@/components/contact/LocationsHero"
import LocationsList from "@/components/contact/LocationsList"
import ContactSection from "@/components/shared/ContactSection"

export const metadata: Metadata = {
  title: "Our Locations | Silver Springs Residency",
  description:
    "Find Silver Springs Residency locations near you. We have multiple communities offering exceptional senior living services.",
}

export default function LocationsPage() {
  return (
    <main>
      <LocationsHero />
      <LocationsList />
      <ContactSection />
    </main>
  )
}
