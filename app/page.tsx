import Nav from "@/components/nav";
import Hero from "@/components/hero";
import PremiumSection from "@/components/premium-section";
import YouTubeSection from "@/components/youtube-section";
import BlogSection from "@/components/blog-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <PremiumSection />
        <YouTubeSection />
        <BlogSection />
      </main>
      <Footer />
    </>
  );
}
