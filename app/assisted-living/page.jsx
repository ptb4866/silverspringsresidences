import AssistedLivingHero from "@/components/assisted-living/AssistedLivingHero";
import ServiceDescription from "@/components/assisted-living/ServiceDescription";
import Facilities from "@/components/assisted-living/Facilities";
import CarePhilosophy from "@/components/assisted-living/CarePhilosophy";
import Testimonials from "@/components/shared/Testimonials";
import FAQs from "@/components/assisted-living/FAQs";
import ContactSection from "@/components/shared/ContactSection";

export default function AssistedLiving() {
  return (
    <div className="pb-12">
      <AssistedLivingHero />
      <ServiceDescription />
      <Facilities />
      <CarePhilosophy />
      <Testimonials />
      <FAQs />
      <ContactSection />
    </div>
  );
}
