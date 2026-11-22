"use client";

import { RevealText } from "@/components/ui/reveal-text";

const aboutData = {
  intro:
    "Visual creation grounded in strategy, focused on developing functional and contemporary identities built with intent. The approach brings together strategy, creative direction, and design to shape systems that endure over time and adapt to the digital and physical environments they inhabit.",
  services: [
    {
      title: "Branding",
      items: [
        "Brand audit & consultancy",
        "Brand strategy",
        "Art direction",
        "Creative direction",
        "Brand identity",
        "Verbal identity",
        "Visual identity",
        "Naming",
        "Logo design",
      ],
    },
    {
      title: "Digital",
      items: [
        "Digital audit & consultancy",
        "Social media design",
        "Web design",
        "App design",
        "Digital visual systems",
      ],
    },
    {
      title: "Print",
      items: [
        "Packaging design",
        "Corporate stationery",
        "Poster design",
        "Editorial design",
        "Print production",
      ],
    },
  ],
  bio: {
    label: "About",
    text: "Hi, I’m Tomás, based in the Canary Islands, Spain. I’ve been a graphic designer since 2020, specializing in brand strategy, art direction, brand communication, and digital design creation. I work for brands, but I design for people: listening, collaborating, and creating unique projects. My design philosophy is about building brands from within, brands with intention, purpose and a clear voice, not just visual appeal.",
  },
  footer: {
    updated: "Updated — March 2026",
    archive: "Tomás ARCHIVE",
  },
};

export default function AboutView() {
  return (
    <main className="pt-25 pb-25 px-5 flex flex-col justify-between max-md:px-2.5 max-md:pt-20">
      <div className="flex flex-col gap-25 max-md:gap-10">
        {/* Intro */}
        <section className="grid-cols-1 max-w-400 max-lg:max-w-full">
          <div className="col-start-2 col-span-full">
            <RevealText
              as="h1"
              text={aboutData.intro}
              className="text-[32px] text-black font-semibold tracking-[-5%] leading-[80%] max-md:text-[18px]"
              exit={false}
            />
          </div>
        </section>

        {/* Services */}
        <section className="flex flex-col pt-5">
          <div className="grid grid-cols-4 items-start max-md:grid-cols-1 max-md:gap-8">
            <div className="col-span-1">
              <RevealText
                as="h2"
                text="Services"
                className="text-[16px] text-black font-semibold tracking-[-5%] leading-[80%]
            max-md:text-[14px]"
                exit={false}
              />
            </div>

            {aboutData.services.map((category, i) => (
              <div key={category.title} className="col-span-1 flex flex-col">
                <div className="border-b border-neutral-200 pb-2 mb-2 pr-5 max-md:pb-2 max-md:mb-3 max-md:pr-0">
                  <RevealText
                    as="h3"
                    text={category.title}
                    className="text-[16px] text-black font-semibold tracking-[-5%] leading-[80%]
            max-md:text-[14px]"
                    delay={0.25 + i * 0.1}
                    exit={false}
                  />
                </div>

                <ul className="flex flex-col pr-5 max-md:pr-0 max-md:grid max-md:grid-cols-2">
                  {category.items.map((item, j) => (
                    <li key={item}>
                      <RevealText
                        as="span"
                        text={item}
                        className="text-[16px] text-black font-semibold tracking-[-5%] leading-[80%]
            max-md:text-[14px]"
                        delay={0.3 + j * 0.05}
                        exit={false}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Bio / About */}
        <section className="flex flex-col pt-5">
          <div className="grid grid-cols-4 items-start max-md:grid-cols-1 max-md:gap-10">
            <div className="col-span-1">
              <RevealText
                as="h2"
                text={aboutData.bio.label}
                className="text-[16px] text-black font-semibold tracking-[-5%] leading-[80%]
            max-md:text-[14px]"
                delay={0.5}
                exit={false}
              />
            </div>
            <div className="col-span-3">
              <RevealText
                as="p"
                text={aboutData.bio.text}
                className="text-[32px] text-black font-semibold tracking-[-5%] leading-[80%] max-md:text-[18px]"
                delay={0.55}
                exit={false}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
