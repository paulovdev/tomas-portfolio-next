"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

import { urlFor } from "@/lib/sanityImage";
import { Nav } from "@/components/layout/nav";

const SLIDE_DURATION = 3000;
const EASE_EXPO = [0.87, 0, 0.13, 1];
const EASE_ENTRANCE = [0.76, 0, 0.24, 1];

const entranceAnim = {
  initial: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.04 },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: 1.1, ease: EASE_ENTRANCE },
  },
};

const slideAnim = {
  initial: { clipPath: "inset(0% 100% 0% 0%)" },
  animate: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE_EXPO },
  },
  exit: {
    clipPath: "inset(0% 0% 0% 100%)",
    transition: { duration: 1.1, ease: EASE_EXPO },
  },
};

function resolveHighQualityMediaUrl(item) {
  if (!item?.asset) return null;
  if (item.asset.mimeType?.startsWith("video/")) {
    return item.asset.url;
  }
  try {
    return urlFor(item.asset).quality(100).auto("format").url();
  } catch {
    return item.asset.url;
  }
}

export default function HomePage({ media = [] }) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);

  const mediaCount = media.length;

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    stopTimer();
    if (mediaCount <= 1) return;

    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % mediaCount);
    }, SLIDE_DURATION);
  }, [mediaCount, stopTimer]);

  useEffect(() => {
    if (!mediaCount) return;

    startTimer();

    const handleVisibility = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stopTimer();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [mediaCount, startTimer, stopTimer]);

  const mediaItems = useMemo(
    () =>
      media.map((item, idx) => {
        const isVideo = Boolean(item?.asset?.mimeType?.startsWith("video/"));
        const baseAlt =
          item?.alt ||
          `Tomás — Graphic & Visual Identity Designer en Canarias (${idx + 1})`;

        return {
          id: item?.asset?._id || `slide-${idx}`,
          alt: `${baseAlt} — Tomás Medina León`,
          rawAlt: baseAlt,
          url: resolveHighQualityMediaUrl(item),
          isVideo,
          lqip: item?.asset?.metadata?.lqip,
          createdAt: item?._createdAt || "2026-01-01T00:00:00Z",
        };
      }),
    [media],
  );

  const structuredData = useMemo(() => {
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Tomás Medina León",
      alternateName: "T—ML",
      jobTitle: [
        "Graphic & Visual Identity Designer",
        "Brand Designer",
        "Art Director",
        "Diseñador Gráfico y de Identidad Visual",
        "Director de Arte",
      ],
      knowsLanguage: ["en", "es"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Las Palmas de Gran Canaria",
        addressRegion: "Canarias",
        addressCountry: "ES",
      },
      sameAs: [
        "https://www.instagram.com/im_tomasml/",
        "https://www.linkedin.com/in/tomasmedinaleon/",
        "https://www.behance.net/tomasml",
      ],
    };

    if (!mediaItems.length) return [personSchema];

    const current = mediaItems[index % mediaItems.length];
    if (!current.isVideo) return [personSchema];

    const videoSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: `${current.rawAlt} — Tomás Medina León`,
      description:
        "Visual creation grounded in strategy. Graphic designer (diseñador gráfico) based in the Canary Islands specializing in brand strategy, art direction, and digital design.",
      thumbnailUrl: current.lqip || current.url,
      uploadDate: current.createdAt,
      contentUrl: current.url,
      inLanguage: ["en", "es"],
    };

    return [personSchema, videoSchema];
  }, [index, mediaItems]);

  if (!mediaItems.length) return null;

  const safeIndex = index % mediaItems.length;
  const current = mediaItems[safeIndex];
  const nextItem = mediaItems[(safeIndex + 1) % mediaItems.length];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {nextItem && !nextItem.isVideo && nextItem.url && (
        <link rel="prefetch" as="image" href={nextItem.url} />
      )}

      <Nav />

      <main className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-black">
        <h1 className="sr-only">
          Tomás — Graphic & Visual Identity Designer en Canarias
        </h1>
        <p className="sr-only">
          Visual creation grounded in strategy. Hi, I’m Tomás, a graphic
          designer (diseñador gráfico) based in the Canary Islands, specializing
          in brand strategy, art direction, and digital design.
        </p>

        <motion.div
          className="relative w-full h-full will-change-[clip-path,transform]"
          variants={entranceAnim}
          initial="initial"
          animate="animate"
        >
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={current.id}
              className="absolute inset-0 w-full h-full will-change-[clip-path]"
              variants={slideAnim}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {current.isVideo ? (
                <video
                  src={current.url}
                  className="absolute inset-0 w-full h-full object-cover scale-[1.01]"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-label={current.alt}
                />
              ) : (
                <Image
                  src={current.url}
                  alt={current.alt}
                  fill
                  priority={safeIndex === 0}
                  unoptimized
                  sizes="100vw"
                  className="object-cover scale-[1.01]"
                  placeholder={current.lqip ? "blur" : "empty"}
                  blurDataURL={current.lqip}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </>
  );
}
