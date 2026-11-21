"use client";

import useDeviceMapLink from "@/hooks/useDeviceMapLink";
import { RevealText } from "@/components/ui/reveal-text";

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/im_tomasml/" },
  { label: "Linkedin", href: "https://www.linkedin.com/in/tomasmedinaleon/" },
  { label: "Behance", href: "https://www.behance.net/tomasml" },
];

const animatedUnderline =
  "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[2px] max-md:after:bottom-[1px] after:w-full after:h-[2px] after:bg-black after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.76,0,0.24,1)]";

const Footer = () => {
  const locationLink = useDeviceMapLink("Las Palmas de Gran Canaria");
  const copyrightText = `tomasml ©${new Date().getFullYear()}`;
  const locationText = "Las Palmas de Gran Canaria, Spain";

  return (
    <footer
      data-nosnippet
      className="relative p-2.5 w-full border-t border-black/10 grid grid-cols-4 
    max-md:flex max-md:justify-between max-lg:items-end max-lg:gap-5"
    >
      {/* DESKTOP */}
      <div className="w-full max-lg:w-1/2 max-md:hidden">
        <RevealText
          as="p"
          text={copyrightText}
          className={`text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px] truncate`}
          delay={0.1}
          exit={false}
        />
      </div>

      <div className="w-full flex flex-col items-start col-start-3 max-lg:col-start-2 max-lg:col-span-2 max-md:hidden">
        <a
          href={locationLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`${animatedUnderline} truncate`}
        >
          <RevealText
            text={locationText}
            className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
            delay={0.15}
            exit={false}
          />
        </a>

        <div className="flex flex-wrap items-center">
          {socials.map((item, idx) => (
            <span key={item.label} className="inline-flex items-center">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={animatedUnderline}
              >
                <RevealText
                  text={item.label}
                  className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
                  delay={0.2 + idx * 0.05}
                  exit={false}
                />
              </a>
              {idx < socials.length - 1 && (
                <RevealText
                  text=","
                  className={`text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px] mr-[0.2em]`}
                  delay={0.2 + idx * 0.05}
                  exit={false}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start col-start-4 max-md:hidden">
        <a href="mailto:hey@tomasml.com" className={`${animatedUnderline}`}>
          <RevealText
            text="hey@tomasml.com"
            className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
            delay={0.35}
            exit={false}
          />
        </a>
        <a href="tel:+34625551094" className={`${animatedUnderline}`}>
          <RevealText
            text="+(34) 625 551 094"
            className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
            delay={0.4}
            exit={false}
          />
        </a>
      </div>

      {/* MOBILE */}
      <div className="w-full flex-col items-start max-md:flex hidden">
        <div className="flex flex-col items-start">
          <a
            href={locationLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`${animatedUnderline} truncate`}
          >
            <RevealText
              text={locationText}
              className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
              delay={0.15}
              exit={false}
            />
          </a>

          <div className="flex flex-wrap items-center">
            {socials.map((item, idx) => (
              <span key={item.label} className="inline-flex items-center">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={animatedUnderline}
                >
                  <RevealText
                    text={item.label}
                    className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
                    delay={0.2 + idx * 0.05}
                    exit={false}
                  />
                </a>
                {idx < socials.length - 1 && (
                  <RevealText
                    text=","
                    className={`text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px] mr-[0.2em]`}
                    delay={0.2 + idx * 0.05}
                    exit={false}
                  />
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start">
          <a href="mailto:hey@tomasml.com" className={`${animatedUnderline}`}>
            <RevealText
              text="hey@tomasml.com"
              className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
              delay={0.35}
              exit={false}
            />
          </a>
          <a href="tel:+34625551094" className={`${animatedUnderline}`}>
            <RevealText
              text="+(34) 625 551 094"
              className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
              delay={0.4}
              exit={false}
            />
          </a>
        </div>
      </div>

      <div className="w-1/3 max-md:flex items-end justify-end hidden">
        <RevealText
          as="p"
          text={copyrightText}
          className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px] truncate"
          delay={0.1}
          exit={false}
        />
      </div>
    </footer>
  );
};

export default Footer;
