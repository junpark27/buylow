import { LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-dark-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-xs text-dark-muted">
          © 2026 buylow. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-dark-muted transition-colors hover:text-gold"
          >
            Instagram
          </a>
          <a
            href={LINKS.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-dark-muted transition-colors hover:text-gold"
          >
            YouTube
          </a>
          <a
            href={LINKS.naver_premium}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-dark-muted transition-colors hover:text-gold"
          >
            네프콘
          </a>
        </div>
      </div>
    </footer>
  );
}
