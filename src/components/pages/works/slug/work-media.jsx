"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanityImage";

const FULL_MEDIA_STYLE =
  "w-full h-screen object-cover max-ds:h-[75vh] max-lg:h-[60vh] max-md:h-[250px]";

const GRID_MEDIA_STYLE =
  "w-full h-screen object-cover max-ds:h-[75vh] max-lg:h-[50vh] max-md:h-[225px]";

function resolveMediaUrl(asset, isVideo) {
  if (!asset) return null;
  if (isVideo) return asset.url || null;

  const built = urlFor(asset)?.quality(100)?.auto("format")?.url();
  return built || asset.url || null;
}

function buildMediaGroups(media = []) {
  if (!Array.isArray(media)) return [];
  const validItems = media.filter((item) => Boolean(item?.asset));
  const groups = [];
  let i = 0;

  while (i < validItems.length) {
    const pos = i % 3;

    if (pos === 0) {
      groups.push({
        type: "single",
        items: [validItems[i]],
        key: validItems[i].asset._id || `single-${i}`,
      });
      i += 1;
      continue;
    }

    const next = validItems[i + 1];
    if (next) {
      groups.push({
        type: "pair",
        items: [validItems[i], next],
        key: `pair-${validItems[i].asset._id || i}-${next.asset._id || i + 1}`,
      });
      i += 2;
    } else {
      groups.push({
        type: "single",
        items: [validItems[i]],
        key: validItems[i].asset._id || `last-${i}`,
      });
      i += 1;
    }
  }

  return groups;
}

const VideoPlayer = ({ src, poster, altText, className, eager = false }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(eager);
  const [isNearOrVisible, setIsNearOrVisible] = useState(eager);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const active = entry.isIntersecting;
          setIsNearOrVisible(active);
          if (active) {
            setShouldLoad(true);
          }
        });
      },
      { rootMargin: "300px 0px", threshold: 0.05 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldLoad) return;

    if (isNearOrVisible) {
      el.muted = true;
      const promise = el.play();
      if (promise && typeof promise.catch === "function") {
        promise.catch(() => {});
      }
    } else if (!eager) {
      el.pause();
    }
  }, [shouldLoad, isNearOrVisible, eager, src]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black/5"
    >
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        aria-label={altText}
        muted
        autoPlay
        loop
        playsInline
        preload={shouldLoad ? "metadata" : "none"}
        className={className}
      />
    </div>
  );
};

const LazyImage = ({ src, altText, className, isPriority, lqip }) => {
  const wrapperRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(isPriority);

  useEffect(() => {
    if (isPriority) {
      setShouldRender(true);
      return;
    }

    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldRender(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "350px 0px", threshold: 0.01 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isPriority]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-full overflow-hidden bg-black/5"
    >
      {shouldRender ? (
        <Image
          src={src}
          width={3000}
          height={3000}
          alt={altText}
          priority={isPriority}
          unoptimized
          sizes="(max-width: 768px) 100vw, 100vw"
          placeholder={lqip ? "blur" : "empty"}
          blurDataURL={lqip}
          className={className}
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
          className={`${className} scale-105 blur-sm`}
        />
      )}
    </div>
  );
};

const MediaSlot = ({
  item,
  fallbackTitle,
  className,
  isPriority = false,
  eagerMedia = false,
}) => {
  const asset = item?.asset;
  if (!asset) return null;

  const isVideo =
    Boolean(asset.mimeType?.startsWith("video/")) ||
    /\.(mp4|webm|mov|m4v)(\?|$)/i.test(asset.url || "");

  const src = resolveMediaUrl(asset, isVideo);
  if (!src) return null;

  const altText = item?.alt || `${fallbackTitle} — Tomás Medina León`;
  const lqip = asset.metadata?.lqip;

  if (isVideo) {
    return (
      <VideoPlayer
        src={src}
        poster={lqip}
        altText={altText}
        className={className}
        eager={eagerMedia}
      />
    );
  }

  return (
    <LazyImage
      src={src}
      altText={altText}
      className={className}
      isPriority={isPriority}
      lqip={lqip}
    />
  );
};

const WorkMedia = ({ media = [], title = "" }) => {
  const groups = useMemo(() => buildMediaGroups(media), [media]);

  if (!groups.length) return null;

  let flatIndex = 0;

  return (
    <div className="flex flex-col gap-4">
      {groups.map((group) => {
        if (group.type === "single") {
          const currentIndex = flatIndex;
          flatIndex += 1;

          return (
            <MediaSlot
              key={group.key}
              item={group.items[0]}
              fallbackTitle={title}
              className={FULL_MEDIA_STYLE}
              isPriority={currentIndex === 0}
              eagerMedia={currentIndex === 0}
            />
          );
        }

        const leftIndex = flatIndex;
        const rightIndex = flatIndex + 1;
        flatIndex += 2;

        return (
          <div
            key={group.key}
            className="grid grid-cols-2 gap-4 max-md:grid-cols-1"
          >
            <MediaSlot
              item={group.items[0]}
              fallbackTitle={title}
              className={GRID_MEDIA_STYLE}
              isPriority={leftIndex === 0}
              eagerMedia={leftIndex === 0}
            />
            <MediaSlot
              item={group.items[1]}
              fallbackTitle={title}
              className={GRID_MEDIA_STYLE}
              eagerMedia={rightIndex === 0}
            />
          </div>
        );
      })}
    </div>
  );
};

export default WorkMedia;
