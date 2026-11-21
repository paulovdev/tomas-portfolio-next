"use client";

import { useState } from "react";
import useDeviceMapLink from "@/hooks/useDeviceMapLink";
import { RevealText } from "@/components/ui/reveal-text";
import ContactModal from "@/components/modals/contact.modal";
import { AnimatePresence } from "framer-motion";

const ContactView = () => {
  const [contactModal, setContactModal] = useState(true);
  const locationLink = useDeviceMapLink("Las Palmas de Gran Canaria");

  const contactInfo = [
    {
      label: "Location",
      value: "Las Palmas de Gran Canaria, Spain",
      href: locationLink,
    },
    {
      label: "Socials",
      value: ["Instagram", "Linkedin", "Behance"],
      links: [
        "https://www.instagram.com/im_tomasml/",
        "https://www.linkedin.com/in/tomasmedinaleon/",
        "https://www.behance.net/tomasml",
      ],
    },
    {
      label: "Email",
      value: "hey@tomasml.com",
      href: "mailto:hey@tomasml.com",
    },
    {
      label: "Phone",
      value: "+(34) 625 551 094",
      href: "tel:+34625551094",
    },
  ];

  const animatedUnderline =
    "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-1px] max-md:after:bottom-[1px] after:w-full after:h-[2px] after:bg-black after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.76,0,0.24,1)]";
  const animatedUnderline2 =
    "relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[2px] max-md:after:bottom-[4px] after:w-full after:h-[2px] after:bg-black after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.76,0,0.24,1)]";

  return (
    <section
      className="relative w-full h-svh
        flex flex-col items-start justify-between pt-25 max-md:pt-20 overflow-hidden overscroll-none"
    >
      <div className="px-4 mb-20 flex-1 max-md:mb-10 max-md:px-3 max-sm:px-2">
        <RevealText
          as="h1"
          text="If you’d like to discuss a project or learn more about our process, please don’t hesitate to get in touch."
          className="text-[32px] text-black tracking-[-5%] leading-[80%] max-md:text-[18px]"
        />
      </div>

      <div className="px-5 mb-15 flex-3 w-full grid grid-cols-4 gap-5 border-t border-black/10 pt-5 max-md:grid-cols-1 max-md:px-2.5">
        <div>
          <RevealText
            as="h2"
            text="Contact"
            className="text-[20px] text-black tracking-[-5%] leading-none
            max-md:text-[14px]"
            delay={0.25}
          />
        </div>

        <div className="col-span-3 max-md:col-span-1 flex flex-col gap-1">
          {contactInfo.map((info, i) => {
            const itemDelay = 0.3 + i * 0.08;

            if (Array.isArray(info.value)) {
              return (
                <div
                  key={i}
                  className="text-[16px] text-black      tracking-[-5%] leading-none 
                  max-md:text-[14px] flex flex-wrap items-center "
                >
                  {info.value.map((item, idx) => (
                    <span key={idx} className="inline-flex items-center">
                      <a
                        href={info.links[idx] || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={animatedUnderline}
                      >
                        <RevealText
                          as="span"
                          text={item}
                          className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
                          delay={itemDelay + idx * 0.05}
                        />
                      </a>
                      {idx < info.value.length - 1 && (
                        <RevealText
                          as="span"
                          text=","
                          className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
                          delay={itemDelay + idx * 0.05}
                        />
                      )}
                    </span>
                  ))}
                </div>
              );
            }

            if (info.href) {
              return (
                <div
                  key={i}
                  className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
                >
                  <a
                    href={info.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={animatedUnderline}
                  >
                    <RevealText
                      as="span"
                      text={info.value}
                      className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
                      delay={itemDelay}
                    />
                  </a>
                </div>
              );
            }

            return (
              <div key={i}>
                <RevealText
                  as="p"
                  text={info.value}
                  className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
                  delay={itemDelay}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full flex-2 flex items-end">
        <div className="relative bottom-5 w-full px-5 flex justify-between items-center max-md:absolute max-md:bottom-5 max-md:px-2.5">
          <RevealText
            as="p"
            text="tomasml ©2026"
            className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
            delay={0.55}
          />

          <button
            type="button"
            onClick={() => setContactModal(true)}
            className={`${animatedUnderline2} cursor-pointer bg-transparent border-none p-0`}
          >
            <RevealText
              as="span"
              text="Send message +"
              className="text-[16px] text-black      tracking-[-5%] leading-none max-md:text-[14px]"
              delay={0.6}
            />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {contactModal && (
          <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none flex items-end justify-end ">
            <div className="pointer-events-auto w-full max-w-100">
              <ContactModal setContactModal={setContactModal} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContactView;
