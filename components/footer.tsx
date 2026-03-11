import Link from "next/link";
import { LINKS } from "@/lib/constants";

const socials = [
  {
    label: "Instagram",
    href: LINKS.instagram,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: LINKS.youtube,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </svg>
    ),
  },
  {
    label: "네프콘",
    href: LINKS.naver_premium,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4">
        <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle" fill="currentColor" fontSize="16" fontWeight="800" fontFamily="sans-serif">N</text>
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-[#08080d]">
      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Top row: socials + links */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-border text-dark-muted transition-colors hover:border-gold hover:text-gold"
                title={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            <Link
              href="/about"
              className="text-sm text-dark-muted transition-colors hover:text-gold"
            >
              About
            </Link>
            <a
              href={LINKS.naver_premium}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-dark-muted transition-colors hover:text-gold"
            >
              네프콘 구독
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 border-t border-dark-border pt-6">
          <p className="text-center text-xs leading-relaxed text-dark-muted/60">
            본 웹사이트에서 제공하는 정보는 교육 및 정보 제공 목적으로만
            제공되며, 금융, 투자, 법률 또는 세무 자문을 구성하지 않습니다.
            투자 결정에 대한 책임은 전적으로 본인에게 있으며, 과거의 성과가
            미래의 결과를 보장하지 않습니다.
          </p>
          <p className="mt-4 text-center text-xs text-dark-muted/40">
            © 2026 buylow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
