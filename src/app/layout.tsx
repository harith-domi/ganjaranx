import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://ganjaranx.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "GanjaranX — Malaysia's #1 Task-to-Reward Marketplace",
    template: "%s | GanjaranX Malaysia",
  },
  description:
    "GanjaranX is Malaysia's leading loyalty rewards platform. Complete tasks, earn Ganjaran Points, and redeem real rewards — property vouchers, EV credits, dining, travel & more. 100 pts = RM 1.",
  keywords: [
    "Malaysia rewards program",
    "earn rewards Malaysia",
    "Ganjaran Points",
    "loyalty points Malaysia",
    "task rewards platform",
    "redeem vouchers Malaysia",
    "points top up Malaysia",
    "GanjaranX",
    "GX points",
    "Malaysia loyalty app",
    "property rewards Malaysia",
    "EV rewards Malaysia",
    "online rewards marketplace",
    "earn points online Malaysia",
    "FPX payment rewards",
  ],
  authors: [{ name: "GanjaranX", url: BASE_URL }],
  creator: "GanjaranX",
  publisher: "GanjaranX",
  category: "Rewards & Loyalty",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: {
      "en-MY": BASE_URL,
      "ms-MY": `${BASE_URL}?lang=ms`,
      "zh-MY": `${BASE_URL}?lang=zh`,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: BASE_URL,
    siteName: "GanjaranX",
    title: "GanjaranX — Malaysia's #1 Task-to-Reward Marketplace",
    description:
      "Complete tasks, earn Ganjaran Points, and redeem real-world rewards across property, EV, dining, travel & more. Malaysia's most rewarding loyalty platform.",
    images: [
      {
        url: `${BASE_URL}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "GanjaranX — Earn & Redeem Rewards in Malaysia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GanjaranX — Malaysia's #1 Task-to-Reward Marketplace",
    description:
      "Complete tasks, earn Ganjaran Points, and redeem real rewards across Malaysia. 100 pts = RM 1.",
    images: [`${BASE_URL}/opengraph-image`],
    creator: "@ganjaranx",
  },
  verification: {
    google: "oWyAQviPgm3Auss8mbXab88t0rPMFs9iB9yTcS5ABMM",
  },
};

// JSON-LD structured data for the whole site
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "GanjaranX",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.svg`,
        width: 200,
        height: 60,
      },
      description:
        "GanjaranX is Malaysia's leading task-to-reward loyalty marketplace. Earn Ganjaran Points by completing tasks and redeem them for real-world rewards.",
      foundingLocation: {
        "@type": "Country",
        name: "Malaysia",
      },
      areaServed: {
        "@type": "Country",
        name: "Malaysia",
      },
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "GanjaranX",
      description: "Malaysia's #1 task-to-reward loyalty marketplace",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/marketplace?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
