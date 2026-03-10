import Nav from "@/components/nav";
import Hero from "@/components/hero";
import PremiumSection from "@/components/premium-section";
import YouTubeSection from "@/components/youtube-section";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <PremiumSection />
        <YouTubeSection />
      </main>
    </>
  );
}
