"use client";

import Image from "next/image";
import { urlFor } from "@/app/lib/sanityImage";

const WorkMedia = ({ media, title }) => {
  const getUrl = (asset) =>
    urlFor(asset).width(2400).quality(100).auto("format").url();

  const getBlur = (asset) =>
    urlFor(asset).width(20).quality(20).blur(50).auto("format").url();

  return (
    <div className="flex flex-col gap-4">
      {media?.map((item, index) => {
        const asset = item.asset;
        if (!asset) return null;

        const isVideo = asset.mimeType.startsWith("video/");
        const pos = index % 3;
        const next = media[index + 1];

        // FULLSCREEN BLOCK (1 big media)
        if (pos === 0) {
          return isVideo ? (
            <video
              key={index}
              src={asset.url}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-screen object-cover max-ds:h-[75vh] max-lg:h-[60vh] max-md:h-[250px]"
            />
          ) : (
            <Image
              key={index}
              src={getUrl(asset)}
              width={3000}
              height={3000}
              alt={item.alt || title}
              placeholder="blur"
              blurDataURL={getBlur(asset)}
              unoptimized
              className="w-full h-screen object-cover max-ds:h-[75vh] max-lg:h-[60vh] max-md:h-[250px]"
            />
          );
        }

        // 2-COLUMN GRID
        if (pos === 1 && next) {
          return (
            <div key={"group-" + index} className="grid grid-cols-2 gap-4">
              {/* LEFT ITEM */}
              {isVideo ? (
                <video
                  src={asset.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-screen object-cover max-ds:h-[75vh] max-lg:h-[50vh] max-md:h-[225px]"
                />
              ) : (
                <Image
                  src={getUrl(asset)}
                  width={3000}
                  height={3000}
                  alt={item.alt || title}
                  placeholder="blur"
                  blurDataURL={getBlur(asset)}
                  unoptimized
                  className="w-full h-screen object-cover max-ds:h-[75vh] max-lg:h-[50vh] max-md:h-[225px]"
                />
              )}

              {/* RIGHT ITEM */}
              {next.asset.mimeType.startsWith("video/") ? (
                <video
                  src={next.asset.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-screen object-cover max-ds:h-[75vh] max-lg:h-[50vh] max-md:h-[225px]"
                />
              ) : (
                <Image
                  src={getUrl(next.asset)}
                  width={3000}
                  height={3000}
                  alt={next.alt || title}
                  placeholder="blur"
                  blurDataURL={getBlur(next.asset)}
                  unoptimized
                  className="w-full h-screen object-cover max-ds:h-[75vh] max-lg:h-[50vh] max-md:h-[225px]"
                />
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default WorkMedia;
