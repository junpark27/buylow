import Link from "next/link";
import { LINKS } from "@/lib/constants";
import AuthButton from "@/components/auth-button";

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link
          href="/"
          className="text-lg font-extrabold tracking-wide"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          BUYLOW
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={LINKS.naver_premium}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-gold px-4 py-2 text-xs font-bold text-black transition-colors hover:bg-gold-light"
          >
            네프콘 구독
          </a>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
}
