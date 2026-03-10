import Link from "next/link";
import { LINKS } from "@/lib/constants";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark/80 backdrop-blur-md md:pl-20">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          buylow
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={LINKS.naver_premium}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-dark transition-opacity hover:opacity-90"
          >
            네프콘 구독
          </a>
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-dark-border px-4 py-2 text-sm font-semibold text-dark-muted transition-colors hover:border-gold/50 hover:text-gold"
          >
            YouTube
          </a>
        </div>
      </div>
    </nav>
  );
}
