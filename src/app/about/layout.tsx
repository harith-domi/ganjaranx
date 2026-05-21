import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About GanjaranX",
  description:
    "Learn about GanjaranX — Malaysia's dedicated task-to-reward marketplace built for everyday Malaysians. Discover our mission, values, and the six reward verticals we cover across property, EV, dining, health, travel, and digital.",
  keywords: [
    "about GanjaranX",
    "Malaysia rewards company",
    "loyalty platform Malaysia",
    "Malaysian rewards ecosystem",
    "GanjaranX mission",
    "earn rewards Malaysia company",
  ],
  alternates: {
    canonical: "https://ganjaranx.com/about",
  },
  openGraph: {
    title: "About GanjaranX — Malaysia's Task-to-Reward Marketplace",
    description:
      "Built for Malaysians, by Malaysians. GanjaranX connects everyday consumers with brands across property, EV, dining, health, travel, and digital — rewarding every meaningful action.",
    url: "https://ganjaranx.com/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
