import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Nav from "@/components/nav";
import Providers from "@/components/providers";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700", "800"] });

export const metadata: Metadata = {
  title: "buylow — zero to one",
  description:
    "맨손으로 시드를 만드는 실행부터, 자산을 지키고 불리는 통찰까지. 가장 현실적인 부의 공략집.",
  openGraph: {
    title: "buylow — zero to one",
    description: "가장 현실적인 부의 공략집",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="dark">
      <body
        className={`${inter.className} bg-dark text-white antialiased`}
        style={{ '--font-playfair': playfair.style.fontFamily } as React.CSSProperties}
      >
        <Providers>
          <Nav />
          <Sidebar />
          {/* Right spacer sidebar for symmetry */}
          <div className="fixed right-0 top-14 z-40 hidden h-[calc(100vh-3.5rem)] w-16 border-l border-dark-border/50 md:block" />
          <div className="pt-14 md:px-16">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
