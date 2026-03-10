import ContentCard from "./content-card";
import { LINKS } from "@/lib/constants";
import videos from "@/content/youtube.json";

export default function YouTubeSection() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold">
            YouTube
          </p>
          <h2 className="text-2xl font-extrabold">최신 영상</h2>
        </div>
        <a
          href={LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-dark-muted transition-colors hover:text-gold"
        >
          채널 구독 →
        </a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video, i) => (
          <ContentCard
            key={i}
            title={video.title}
            description={video.description}
            imageUrl={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
            badge="YouTube"
            href={video.href}
            ctaText="영상 보기"
          />
        ))}
      </div>
    </section>
  );
}
