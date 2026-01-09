// app/sitemap.jsx
import { getAllWorks } from "@/app/(utils)/sanity-queries";

export default async function sitemap() {
  const baseUrl = "https://www.tomasml.com";
  const works = await getAllWorks();

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date("2025-12-28"),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2025-11-15"),
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/works`,
      lastModified: new Date("2025-11-15"),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2025-11-15"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const dynamicRoutes =
    works
      ?.filter(
        (work) =>
          work?.slug && (typeof work.slug === "string" || work.slug?.current)
      )
      .map((work) => {
        const slug =
          typeof work.slug === "string" ? work.slug : work.slug.current;

        return {
          url: `${baseUrl}/works/${slug}`,
          lastModified: new Date(work._updatedAt ?? Date.now()),
          changeFrequency: "monthly",
          priority: 0.8,
        };
      }) ?? [];

  return [...staticRoutes, ...dynamicRoutes];
}
