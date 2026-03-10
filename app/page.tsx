import Nav from "@/components/nav";
import Hero from "@/components/hero";
import YouTubeSection from "@/components/youtube-section";
import PremiumSection from "@/components/premium-section";
import BlogSection from "@/components/blog-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <YouTubeSection />
        <PremiumSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
