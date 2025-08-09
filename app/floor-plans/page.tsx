import FloorPlanHero from '@/components/floor-plans/FloorPlanHero'
import FloorPlanDisplay from '@/components/floor-plans/FloorPlanDisplay'
import FloorPlanDetails from '@/components/floor-plans/FloorPlanDetails'
import ContactSection from '@/components/shared/ContactSection'

export default function FloorPlans() {
  return (
    <div className="pb-12">
      <FloorPlanHero />
      <FloorPlanDisplay />
      <FloorPlanDetails />
      <ContactSection />
    </div>
  )
}
