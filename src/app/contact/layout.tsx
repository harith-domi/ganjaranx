import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact GanjaranX",
  description:
    "Get in touch with GanjaranX — Malaysia's leading loyalty rewards platform. Contact us for partnership inquiries, business collaborations, support, or to list your brand on our marketplace.",
  keywords: [
    "contact GanjaranX",
    "GanjaranX support Malaysia",
    "loyalty platform partnership Malaysia",
    "rewards platform business inquiry",
    "GanjaranX contact",
  ],
  alternates: {
    canonical: "https://ganjaranx.com/contact",
  },
  openGraph: {
    title: "Contact GanjaranX | Malaysia Rewards Platform",
    description:
      "Reach out to GanjaranX for partnerships, support, or to list your brand on Malaysia's leading rewards marketplace.",
    url: "https://ganjaranx.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
