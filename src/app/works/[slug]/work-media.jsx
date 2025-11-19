"use client";

import Image from "next/image";
import { urlFor } from "@/app/lib/sanityImage";

const WorkMedia = ({ media, title }) => {
  const getUrl = (asset) =>
    urlFor(asset).width(1600).quality(80).auto("format").url();

  return (
    <div className="flex flex-col gap-6">
      {media?.map((item, index) => {
        const asset = item.asset;
        if (!asset) return null;

        const isVideo = asset.mimeType.startsWith("video/");
        const pos = index % 3;
        const next = media[index + 1];

        // FULL WIDTH ITEM
        if (pos === 0) {
          return isVideo ? (
            <video
              key={index}
              src={asset.url}
              muted
              autoPlay
              loop
              playsInline
              className="w-full h-[75vh] object-cover max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
            />
          ) : (
            <Image
              key={index}
              src={getUrl(asset)}
              width={1600}
              height={1200}
              alt={item.alt || title}
              className="w-full h-[75vh] object-cover max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
            />
          );
        }

        // 2-COLUMN GRID
        if (pos === 1 && next) {
          return (
            <div key={"group-" + index} className="grid grid-cols-2 gap-4">
              {isVideo ? (
                <video
                  src={asset.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-[75vh] object-cover  max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
                />
              ) : (
                <Image
                  src={getUrl(asset)}
                  width={1600}
                  height={1200}
                  alt={item.alt || title}
                  className="w-full h-[75vh] object-cover  max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
                />
              )}

              {next.asset.mimeType.startsWith("video/") ? (
                <video
                  src={next.asset.url}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="w-full h-[75vh] object-cover  max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
                />
              ) : (
                <Image
                  src={getUrl(next.asset)}
                  width={1600}
                  height={1200}
                  alt={next.alt || title}
                  className="w-full h-[75vh] object-cover  max-ds:h-[550px] max-lg:h-[350px] max-md:h-[250px]"
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
