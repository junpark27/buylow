import ContentCard from "./content-card";
import { LINKS } from "@/lib/constants";
import premiumPosts from "@/content/premium.json";

export default function PremiumSection() {
  return (
    <section id="premium" className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
            Premium
          </p>
          <h2 className="text-2xl font-extrabold">네이버 프리미엄 콘텐츠</h2>
        </div>
        <a
          href={LINKS.naver_premium}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-dark-muted transition-colors hover:text-gold"
        >
          전체 보기 →
        </a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {premiumPosts.map((post, i) => (
          <ContentCard
            key={i}
            title={post.title}
            description={post.description}
            imageUrl={post.imageUrl}
            badge="Premium"
            href={post.href}
            ctaText="구독하고 읽기"
          />
        ))}
      </div>
    </section>
  );
}
