import WorksPage from "../components/pages/works/works";
import { getAllWorks } from "../(utils)/sanity-queries";

export const metadata = {
  title: "Tomás — Works",
  description:
    "Explore Tomás’ design works. Visual creation grounded in strategy.",

  robots: {
    index: true,
    follow: true,
    nocache: false,
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
        <h1 className="sr-only">Tomás — Design Works & Visual Projects</h1>

        <h2 className="sr-only">
          Selected Branding and Visual Identity Projects
        </h2>
        <WorksPage works={works} />
      </main>
    </>
  );
}
