import { getWork, getRelatedWorks } from "@/(utils)/sanity-queries";

import Footer from "@/components/layout/footer";
import { WorkNav } from "@/components/layout/nav";
import WorkMedia from "@/components/pages/works/slug/work-media";
import RelatedWorks from "@/components/pages/works/slug/related-works";
import Link from "next/link";

export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const work = await getWork(slug);
  if (!work) {
    return {
      title: "Tomás — Graphic & Visual Identity Designer en Canarias",
    };
  }

  const metaTitle = `${work.title} — Tomás | Branding & Diseño Gráfico en Canarias`;
  const metaDescription = work.description
    ? `${work.description} — Project by Tomás, graphic designer & branding specialist in Canarias.`
    : `Branding and visual identity project ${work.title} by Tomás, graphic designer based in Canarias.`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      work.title,
      "designer grafico en canarias",
      "diseño gráfico canarias",
      "branding project",
      "visual identity",
      "diseñador gráfico canarias",
      "portafolio de diseño",
    ],
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://www.tomasml.com/works/${work.slug?.current || slug}`,
      type: "article",
      locale: "en_US",
      alternateLocale: ["es_ES"],
      images: work?.media?.[0]?.asset?.url
        ? [
            {
              url: work.media[0].asset.url,
              alt: `${work.title} — Graphic Design Project in Canarias`,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      creator: "@tomasml",
      images: work?.media?.[0]?.asset?.url ? [work.media[0].asset.url] : [],
    },
    alternates: {
      canonical: `https://www.tomasml.com/works/${work.slug?.current || slug}`,
    },
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;

  const work = await getWork(slug);
  const relatedWorks = await getRelatedWorks(slug);

  if (!work) {
    return (
      <>
        <WorkNav work={work} />
        <main className="">
          <div className="relative h-svh max-md:h-[calc(var(--vh)*100)] px-4 flex items-center justify-center bg-s max-md:px-3 max-sm:px-2">
            <div className="w-full grid grid-cols-4">
              <p className="text-p text-[4em] max-md:text-[3em] font-medium tracking-[-0.03em]">
                404
              </p>
              <div className="flex flex-col items-start col-span-3">
                <p className="text-p  texts-global font-medium tracking-[-0.03em]">
                  Work not found :&#40;
                </p>

                <p className="text-p  texts-global  font-medium tracking-[-0.03em]">
                  Please check the URL or return to the{" "}
                  <Link
                    href={"/works"}
                    className="text-p  texts-global font-medium tracking-[-0.03em] underline"
                  >
                    works
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": ["CreativeWork", "VisualArtwork"],
    name: work.title,
    headline: `${work.title} — Branding & Visual Identity Project`,
    description:
      work.description || `Design project ${work.title} by Tomás in Canarias.`,
    url: `https://www.tomasml.com/works/${slug}`,
    inLanguage: ["en", "es"],
    creator: {
      "@type": "Person",
      name: "Tomás",
      jobTitle: "Graphic Designer & Branding Specialist",
      url: "https://www.tomasml.com",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Canarias",
        addressCountry: "ES",
      },
    },
    locationCreated: {
      "@type": "AdministrativeArea",
      name: "Canarias",
    },
    image: work?.media?.[0]?.asset?.url ? [work.media[0].asset.url] : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdProject),
        }}
      />

      <WorkNav work={work} />

      <main className="">
        {/* Headings invisíveis (sr-only) para contexto SEO local */}
        <h1 className="sr-only">
          {work.title} — Branding & Diseño Gráfico en Canarias
        </h1>
        <h2 className="sr-only">
          {work.year ? `${work.year} Project` : "Project Details"} — Graphic
          Design by Tomás
        </h2>

        <section className="relative pt-30 p-4 h-fit bg-s max-md:px-3 max-sm:px-2">
          <WorkMedia media={work.media} title={work.title} />
        </section>

        {relatedWorks?.length > 0 && (
          <RelatedWorks relatedWorks={relatedWorks} />
        )}
      </main>

      <Footer />
    </>
  );
}
