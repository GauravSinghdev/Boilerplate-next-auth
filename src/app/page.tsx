import { HeroSection } from "@/components/HeroSection";
import Navbar from "./(main)/Navbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <div className="min-h-screen mx-10">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
}
