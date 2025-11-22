import Nav from "@/app/components/navs/global-nav";
import Footer from "@/app/components/footer";

const services = {
  Branding: [
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
  Digital: [
    "Digital audit & consultancy",
    "Social media design",
    "Web design",
    "App design",
    "Digital visual systems",
  ],
  Print: [
    "Packaging design",
    "Corporate stationery",
    "Poster design",
    "Editorial design",
    "Print production",
  ],
};

export default function AboutPage() {
  return (
    <>
      <Nav />

      <section className="relative h-full px-4 py-35 bg-s text-p max-md:py-24">
        <h2 className="max-w-[90%] mb-25 text-[1.75em] max-ssm:text-[1.2rem] font-medium tracking-[-0.03em] leading-[1.1] max-md:mb-10 max-md:text-[1.5em] max-md:max-w-full">
          Visual creation grounded in strategy, focused on developing functional
          and contemporary identities built with intent. The approach brings
          together strategy, creative direction, and design to shape systems
          that endure over time and adapt to the digital and physical
          environments they inhabit.
        </h2>

        <div className="grid grid-cols-4 mb-25 pt-8 max-md:grid-cols-1 max-md:mb-10">
          <p className="mb-6 text-p  texts-global    font-bold tracking-[-0.03em]">
            Services
          </p>
          {/* MOBILE */}

          <div className="max-md:flex max-md:flex-col hidden">
            {/* Branding */}
            <div>
              <p className="mb-6 border-b border-black/10 text-p texts-global font-bold tracking-[-0.03em]">
                Branding
              </p>
              <ul className="mb-6 flex items-start justify-between gap-8">
                <div className="flex-[1.3] w-full flex-col items-start">
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Brand audit & consultancy
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] ">
                    Creative direction
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Brand identity
                  </li>{" "}
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Visual identity
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] ">
                    Verbal identity
                  </li>
                </div>
                <div className="flex-1 w-full flex-col items-start">
                  {" "}
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] ">
                    Brand strategy
                  </li>{" "}
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Art direction
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Logo design
                  </li>{" "}
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] ">
                    Naming
                  </li>
                </div>
              </ul>
            </div>

            {/* Digital */}
            <div>
              <p className="mb-6 border-b border-black/10 text-p texts-global font-bold tracking-[-0.03em]">
                Digital
              </p>
              <ul className="mb-6 flex items-start justify-between gap-8">
                <div className="flex-[1.3] w-full flex-col items-start">
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] truncate">
                    Digital audit & consultancy
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] ">
                    Social media design
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] truncate">
                    Digital visual systems
                  </li>
                </div>
                <div className="flex-1 w-full flex-col items-start">
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Web design
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] ">
                    App design
                  </li>
                </div>
              </ul>
            </div>

            {/* Print */}
            <div>
              <p className="mb-6 border-b border-black/10 text-p texts-global font-bold tracking-[-0.03em]">
                Print
              </p>
              <ul className="mb-6 flex items-start justify-between gap-8">
                <div className="flex-[1.3] w-full flex-col items-start">
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Packaging design
                  </li>{" "}
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] ">
                    Editorial design
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Poster design
                  </li>
                </div>{" "}
                <div className="flex-1 w-full flex-col items-start">
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em] ">
                    Corporate stationery
                  </li>
                  <li className="mb-1 text-p texts-global font-medium tracking-[-0.03em]">
                    Print production
                  </li>
                </div>
              </ul>
            </div>
          </div>

          {/* DESKTOP */}
          {Object.entries(services).map(([category, items]) => (
            <div key={category} className="max-md:hidden block">
              <p className="mb-6 border-b border-black/10 text-p  text-[.9em]  max-lg:text-[.93em]   font-bold tracking-[-0.03em]">
                {category}
              </p>
              <ul className="mr-6 ">
                {items.map((item, i) => (
                  <li
                    key={i}
                    className="text-p  text-[.9em]  max-lg:text-[.93em]  font-medium tracking-[-0.03em]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-4 gap-8 mb-32 border-t border-black/10 pt-8 max-md:mb-10 max-md:grid-cols-1">
          <p className="text-p  texts-global    font-bold tracking-[-0.03em]">
            About
          </p>
          <p className="col-span-3 text-[1.75em]  max-ssm:text-[1.2rem] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
            Hi, I’m Tomás, based in the Canary Islands, Spain. I’ve been a
            graphic designer since 2020, specializing in brand strategy, art
            direction, brand communication, and digital design creation. I work
            for brands, but I design for people: listening, collaborating, and
            creating unique projects. My design philosophy is about building
            brands from within, brands with intention, purpose and a clear
            voice, not just visual appeal.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
