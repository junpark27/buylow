import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Footer from "@/components/footer";

const sections = [
  {
    id: "about",
    badge: "About",
    title: "무자본에서 시작하는 실전 투자",
    description:
      "복잡한 차트 분석, 그 너머의 투자를 지향합니다. 에어드랍으로 자본금을 만들고, 시장 심리를 꿰뚫는 트레이딩 마인드셋까지. 바닥을 훑는 실행력과 흐름을 읽는 안목을 모두 갖춘, 가장 현실적인 부의 공략집입니다.",
  },
  {
    id: "premium",
    badge: "Premium",
    title: "네이버 프리미엄 콘텐츠",
    description:
      "무자본 시드 확보 전략, 온체인 데이터 분석, 트레이딩 심리 프레임워크 등 깊이 있는 리서치를 연재합니다. 단순 시그널이 아닌, 스스로 판단할 수 있는 투자 안목을 키워드립니다.",
  },
  {
    id: "youtube",
    badge: "YouTube",
    title: "영상 콘텐츠",
    description:
      "글로는 전달하기 어려운 시황 해설, 실전 트레이딩 과정, 에어드랍 튜토리얼을 영상으로 공유합니다. 채널을 리뉴얼하여 곧 새로운 시리즈로 찾아갑니다.",
  },
  {
    id: "blog",
    badge: "Blog",
    title: "무료 인사이트",
    description:
      "프리미엄 콘텐츠에서 다루지 못하는 속보, 짧은 시황 코멘트, 에어드랍 가이드를 무료로 공유합니다. 투자를 시작하는 첫 걸음에 도움이 될 콘텐츠입니다.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main className="pt-16">
        <Hero />
        <div className="mx-auto max-w-2xl space-y-16 px-6 pb-20">
          {sections.map((section) => (
            <section key={section.id} id={section.id}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                {section.badge}
              </p>
              <h2 className="mb-3 text-xl font-extrabold md:text-2xl">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-dark-muted md:text-base">
                {section.description}
              </p>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
