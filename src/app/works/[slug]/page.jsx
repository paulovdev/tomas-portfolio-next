import client from "@/app/sanity/client";
import Footer from "@/app/components/footer";
import WorkNav from "@/app/components/navs/work-nav";
import WorkMedia from "@/app/components/pages/works/slug/work-media";
import RelatedWorks from "@/app/components/pages/works/slug/related-works";

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const work = await client.fetch(
    `*[_type == "works" && slug.current == $slug][0]{
      title,
      description,
      "image": mainImage.asset->url
    }`,
    { slug }
  );

  return {
    title: work?.title || "Work",
    description: work?.description,
    openGraph: {
      images: work?.image ? [work.image] : [],
    },
  };
}

export default async function WorkPage({ params }) {
  const { slug } = await params;

  const work = await client.fetch(
    `*[_type == "works" && slug.current == $slug][0]{
      title,
      description,
      year,
      website,
      client,
      services,
      "slug": slug.current,
      media[] {
        alt,
        asset->{
          _id,
          url,
          mimeType
        }
      }
    }`,
    { slug }
  );

  if (!work) {
    return (
      <main className="p-10 text-center text-p">
        <p>Work not found.</p>
      </main>
    );
  }

  const relatedWorks = await client.fetch(
    `*[_type == "works" && slug.current != $slug]
      | order(year desc)[0...3]{
        title,
        "slug": slug.current,
        media[] {
          alt,
          asset->{
            _id,
            url,
            mimeType
          }
        }
      }`,
    { slug }
  );

  return (
    <>
      <WorkNav work={work} />

      <main>
        <section className="relative pt-30 p-4 min-h-dvh bg-s">
          {work.media?.length > 0 ? (
            <WorkMedia media={work.media} title={work.title} />
          ) : (
            <p className="text-center text-p text-[.9em] font-semibold">
              No Work available
            </p>
          )}
        </section>

        {relatedWorks?.length > 0 && (
          <RelatedWorks relatedWorks={relatedWorks} />
        )}
      </main>

      <Footer />
    </>
  );
}
