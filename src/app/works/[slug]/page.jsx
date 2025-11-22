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

  return {
    title: work?.title ? `Tomás — ${work.title}` : "Tomás — Work",
    description: work?.description,
    openGraph: {
      images: work?.media?.[0]?.asset?.url ? [work.media[0].asset.url] : [],
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

  return (
    <>
      <WorkNav work={work} />

      <main>
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
