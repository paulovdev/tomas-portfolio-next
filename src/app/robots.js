export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/contact/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/terms-and-conditions/"],
      },
    ],
    sitemap: "https://tomasml.com/sitemap.xml",
  };
}
