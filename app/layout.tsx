import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Nav from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "800"] });

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
        <Nav />
        <div className="mx-auto max-w-7xl">
          <div className="flex">
            <Sidebar />
            <div className="flex-1 pt-14">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
