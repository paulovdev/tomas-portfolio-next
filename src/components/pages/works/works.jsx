"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

import { urlFor } from "@/lib/sanityImage";
import { Nav } from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import { RevealText } from "@/components/ui/reveal-text";

const cardTitleStyle =
  "text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]";

const mediaSizeStyle =
  "w-full h-[500px] object-cover brightness-100 group-hover:brightness-90 transition-[filter] duration-300 max-ds:h-[350px] max-lg:h-[275px] max-md:h-[250px] max-cl:h-[100px]";

function resolveHighQualityUrl(asset, isVideo) {
  if (!asset) return null;
  if (isVideo) return asset.url;
  try {
    return urlFor(asset).quality(100).auto("format").url();
  } catch {
    return asset.url;
  }
}

const WorksCard = ({ work, index = 0 }) => {
  const first = work.media2?.[0];
  const asset = first?.asset;

  if (!asset) return null;

  const isVideo = Boolean(asset.mimeType?.startsWith("video/"));
  const isPriority = index < 2;

  const src = useMemo(
    () => resolveHighQualityUrl(asset, isVideo),
    [asset, isVideo],
  );

  if (!src) return null;

  return (
    <article className="relative mb-10 group overflow-hidden max-md:mb-0">
      <Link href={`/works/${work.slug}`} className="block cursor-pointer">
        {isVideo ? (
          <video
            src={src}
            aria-label={first.alt || work.title}
            className={mediaSizeStyle}
            muted
            loop
            autoPlay={index < 4}
            playsInline
            preload={index < 4 ? "metadata" : "none"}
          />
        ) : (
          <Image
            src={src}
            width={2000}
            height={1200}
            priority={isPriority}
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
            alt={first.alt || `${work.title} — Tomás Medina León`}
            placeholder={asset.metadata?.lqip ? "blur" : "empty"}
            blurDataURL={asset.metadata?.lqip}
            className={mediaSizeStyle}
          />
        )}

        <div className="mt-2 min-h-[16px]">
          <RevealText
            as="h2"
            text={work.title}
            className={cardTitleStyle}
            delay={Math.min(0.08 + index * 0.02, 0.25)}
            exit={false}
          />
        </div>
      </Link>
    </article>
  );
};

const WorksPage = ({ works = [] }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <>
      <Nav />

      <main className="relative py-30 px-4 min-h-screen bg-s max-md:pb-20 max-cl:py-15 max-md:px-3 max-sm:px-2 max-cl:p-1">
        <h1 className="sr-only">
          Selected Works — Branding, Visual Identity & Art Direction | Trabajos
          Seleccionados — Identidad Visual y Dirección de Arte
        </h1>

        <div className="grid grid-cols-4 gap-4 max-md:grid-cols-1 max-lg:grid-cols-3">
          {works.map((work, i) => (
            <WorksCard key={work._id || work.slug || i} work={work} index={i} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default WorksPage;
