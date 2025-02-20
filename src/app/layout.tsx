import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from 'react-hot-toast';
import Script from 'next/script';

export const metadata: Metadata = {
  title: "【在线礼佛平台】观音菩萨在线祈福 | 即时诵经念佛 | BrahmaSound",
  description: "BrahmaSound梵海清音数字佛堂｜云端礼佛新体验。在线供奉观音菩萨，即时祈愿诵经，提供《般若波罗蜜多心经》《普门品》《大悲咒》等经典诵读。每日佛号共修、功德回向指引，居家净心、消灾增慧。无论身在何处，皆可礼敬观音菩萨，获慈悲加持。",
  keywords: "在线拜观音,观音菩萨在线祈福,般若波罗蜜多心经诵读,普门品念诵,佛教在线修行,念佛共修,观音菩萨圣号,居家拜佛,数字佛堂,佛经在线听诵,菩提心修行,佛教心灵成长,慈悲加持,消灾祈福,佛教文化传承",
  icons: {
    icon: '/favicon.ico'
  },
  openGraph: {
    title: "【在线礼佛平台】观音菩萨在线祈福 | 即时诵经念佛 | BrahmaSound",
    description: "BrahmaSound梵海清音数字佛堂｜云端礼佛新体验。在线供奉观音菩萨，即时祈愿诵经。",
    url: "https://brahmasound.com",
    siteName: "BrahmaSound梵海清音",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "【在线礼佛平台】观音菩萨在线祈福 | 即时诵经念佛 | BrahmaSound",
    description: "BrahmaSound梵海清音数字佛堂｜云端礼佛新体验。在线供奉观音菩萨，即时祈愿诵经。",
  },
  alternates: {
    canonical: "https://brahmasound.com"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        {/* Google Analytics */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-TMDX45V18R" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-TMDX45V18R');
          `}
        </Script>
        {/* Google AdSense */}
        <Script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2909094795372025"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer className="bg-text-gray text-white py-4 mt-8">
          <div className="content-container text-center">
            <p>© 2024-2025 Brahmasound梵海清音</p>
            <p className="text-sm mt-2">本平台仅供修行参考，佛法无边，诚心为要</p>
          </div>
        </footer>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 2000,
            style: {
              background: 'var(--bg-cream)',
              color: 'var(--dark-brown)',
              border: '1px solid var(--primary-gold)',
            },
          }}
        />
      </body>
    </html>
  );
}
