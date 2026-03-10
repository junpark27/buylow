"use client";

import { useState } from "react";

const faqs = [
  {
    q: "buylow는 어떤 콘텐츠를 다루나요?",
    a: "에어드랍을 통한 무자본 시드 확보 전략, 트레이딩 마인드셋, 온체인 데이터 분석, 시황 해설 등 크립토 투자 전반을 다룹니다.",
  },
  {
    q: "투자 경험이 없어도 괜찮나요?",
    a: "네. buylow는 '0에서 1로' 시작하는 분들을 위한 콘텐츠입니다. 무자본에서 시드를 만드는 과정부터 단계별로 안내합니다.",
  },
  {
    q: "네이버 프리미엄 콘텐츠에는 어떤 것이 있나요?",
    a: "심층 리서치, 에어드랍 실전 가이드, 트레이딩 심리 프레임워크 등 무료 콘텐츠보다 깊이 있는 분석을 연재합니다.",
  },
  {
    q: "유튜브와 네프콘의 차이는 뭔가요?",
    a: "유튜브는 시황 해설, 튜토리얼 등 접근하기 쉬운 영상 콘텐츠를 제공하고, 네프콘은 텍스트 기반의 심층 리서치와 전략을 제공합니다.",
  },
  {
    q: "콘텐츠는 얼마나 자주 업데이트되나요?",
    a: "네프콘은 주 2~3회, 블로그는 수시로 업데이트합니다. 유튜브는 리뉴얼 후 정기 업로드 예정입니다.",
  },
  {
    q: "무료로 볼 수 있는 콘텐츠도 있나요?",
    a: "네. 블로그에서 시황 코멘트, 에어드랍 속보, 간단한 가이드를 무료로 공유합니다. 유튜브 영상도 모두 무료입니다.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2
        className="mb-8 text-center text-2xl font-extrabold md:text-3xl"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-dark-border">
        {faqs.map((faq, i) => (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between py-5 text-left transition-colors hover:text-gold"
            >
              <span className="pr-4 text-sm font-medium md:text-base">
                {faq.q}
              </span>
              <span className="flex-shrink-0 text-xl text-dark-muted">
                {openIndex === i ? "−" : "+"}
              </span>
            </button>
            {openIndex === i && (
              <p className="pb-5 text-sm leading-relaxed text-dark-muted">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
