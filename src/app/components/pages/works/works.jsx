"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
      className="relative mb-10 group overflow-hidden cursor-pointer max-md:mb-0"
      onClick={() => handleOpen(work.slug)}
    >
      {isVideo ? (
        <video
          src={asset.url}
          className="w-full h-[500px] object-cover brightness-100 group-hover:brightness-75 transition-all max-ds:h-[350px] max-lg:h-[275px] max-md:h-[250px] max-cl:h-[100px]"
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
          className="w-full h-[500px] object-cover brightness-100 group-hover:brightness-75 transition-all max-ds:h-[350px] max-lg:h-[275px] max-md:h-[250px] max-cl:h-[100px]"
        />
      ) : null}

      <h2 className="mt-2 text-p text-[.9em]  max-lg:text-[.93em]  max-ssm:text-[.85rem] max-cl:text-[.7rem] font-medium tracking-[-0.03em]">
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

      <section className="relative py-30 px-4 min-h-screen bg-s  max-md:pb-20 max-cl:py-15 max-md:px-3 max-sm:px-2 max-cl:p-1">
        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
          {works.map((work, i) => (
            <motion.figure
              className="overflow-hidden size-full mb-4"
              key={work._id}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 1,
                  ease: [0.33, 1, 0.68, 1],
                  delay: i * 0.075,
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
              }}
            >
              <WorksCard work={work} />
            </motion.figure>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default WorksPage;
