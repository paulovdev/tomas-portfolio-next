import Footer from "@/app/components/footer";
import WorkNav from "@/app/components/navs/work-nav";
import WorkMedia from "@/app/components/pages/works/slug/work-media";
import RelatedWorks from "@/app/components/pages/works/slug/related-works";
import { MotionFigure } from "@/app/components/motion";
import { getWork, getRelatedWorks } from "@/app/(utils)/sanity-queries";

export const revalidate = 86400;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const work = await getWork(slug);
  if (!work) {
    return {
      title: "Tomás — Work",
    };
  }

  return {
    title: `Tomás — ${work.title}`,
    description: work.description,
    openGraph: {
      title: `Tomás — ${work.title}`,
      description: work.description,
      images: work?.media?.[0]?.asset?.url
        ? [{ url: work.media[0].asset.url }]
        : [],
    },
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;

  const work = await getWork(slug);
  const relatedWorks = await getRelatedWorks(slug);

  if (!work) {
    return (
      <main className="p-10 text-center text-p">
        <p>Work not found.</p>
      </main>
    );
  }

  const jsonLdProject = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: work.title,
    description: work.description,
    url: `https://www.tomasml.com/work/${slug}`,
    creator: {
      "@type": "Person",
      name: "Tomás",
      url: "https://tomasml.com",
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
        <h1 className="sr-only">{work.title}</h1>
        <h2 className="sr-only">{work.year}</h2>

        <section className="relative pt-30 p-4 h-fit bg-s max-md:px-3 max-sm:px-2">
          <MotionFigure
            className="overflow-hidden size-full mb-4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: 1,
                ease: [0.33, 1, 0.68, 1],
              },
            }}
          >
            <WorkMedia media={work.media} title={work.title} />
          </MotionFigure>
        </section>

        {relatedWorks?.length > 0 && (
          <RelatedWorks relatedWorks={relatedWorks} />
        )}
      </main>

      <Footer />
    </>
  );
}
