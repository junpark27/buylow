import ScrollReveal from "@/components/scroll-reveal";
import Footer from "@/components/footer";
import { LINKS } from "@/lib/constants";

export const metadata = {
  title: "About — buylow",
  description:
    "맨손으로 시드를 만드는 실행부터, 자산을 지키고 불리는 통찰까지. buylow 채널 소개.",
};

export default function AboutPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-12 pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
              About
            </p>
            <h1
              className="text-3xl font-normal md:text-4xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              About BUYLOW
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-dark-muted md:text-base">
              복잡한 차트 분석, 그 너머의 투자를 지향합니다.
            </p>
          </div>
        </section>

        <div className="rounded-t-3xl bg-[#111118]">
          {/* Channel Description */}
          <ScrollReveal>
            <section className="mx-auto max-w-2xl px-6 py-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
                Channel
              </p>
              <h2
                className="mb-6 text-xl font-extrabold md:text-2xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                채널 소개
              </h2>
              <p className="text-base font-bold leading-relaxed md:text-lg">
                누구나 투자를 말하지만, 시드 만드는 법은 아무도 알려주지
                않습니다. 우리는 거기서부터 시작합니다.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-dark-muted md:text-base">
                무자본으로 시작하는 실전 시드 확보 전략부터, 거시 경제와
                시장 심리를 꿰뚫는 투자 인사이트까지. 실행력과 안목을 함께
                키워드리는, 가장 현실적인 부의 공략집입니다.
              </p>
            </section>
          </ScrollReveal>

          {/* Roadmap */}
          <ScrollReveal>
            <section className="mx-auto max-w-2xl px-6 pb-16">
              <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-gold">
                Roadmap
              </p>
              <h2
                className="mb-6 text-xl font-extrabold md:text-2xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                실전 투자 로드맵
              </h2>
              <p className="mb-10 text-sm leading-relaxed text-dark-muted md:text-base">
                &apos;자본이 부족한 투자자&apos;가 &apos;부의 사이클을 직접
                만드는 자산가&apos;로 성장하는 과정을 A to Z로 다룹니다.
              </p>

              <div className="space-y-6">
                {/* Part 1 */}
                <div className="rounded-2xl border border-dark-border bg-dark-card p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-lg font-extrabold text-gold">
                      1
                    </span>
                    <div>
                      <p className="text-xs text-gold">Part 1</p>
                      <h3 className="text-lg font-extrabold">
                        시드 메이킹 (Seed Making)
                      </h3>
                    </div>
                  </div>
                  <p className="mb-4 text-sm font-semibold italic text-dark-muted">
                    &quot;몸으로 때워서라도 만들어라&quot;
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed text-dark-muted md:text-base">
                    <li>
                      투자를 하고 싶어도 시드가 없어 포기하는 분들을 위한
                      현실적인 솔루션입니다.
                    </li>
                    <li>
                      가상화폐 시장의 에어드랍, 포인트 작업 등 소액 혹은
                      무자본으로 유의미한 시드를 확보하는 구체적인
                      &apos;매뉴얼(How-to)&apos;과 수익화 전략을 제공합니다.
                    </li>
                  </ul>
                </div>

                {/* Part 2 */}
                <div className="rounded-2xl border border-dark-border bg-dark-card p-6 md:p-8">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-lg font-extrabold text-gold">
                      2
                    </span>
                    <div>
                      <p className="text-xs text-gold">Part 2</p>
                      <h3 className="text-lg font-extrabold">
                        자산 스케일업 (Scale-up)
                      </h3>
                    </div>
                  </div>
                  <p className="mb-4 text-sm font-semibold italic text-dark-muted">
                    &quot;돈의 흐름을 읽어라&quot;
                  </p>
                  <ul className="space-y-3 text-sm leading-relaxed text-dark-muted md:text-base">
                    <li>
                      어렵게 모은 시드를 허무하게 잃지 않도록, 전체 시장의
                      흐름과 돈이 몰리는 섹터를 분석합니다.
                    </li>
                    <li>
                      복잡한 기술적 분석 대신, 대중 심리 이용, 리스크 관리,
                      마인드셋 등 자산을 불리는 &apos;본질적인 눈&apos;을
                      길러드립니다.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Goal */}
              <div className="mt-10 rounded-2xl border border-gold/20 bg-gold/5 p-6 md:p-8">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Goal
                </p>
                <p className="text-sm leading-relaxed text-dark-muted md:text-base">
                  시드 확보부터 자산 증식까지, 누군가에게 의존하지 않는{" "}
                  <span className="font-bold text-white">
                    나만의 투자 시스템
                  </span>
                  을 완성하는 것. 그것이 BUYLOW가 지향하는 목표입니다.
                </p>
              </div>
            </section>
          </ScrollReveal>

          {/* Why Different */}
          <ScrollReveal>
            <section className="mx-auto max-w-2xl px-6 pb-16">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold">
                Why Different
              </p>
              <h2
                className="mb-6 text-xl font-extrabold md:text-2xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                다른 채널과 차별점
              </h2>
              <p className="mb-8 text-sm leading-relaxed text-dark-muted md:text-base">
                기존 재테크 채널들은 &apos;무조건적인 절약&apos;을 강조하거나,
                일반인이 따라 하기 힘든 &apos;전문 지식&apos;에만 치우쳐
                있습니다.
              </p>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold/15 text-sm font-bold text-gold">
                    1
                  </span>
                  <div>
                    <h3 className="mb-2 font-bold">
                      실행과 인사이트를 동시에
                    </h3>
                    <p className="text-sm leading-relaxed text-dark-muted">
                      파밍 정보를 주는 곳은 인사이트가 부재하고, 인사이트를 주는
                      곳은 당장 돈 벌 구체적 방법이 없습니다. 이 채널은
                      &quot;당장 오늘 실행할 일&quot;과 &quot;앞으로 나아갈
                      방향&quot;을 동시에 제공하여, 실행하면서 동시에 성장할
                      수 있습니다.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold/15 text-sm font-bold text-gold">
                    2
                  </span>
                  <div>
                    <h3 className="mb-2 font-bold">어려운 전문 용어 배제</h3>
                    <p className="text-sm leading-relaxed text-dark-muted">
                      복잡한 차트 작도나 보조지표 분석을 지양합니다. 대신
                      &quot;사람들의 심리&quot;, &quot;자금의 이동&quot;,
                      &quot;시대의 트렌드&quot; 등 누구나 직관적으로 이해할 수
                      있는 인문학적/심리적 관점에서 투자를 쉽고 명확하게
                      해석합니다.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal>
            <section className="mx-auto max-w-2xl px-6 pb-20">
              <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent p-8 text-center md:p-12">
                <h2
                  className="mb-4 text-xl font-extrabold md:text-2xl"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  함께 성장할 준비가 되셨나요?
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-dark-muted md:text-base">
                  네이버 프리미엄 콘텐츠에서 심층 리서치와 실전 전략을
                  만나보세요.
                </p>
                <a
                  href={LINKS.naver_premium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-sm font-bold text-black transition-colors hover:bg-gold/90"
                >
                  구독하기
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
