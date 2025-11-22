"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { urlFor } from "@/app/lib/sanityImage";

export default function RelatedWorks({ relatedWorks }) {
  const router = useRouter();

  return (
    <section className="bg-s py-30 px-4 w-full grid grid-cols-4 gap-4 max-md:flex max-md:flex-col max-md:py-20 max-md:px-3 max-sm:px-2">
      <h2 className="text-p texts-global font-semibold tracking-[-0.03em]">
        Related Works
      </h2>

      <div className="w-full grid grid-cols-3 gap-4 col-span-3 max-lg:grid-cols-2">
        {relatedWorks.map((work, index) => {
          const asset = work.media?.[0]?.asset;
          if (!asset) return null;

          const isVideo = asset.mimeType.startsWith("video/");
          const thumb = !isVideo ? urlFor(asset).width(1200).url() : null;

          return (
            <div
              key={work.slug}
              className={`
        relative cursor-pointer overflow-hidden group

        ${index === 2 ? "max-lg:hidden" : ""} 
        /* ↑ esconde o 3º projeto no max-lg */
      `}
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
                  className="w-full h-[350px] object-cover brightness-100 group-hover:brightness-75 transition-all max-ds:h-[300px] max-lg:h-[50vh] max-md:h-[225px]"
                />
              )}

              <h3 className="mt-2 text-p texts-global font-medium tracking-[-0.03em]">
                {work.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}
