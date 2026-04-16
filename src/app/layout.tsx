import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI 이미지 생성기 | 무료 AI 이미지 생성",
  description:
    "Pollinations.ai를 활용한 무료 AI 이미지 생성기. 텍스트 프롬프트로 멋진 이미지를 만들어보세요.",
  keywords: ["AI", "이미지 생성", "AI art", "Pollinations", "무료 이미지"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
