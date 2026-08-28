import React from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../styles/tailwind.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: "DASMIA — Один комплекс. Множество возможностей.",
  description:
    "DASMIA — премиальный многофункциональный комплекс в Бишкеке: банкетные залы, ресторан, чайхана, фитнес, бассейны, SPA, этно-село и мероприятия.",
  icons: {
    icon: [{ url: "/dasmia.ico", type: "image/x-icon" }],
  },
  openGraph: {
    title: "DASMIA — Один комплекс",
    description: "Премиальный комплекс в Бишкеке с 8 направлениями.",
    images: [{ url: "/assets/images/IMG_2161.webp", width: 1200, height: 800 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${cormorantGaramond.variable} ${dmSans.variable}`}
    >
      <body className={dmSans.className}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fdasmia3855back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20"
        />
        <script
          type="module"
          defer
          src="https://static.rocket.new/rocket-shot.js?v=0.0.2"
        />
      </body>
    </html>
  );
}
