import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer";
import ScrollReveal from "@/components/scroll-reveal";
import { LINKS } from "@/lib/constants";

export const metadata = {
  title: "FAQ — buylow",
  description:
    "buylow에 대해 자주 묻는 질문과 답변을 확인하세요.",
};

export default function FaqPage() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-12 pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold">
              Support
            </p>
            <h1
              className="text-3xl font-extrabold md:text-4xl"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              FAQ
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-dark-muted md:text-base">
              buylow에 대해 자주 묻는 질문들을 모았습니다.
            </p>
          </div>
        </section>

        <div className="rounded-t-3xl bg-[#111118]">
          {/* FAQ Accordion */}
          <ScrollReveal>
            <FaqSection />
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal>
            <section className="mx-auto max-w-2xl px-6 pb-20">
              <div className="rounded-2xl border border-dark-border bg-dark-card p-8 text-center md:p-12">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Contact
                </p>
                <h2
                  className="mb-4 text-xl font-extrabold md:text-2xl"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  더 궁금한 점이 있으신가요?
                </h2>
                <p className="mb-6 text-sm leading-relaxed text-dark-muted md:text-base">
                  네이버 프리미엄 콘텐츠 댓글 또는 인스타그램 DM을 통해
                  문의해주세요.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={LINKS.naver_premium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-black transition-colors hover:bg-gold/90"
                  >
                    네프콘 방문
                  </a>
                  <a
                    href={LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-dark-border px-6 py-2.5 text-sm font-medium transition-colors hover:border-gold hover:text-gold"
                  >
                    Instagram DM
                  </a>
                </div>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
