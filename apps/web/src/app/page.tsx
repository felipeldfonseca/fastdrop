import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import WhyFastDrop from "@/components/landing/WhyFastDrop";
import Pricing from "@/components/landing/Pricing";
import FAQ from "@/components/landing/FAQ";
import LandingPageWrapper from "@/components/landing/LandingPageWrapper";

export default function LandingPage() {
  return (
    <LandingPageWrapper>
      <Hero />
      <HowItWorks />
      <WhyFastDrop />
      <Pricing />
      <FAQ />
    </LandingPageWrapper>
  );
} 