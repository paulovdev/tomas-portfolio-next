"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "@/lib/sanityImage";

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
    <figure
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
            className="w-full h-100 object-cover brightness-100 group-hover:brightness-90 
            transition-[filter] duration-500 max-ds:h-90 max-lg:h-85 max-md:h-65"
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
            className="w-full h-100 object-cover brightness-100 group-hover:brightness-90 
            transition-[filter] duration-500 max-ds:h-90 max-lg:h-85 max-md:h-65"
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
            className="w-full h-100 object-cover brightness-100 group-hover:brightness-90 
            transition-[filter] duration-500 max-ds:h-90 max-lg:h-85 max-md:h-65"
          />
        )}

        <h3
          className="mt-2.5 text-[16px] text-black font-semibold tracking-[-5%] leading-[80%]
            max-md:text-[14px]"
        >
          {work.title}
        </h3>
      </Link>
    </figure>
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
      className="bg-s py-30 px-5 w-full grid grid-cols-4 gap-4 max-md:flex max-md:flex-col max-md:py-20 max-md:px-2.5"
    >
      <h2
        className="text-[16px] text-black font-semibold tracking-[-5%] leading-[80%]
            max-md:text-[14px]"
      >
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
