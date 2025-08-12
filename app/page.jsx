import Hero from "@/components/home/Hero";
import LuxuryLiving from "@/components/home/LuxuryLiving";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <LuxuryLiving />
      <Features />
      {/* <Testimonials /> */}
      <CallToAction />
    </>
  );
}
