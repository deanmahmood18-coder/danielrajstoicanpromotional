import ShootingStars from "@/components/ShootingStars";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Accolades from "@/components/Accolades";
import DanielSunnyHero from "@/components/DanielSunnyHero";
import HighlightReel from "@/components/HighlightReel";
import Management from "@/components/Management";
import PromotersPortal from "@/components/PromotersPortal";
import Newsletter from "@/components/Newsletter";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative bg-obsidian">
      <ShootingStars />
      <Navbar />
      <Hero />
      <Story />
      <Accolades />
      <DanielSunnyHero />
      <HighlightReel />
      <Management />
      <PromotersPortal />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
}
