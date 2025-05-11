import FAQsFour from "@/components/landing/faq";
import FeaturesSection from "@/components/landing/features";
import HeroSection from "@/components/landing/hero";
import IntegrationsSection from "@/components/landing/integration";

export default function Home() {
  return (
    <div> 
      <HeroSection/>
      <FeaturesSection/>
      <FAQsFour/>
      <IntegrationsSection/>
    </div>
  );
}
