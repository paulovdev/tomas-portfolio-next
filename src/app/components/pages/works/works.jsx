"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { urlFor } from "../../../lib/sanityImage";
import Footer from "../../footer";
import GlobalNav from "../../navs/global-nav";

const WorksCard = ({ work }) => {
  const router = useRouter();

  const getUrl = (asset) =>
    urlFor(asset).width(1600).quality(80).auto("format").url();

  const first = work.media?.[0];
  const asset = first?.asset;

  if (!asset) return null;

  const isVideo = asset.mimeType?.startsWith("video/");
  const isImage = asset.mimeType?.startsWith("image/");
  const imageUrl = isImage ? getUrl(asset) : null;

  const handleOpen = (slug) => {
    router.push(`/works/${slug}`);
  };

  return (
    <div
      key={work._id}
      className="relative mb-10 group overflow-hidden cursor-pointer"
      onClick={() => handleOpen(work.slug)}
    >
      {isVideo ? (
        <video
          src={asset.url}
          className="w-full h-[500px] object-cover brightness-100 group-hover:brightness-75 transition-all max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
          muted
          loop
          autoPlay
          playsInline
        />
      ) : imageUrl ? (
        <Image
          src={imageUrl}
          width={1600}
          height={900}
          alt={first.alt || work.title}
          className="w-full h-[500px] object-cover brightness-100 group-hover:brightness-75 transition-all max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]"
        />
      ) : (
        <div className="w-full h-[500px] bg-[#E5E3DC] max-ds:h-[350px] max-lg:h-[250px] max-md:h-[275px]" />
      )}

      <h2 className="mt-2 text-p text-[.9em] max-lg:text-[.93em] font-normal tracking-[-0.03em]">
        {work.title}
      </h2>
    </div>
  );
};

const WorksPage = ({ works }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <GlobalNav />

      <section className="relative pt-30 pb-30 px-4 min-h-dvh bg-s">
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
          {works.map((work) => (
            <WorksCard key={work._id} work={work} />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WorksPage;
