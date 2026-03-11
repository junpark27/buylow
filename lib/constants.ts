export const SITE = {
  name: "buylow",
  tagline: "zero to one",
  description:
    "맨손으로 시드를 만드는 실행부터, 자산을 지키고 불리는 통찰까지.",
  subtitle: "가장 현실적인 부의 공략집",
} as const;

export const BLOG_TOPICS = [
  { slug: "airdrop", label: "에어드랍 가이드", description: "무자본 시드 확보 실전 매뉴얼" },
  { slug: "market", label: "시장 분석", description: "거시 경제와 시장 흐름 해설" },
  { slug: "mindset", label: "투자 마인드셋", description: "심리, 리스크 관리, 전략" },
  { slug: "onchain", label: "온체인 인사이트", description: "데이터 기반 분석" },
] as const;

export const LINKS = {
  naver_premium:
    "https://contents.premium.naver.com/buylowh/buylow/contents",
  youtube: "https://www.youtube.com/channel/UCIPq_gd8OkPYHlrmF30Lrpw",
  instagram: "https://www.instagram.com/buylow_h/",
} as const;
