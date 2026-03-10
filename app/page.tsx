import Nav from "@/components/nav";
import Hero from "@/components/hero";
import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer";

const sections = [
  {
    id: "about",
    badge: "About",
    title: "무자본에서 시작하는 실전 투자",
    description:
      "복잡한 차트 분석, 그 너머의 투자를 지향합니다. 에어드랍으로 자본금을 만들고, 시장 심리를 꿰뚫는 트레이딩 마인드셋까지. 바닥을 훑는 실행력과 흐름을 읽는 안목을 모두 갖춘, 가장 현실적인 부의 공략집입니다.",
    visual: (
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-dark-border bg-dark-card p-4">
          <div className="mb-2 text-2xl font-extrabold text-gold">0→1</div>
          <p className="text-xs text-dark-muted">무자본에서 시드 만들기</p>
        </div>
        <div className="rounded-xl border border-dark-border bg-dark-card p-4">
          <div className="mb-2 text-2xl font-extrabold text-gold">+EV</div>
          <p className="text-xs text-dark-muted">기대값 양수의 투자</p>
        </div>
        <div className="rounded-xl border border-dark-border bg-dark-card p-4">
          <div className="mb-2 text-2xl font-extrabold text-gold">On-chain</div>
          <p className="text-xs text-dark-muted">데이터 기반 분석</p>
        </div>
        <div className="rounded-xl border border-dark-border bg-dark-card p-4">
          <div className="mb-2 text-2xl font-extrabold text-gold">Mindset</div>
          <p className="text-xs text-dark-muted">상위 1% 투자 심리</p>
        </div>
      </div>
    ),
  },
  {
    id: "premium",
    badge: "Premium",
    title: "네이버 프리미엄 콘텐츠",
    description:
      "무자본 시드 확보 전략, 온체인 데이터 분석, 트레이딩 심리 프레임워크 등 깊이 있는 리서치를 연재합니다. 단순 시그널이 아닌, 스스로 판단할 수 있는 투자 안목을 키워드립니다.",
    visual: (
      <div className="space-y-3">
        {[
          "에어드랍 시드 확보 전략 — 2026 Q1",
          "트레이딩 마인드셋: 손절을 잘하는 법",
          "온체인 데이터로 읽는 시장 흐름",
        ].map((title, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-lg border border-dark-border bg-dark-card p-3"
          >
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-gold/15 text-xs font-bold text-gold">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="text-sm font-medium">{title}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "youtube",
    badge: "YouTube",
    title: "영상 콘텐츠",
    description:
      "글로는 전달하기 어려운 시황 해설, 실전 트레이딩 과정, 에어드랍 튜토리얼을 영상으로 공유합니다. 채널을 리뉴얼하여 곧 새로운 시리즈로 찾아갑니다.",
    visual: (
      <div className="overflow-hidden rounded-xl border border-dark-border bg-dark-card">
        <div className="flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e] py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-gold"
              >
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </div>
            <p className="text-xs text-dark-muted">Coming Soon</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs font-semibold text-gold">BUYLOW YouTube</p>
          <p className="mt-1 text-sm font-medium">리뉴얼 준비 중</p>
        </div>
      </div>
    ),
  },
  {
    id: "blog",
    badge: "Blog",
    title: "무료 인사이트",
    description:
      "프리미엄 콘텐츠에서 다루지 못하는 속보, 짧은 시황 코멘트, 에어드랍 가이드를 무료로 공유합니다. 투자를 시작하는 첫 걸음에 도움이 될 콘텐츠입니다.",
    visual: (
      <div className="space-y-3">
        {["에어드랍 속보", "시황 코멘트", "트레이딩 팁"].map((tag, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border border-dark-border bg-dark-card p-3"
          >
            <div className="flex items-center gap-3">
              <span className="rounded bg-gold/10 px-2 py-1 text-xs text-gold">
                {tag}
              </span>
              <span className="text-sm text-dark-muted">새 글 발행 예정</span>
            </div>
            <span className="text-dark-muted">→</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <div className="mx-auto max-w-3xl space-y-20 px-6 pb-8">
          {sections.map((section, i) => (
            <section
              key={section.id}
              id={section.id}
              className={`flex flex-col gap-8 md:flex-row md:items-start ${
                i % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  {section.badge}
                </p>
                <h2 className="mb-3 text-xl font-extrabold md:text-2xl">
                  {section.title}
                </h2>
                <p className="text-sm leading-relaxed text-dark-muted md:text-base">
                  {section.description}
                </p>
              </div>
              <div className="flex-1">{section.visual}</div>
            </section>
          ))}
        </div>
        <FaqSection />
      </main>
      <Footer />
    </>
  );
}
