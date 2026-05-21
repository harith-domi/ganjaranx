import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/topup/result",
          "/checkout/",
          "/auth/",
        ],
      },
    ],
    sitemap: "https://ganjaranx.com/sitemap.xml",
    host: "https://ganjaranx.com",
  };
}
