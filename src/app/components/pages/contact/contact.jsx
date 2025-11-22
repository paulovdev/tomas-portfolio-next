"use client";
import { useState } from "react";
import ContactModal from "../../contact-modal";
import { AnimatePresence } from "framer-motion";
import GlobalNav from "../../navs/global-nav";
import useDeviceMapLink from "@/app/hooks/useDeviceMapLink";

const ContactPage = () => {
  const [contactModal, setContactModal] = useState(true);

  // hook detectando iOS / Android / Desktop
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

  return (
    <>
      <GlobalNav />

      <section
        className="relative w-full h-svh max-md:h-[calc(var(--vh)*100)]
        flex flex-col items-start justify-between pt-35 max-md:pt-24 bg-s text-p"
      >
        <div className="px-4 mb-20 flex-1 max-md:mb-15">
          <h2 className="text-[1.75em] max-ssm:text-[1.2rem] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
            If you’d like to discuss a project or learn more about our process,
          </h2>
          <h2 className="text-[1.75em] max-ssm:text-[1.2rem] font-medium tracking-[-0.03em] leading-[1.1] max-md:text-[1.5em]">
            please don’t hesitate to get in touch.
          </h2>
        </div>

        <div className="px-4 mb-15 flex-3 w-full grid grid-cols-4 gap-8 border-t border-black/10 pt-8">
          <p className="text-p texts-global font-bold tracking-[-0.03em]">
            Contact
          </p>

          <div className="col-span-3 space-y-0.5">
            {contactInfo.map((info, i) => {
              if (Array.isArray(info.value)) {
                return (
                  <p
                    key={i}
                    className="text-p texts-global font-medium tracking-[-0.03em]"
                  >
                    {info.value.map((item, idx) => (
                      <a
                        key={idx}
                        href={info.links[idx] || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {item}
                        {idx < info.value.length - 1 ? ", " : ""}
                      </a>
                    ))}
                  </p>
                );
              }

              if (info.href) {
                return (
                  <p
                    key={i}
                    className="text-p texts-global font-medium tracking-[-0.03em]"
                  >
                    <a
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {info.value}
                    </a>
                  </p>
                );
              }

              return (
                <p
                  key={i}
                  className="text-p texts-global font-medium tracking-[-0.03em]"
                >
                  {info.value}
                </p>
              );
            })}
          </div>
        </div>

        <div className="w-full flex-2 flex items-end">
          <p className="relative bottom-4 w-full px-4 text-p text-[.9em] max-lg:text-[.93em] font-medium tracking-[-0.05em] max-md:absolute max-md:bottom-4">
            ©T—ML 2025
          </p>
          <AnimatePresence>
            {contactModal && <ContactModal setContactModal={setContactModal} />}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
