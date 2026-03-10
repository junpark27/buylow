import { SITE, LINKS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-20 text-center md:py-28">
      <div className="mb-6">
        <h1
          className="text-5xl font-extrabold tracking-wide md:text-7xl"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          BUYLOW
        </h1>
        <p
          className="mt-1 text-sm tracking-[0.4em] text-dark-muted md:text-base"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          VENTURES
        </p>
      </div>
      <p className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        {SITE.tagline}
      </p>
      <div className="flex gap-4">
        <a
          href={LINKS.naver_premium}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-gold px-6 py-3 text-sm font-bold text-black transition-colors hover:bg-gold-light"
        >
          네프콘 구독
        </a>
        <a
          href={LINKS.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-gold/30 bg-gold/10 px-6 py-3 text-sm font-semibold text-gold transition-colors hover:bg-gold/20"
        >
          YouTube
        </a>
      </div>
    </section>
  );
}
