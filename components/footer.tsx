import { LINKS } from "@/lib/constants";

const sitemap = [
  {
    title: "Content",
    links: [
      { label: "네프콘", href: LINKS.naver_premium, external: true },
      { label: "YouTube", href: LINKS.youtube, external: true },
      { label: "Blog", href: "/blog", external: false },
    ],
  },
  {
    title: "Topics",
    links: [
      { label: "에어드랍 가이드", href: "/blog", external: false },
      { label: "트레이딩 마인드셋", href: "/blog", external: false },
      { label: "시황 분석", href: "/blog", external: false },
      { label: "온체인 데이터", href: "/blog", external: false },
    ],
  },
  {
    title: "BUYLOW",
    links: [
      { label: "About", href: "#about", external: false },
      { label: "FAQ", href: "#faq", external: false },
      { label: "Contact", href: "#", external: false },
    ],
  },
];

const socials = [
  { label: "Instagram", href: LINKS.instagram },
  { label: "YouTube", href: LINKS.youtube },
  { label: "네프콘", href: LINKS.naver_premium },
];

export default function Footer() {
  return (
    <footer id="sns" className="border-t border-dark-border bg-[#08080d]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Sitemap */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {sitemap.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-sm font-bold">{group.title}</p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-dark-muted transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Stay connected */}
          <div>
            <p className="mb-4 text-sm font-bold">Stay connected</p>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-dark-border text-dark-muted transition-colors hover:border-gold hover:text-gold"
                  title={s.label}
                >
                  {s.label[0]}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t border-dark-border pt-6">
          <p className="text-xs leading-relaxed text-dark-muted/60">
            본 웹사이트에서 제공하는 정보는 교육 및 정보 제공 목적으로만
            제공되며, 금융, 투자, 법률 또는 세무 자문을 구성하지 않습니다.
            모든 콘텐츠는 정확성이나 완전성에 대한 보증 없이 공유됩니다.
            투자 결정에 대한 책임은 전적으로 본인에게 있으며, 과거의 성과가
            미래의 결과를 보장하지 않습니다.
          </p>
          <p className="mt-4 text-xs text-dark-muted/40">
            © 2026 buylow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
