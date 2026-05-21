import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Top Up GX Points — Buy Ganjaran Points Online",
  description:
    "Buy Ganjaran Points instantly via FPX (Billplz) or credit/debit card (Stripe). 100 pts = RM 1. Choose from Starter (RM 1) to Ultimate (RM 100) top-up packages. Points credited instantly — no expiry, no hidden fees.",
  keywords: [
    "buy loyalty points Malaysia",
    "top up points Malaysia",
    "Ganjaran Points purchase",
    "GX points top up",
    "FPX points Malaysia",
    "online points purchase Malaysia",
    "loyalty points buy Malaysia",
    "GanjaranX top up",
    "buy GX points",
    "Malaysia points wallet",
  ],
  alternates: {
    canonical: "https://ganjaranx.com/topup",
  },
  openGraph: {
    title: "GX Top-Up — Buy Ganjaran Points Instantly | GanjaranX",
    description:
      "Top up your Ganjaran Points wallet via FPX or card. 100 pts = RM 1, instant credit, no expiry. Packages from RM 1 to RM 100.",
    url: "https://ganjaranx.com/topup",
  },
};

export default function TopUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
