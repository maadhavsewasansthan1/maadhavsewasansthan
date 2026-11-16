import { HeroSection } from "@/components/home/HeroSection";
import { PillarsSection } from "@/components/sections/PillarsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { AreasOfWorkSection } from "@/components/home/AreasOfWorkSection";
import { FeaturedActivitiesSection } from "@/components/home/FeaturedActivitiesSection";
import { ImpactHighlightsSection } from "@/components/home/ImpactHighlightsSection";
import { LatestEventsSection } from "@/components/home/LatestEventsSection";
import { DonationCtaSection } from "@/components/home/DonationCtaSection";
import KolamDivider from "@/components/ui/motifs/KolamDivider";

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section: Word-by-word reveal, Kolam background, ticker */}
      <HeroSection />

      {/* 2. Our Four Pillars: Warli figures & color-coded craft pillars */}
      <PillarsSection />

      {/* 3. About the NGO: Grassroots story & arch photography */}
      <AboutSection />

      <KolamDivider className="text-border my-2" />

      {/* 4. About the Founder: Leadership profile with 4:5 portrait */}
      <FounderSection />

      {/* 5. Where We Direct Our Efforts: Numbered list with count-up */}
      <AreasOfWorkSection />

      <KolamDivider className="text-border my-2" />

      {/* 6. Featured Field Activities: Swipeable carousel on mobile */}
      <FeaturedActivitiesSection />

      {/* 7. "Our Impact": 3D Tilt Cards & Qualitative Pillars */}
      <ImpactHighlightsSection />

      {/* 8. Scheduled & Past Events: Swipeable cards & in-place details */}
      <LatestEventsSection />

      {/* 9. Support / Donate Section: Heart pulse & direct call */}
      <DonationCtaSection />
    </>
  );
}
