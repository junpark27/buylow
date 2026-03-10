import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-dark text-white antialiased`}>
        <Sidebar />
        <div className="md:ml-20">
          {children}
        </div>
      </body>
    </html>
  );
}
