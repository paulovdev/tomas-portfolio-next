"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanityImage";

const mediaClass =
  "w-full h-[350px] object-cover brightness-100 group-hover:brightness-90 transition-[filter] duration-300 max-ds:h-[300px] max-lg:h-[225px] max-md:h-[225px] max-mmd:h-[200px] max-sm:h-[150px]";

const titleClass =
  "mt-2 text-[16px] text-black font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]";

function resolveHighQualityUrl(asset, isVideo) {
  if (!asset) return null;
  if (isVideo) return asset.url || null;

  const built = urlFor(asset)?.quality(100)?.auto("format")?.url();
  return built || asset.url || null;
}

const RelatedVideo = ({ src, poster, alt, className, active }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !active) return;

    el.muted = true;
    const promise = el.play();
    if (promise && typeof promise.catch === "function") {
      promise.catch(() => {});
    }

    return () => {
      el.pause();
    };
  }, [active, src]);

  return (
    <video
      ref={videoRef}
      src={active ? src : undefined}
      poster={poster}
      aria-label={alt}
      className={className}
      muted
      loop
      playsInline
      preload={active ? "metadata" : "none"}
    />
  );
};

const RelatedCard = ({ work, index, shouldLoad }) => {
  const first = work.media2?.[0];
  const asset = first?.asset;
  if (!asset) return null;

  const isVideo =
    Boolean(asset.mimeType?.startsWith("video/")) ||
    /\.(mp4|webm|mov|m4v)(\?|$)/i.test(asset.url || "");

  const src = resolveHighQualityUrl(asset, isVideo);
  if (!src) return null;

  const altText = first?.alt || `${work.title} — Tomás Medina León`;
  const lqip = asset.metadata?.lqip;

  return (
    <article
      className={`relative overflow-hidden group ${
        index === 2 ? "max-lg:hidden" : ""
      }`}
    >
      <Link href={`/works/${work.slug}`} className="block cursor-pointer">
        {isVideo ? (
          <RelatedVideo
            src={src}
            poster={lqip}
            alt={altText}
            className={mediaClass}
            active={shouldLoad}
          />
        ) : shouldLoad ? (
          <Image
            src={src}
            width={1600}
            height={1100}
            alt={altText}
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            placeholder={lqip ? "blur" : "empty"}
            blurDataURL={lqip}
            className={mediaClass}
          />
        ) : (
          <div
            aria-label={altText}
            style={
              lqip
                ? {
                    backgroundImage: `url(${lqip})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
            className={`${mediaClass} bg-black/5 scale-105 blur-sm`}
          />
        )}

        <h3 className={titleClass}>{work.title}</h3>
      </Link>
    </article>
  );
};

export default function RelatedWorks({ relatedWorks = [] }) {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || shouldLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "250px 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [shouldLoad]);

  if (!Array.isArray(relatedWorks) || !relatedWorks.length) return null;

  return (
    <section
      ref={sectionRef}
      data-nosnippet
      className="bg-s py-30 px-4 w-full grid grid-cols-4 gap-4 max-md:flex max-md:flex-col max-md:py-20 max-md:px-3 max-sm:px-2"
    >
      <h2 className="text-[16px] text-black font-semibold font-instrument tracking-[-5%] leading-none max-md:text-[14px]">
        Related Works
      </h2>

      <div className="w-full grid grid-cols-3 gap-4 col-span-3 max-lg:grid-cols-2">
        {relatedWorks.map((work, index) => (
          <RelatedCard
            key={work.slug || work._id || index}
            work={work}
            index={index}
            shouldLoad={shouldLoad}
          />
        ))}
      </div>
    </section>
  );
}
