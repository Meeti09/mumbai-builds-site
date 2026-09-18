import SmoothScroll from "@/components/SmoothScroll";
import GlobalBackground from "@/components/GlobalBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import OverviewSection from "@/components/OverviewSection";
import TaxiScrollytelling from "@/components/TaxiScrollytelling";
import InsightPanel from "@/components/InsightPanel";
import TimelineSection from "@/components/TimelineSection";
import TracksSection from "@/components/TracksSection";
import FinaleSection from "@/components/FinaleSection";
import ValueSection from "@/components/ValueSection";
import PartnersSection from "@/components/PartnersSection";
import PeopleGrid from "@/components/PeopleGrid";
import SponsorsSection from "@/components/SponsorsSection";
import JourneySection from "@/components/JourneySection";
import OrganizersSection from "@/components/OrganizersSection";
import TeamSection from "@/components/TeamSection";
import FaqSection from "@/components/FaqSection";
import CommunitySection from "@/components/CommunitySection";
import Footer from "@/components/Footer";
import {
  eligibilityPanel,
  jury,
  mentors,
  prizePanel,
} from "@/content/site";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen">
        <GlobalBackground />
        <Navbar />
        <Hero />
        <OverviewSection />
        <TaxiScrollytelling />
        <InsightPanel {...eligibilityPanel} decorated compact />
        <InsightPanel {...prizePanel} />
        <TimelineSection />
        <TracksSection />
        <FinaleSection />
        <ValueSection />
        <PartnersSection />
        <PeopleGrid id="mentors" variant="mentor" {...mentors} />
        <PeopleGrid id="jury" variant="jury" {...jury} />
        <SponsorsSection />
        <JourneySection />
        <OrganizersSection />
        <TeamSection />
        <FaqSection />
        <CommunitySection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
