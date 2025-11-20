"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { urlFor } from "@/app/lib/sanityImage";

export default function RelatedWorks({ relatedWorks }) {
  const router = useRouter();

  return (
    <section className="py-30 px-4 w-full grid grid-cols-4 gap-4 max-md:flex max-md:flex-col">
      <h2 className="text-p text-[.9em] font-semibold tracking-[-0.03em]">
        Related Works
      </h2>

      <div className="w-full grid grid-cols-3 gap-4 col-span-3 max-lg:grid-cols-2">
        {relatedWorks.map((work) => {
          const asset = work.media?.[0]?.asset;
          if (!asset) return null;

          const isVideo = asset.mimeType.startsWith("video/");
          const thumb = !isVideo ? urlFor(asset).width(800).url() : null;

          return (
            <div
              key={work.slug}
              className="relative cursor-pointer overflow-hidden group"
              onClick={() => router.push(`/works/${work.slug}`)}
            >
              {isVideo ? (
                <video
                  src={asset.url}
                  className="w-full h-[350px] object-cover brightness-100 group-hover:brightness-75 transition-all max-ds:h-[300px] max-lg:h-[225px] max-md:h-[175px]"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : (
                <Image
                  src={thumb}
                  width={800}
                  height={600}
                  alt={work.media?.[0]?.alt || work.title}
                  className="w-full h-[350px] object-cover brightness-100 group-hover:brightness-75 transition-all max-ds:h-[300px] max-lg:h-[225px] max-md:h-[175px]"
                />
              )}

              <h3 className="mt-2 text-p text-[.9em] font-medium tracking-[-0.03em]">
                {work.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
