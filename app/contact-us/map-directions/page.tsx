import type { Metadata } from "next"
import MapDirectionsHero from "@/components/contact/MapDirectionsHero"
import InteractiveMap from "@/components/contact/InteractiveMap"
import ContactSection from "@/components/shared/ContactSection"

export const metadata: Metadata = {
  title: "Map & Directions | Silver Springs Residency",
  description:
    "Get directions to Silver Springs Residency locations. Interactive maps and detailed driving directions.",
}

export default function MapDirectionsPage() {
  return (
    <main>
      <MapDirectionsHero />
      <InteractiveMap />
      <ContactSection />
    </main>
  )
}
