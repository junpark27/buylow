import { SITE } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 py-20 text-center md:py-28">
      <h1
        className="mb-6 text-5xl font-extrabold tracking-wide md:text-7xl"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        BUYLOW
      </h1>
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        {SITE.tagline}
      </p>
      <p className="max-w-xl text-sm leading-relaxed text-dark-muted md:text-base">
        {SITE.description}
      </p>
      <p className="mt-2 text-sm text-dark-muted md:text-base">
        {SITE.subtitle}
      </p>
    </section>
  );
}
