import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GX Marketplace — Browse Tasks & Rewards",
  description:
    "Explore hundreds of tasks and rewards on the GanjaranX Marketplace. Earn Ganjaran Points by completing property referrals, EV test drives, online surveys & more — then redeem for vouchers, hotel stays, dining credits, and real-world rewards across Malaysia.",
  keywords: [
    "Malaysia rewards marketplace",
    "earn points tasks Malaysia",
    "redeem vouchers Malaysia",
    "Ganjaran Points marketplace",
    "property referral reward Malaysia",
    "EV test drive reward",
    "online survey earn points Malaysia",
    "dining vouchers Malaysia",
    "hotel voucher Malaysia",
    "GanjaranX marketplace",
  ],
  alternates: {
    canonical: "https://ganjaranx.com/marketplace",
  },
  openGraph: {
    title: "GX Marketplace — Browse Tasks & Earn Rewards | GanjaranX Malaysia",
    description:
      "Browse tasks, earn Ganjaran Points, and redeem real rewards across property, EV, F&B, health, travel & digital categories. Malaysia's most rewarding marketplace.",
    url: "https://ganjaranx.com/marketplace",
  },
};

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
