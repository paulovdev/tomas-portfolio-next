import WorksPage from "../components/pages/works/works";
import { getAllWorks } from "../(utils)/sanity-queries";

export const metadata = {
  title: "Tomás — Works",
  description:
    "Explore Tomás’ Design Works. A curated selection of branding, visual identity, and digital projects.",
  keywords: [
    "graphic design portfolio",
    "branding projects",
    "visual identity",
    "art direction",
    "brand strategy",
    "digital design",
    "creative direction",
    "design works",
  ],

  openGraph: {
    title: "Tomás — Works",
    description:
      "A curated selection of branding, visual identity, and digital design projects by Tomás.",
    siteName: "Tomás",
    url: "https://www.tomasml.com/works",
    type: "website",
    locale: "en_US",
    images: ["https://www.tomasml.com/logo.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tomás — Works",
    description:
      "Explore selected branding, visual identity, and digital projects by Tomás.",
    creator: "@tomasml",
    images: ["https://www.tomasml.com/works.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.tomasml.com/works",
  },
};

export const revalidate = 86400;

export default async function Page() {
  const works = await getAllWorks();

  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tomás — Works",
    description:
      "A curated selection of branding and visual identity works by Tomás.",
    url: "https://www.tomasml.com/works",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: works?.map((work, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `https://www.tomasml.com/work/${work.slug?.current}`,
        name: work.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdCollection),
        }}
      />
      <main>
        <h1 className="sr-only">Tomás — Design Works</h1>
        <h2 className="sr-only">
          Branding, Visual Identity & Digital Projects
        </h2>
        <WorksPage works={works} />
      </main>
    </>
  );
}
