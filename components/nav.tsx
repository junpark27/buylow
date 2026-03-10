import Link from "next/link";
import { LINKS } from "@/lib/constants";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-wide"
          style={{ fontFamily: 'var(--font-playfair), serif' }}
        >
          BUYLOW
        </Link>
        <div className="flex items-center gap-4">
          <a
            href={LINKS.naver_premium}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-gold px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-gold-light sm:block"
          >
            네프콘 구독
          </a>
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg border border-gold/30 bg-gold/10 px-4 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold/20 sm:block"
          >
            YouTube
          </a>
          <button className="rounded-lg border border-dark-border px-4 py-2 text-xs text-dark-muted transition-colors hover:border-white hover:text-white">
            Log in
          </button>
        </div>
      </div>
    </nav>
  );
}
