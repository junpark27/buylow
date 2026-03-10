import { SITE, LINKS } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-24 text-center md:py-32">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        {SITE.tagline}
      </p>
      <h1 className="mb-4 max-w-2xl text-3xl font-extrabold leading-tight md:text-5xl">
        {SITE.description}
      </h1>
      <p className="mb-8 text-base text-dark-muted md:text-lg">
        {SITE.subtitle}
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
