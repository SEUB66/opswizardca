import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/sections/Hero";
import { SectorMarquee } from "@/components/sections/SectorMarquee";
import { ProblemSaaS } from "@/components/sections/ProblemSaaS";
import { Features } from "@/components/sections/Features";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pricing } from "@/components/sections/Pricing";
import { Sectors } from "@/components/sections/Sectors";
import { TechStack } from "@/components/sections/TechStack";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <SiteLayout>
      <Hero />
      <SectorMarquee />
      <ProblemSaaS />
      <Features />
      <HowItWorks />
      <Pricing />
      <Sectors />
      <TechStack />
      <FAQ />
      <FinalCTA />
    </SiteLayout>
  );
}
