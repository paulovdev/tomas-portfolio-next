"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import Clock from "./clock";
import WorkModal from "../modals/work-modal";
import Link from "next/link";

export const Nav = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isActive = (href) => {
    if (isHome) {
      return "text-white font-semibold";
    }
    if (
      pathname === "/works" ||
      pathname === "/about" ||
      pathname === "/contact"
    ) {
      return pathname === href
        ? "text-white max-md:text-white/50!"
        : "text-white/50 max-md:text-white!";
    }
    return pathname === href ? "text-white" : "text-white/50";
  };

  return (
    <nav
      data-nosnippet
      className={`
        fixed top-0 left-0 p-5 py-2 pt-5 gap-5 w-full
        grid grid-cols-4 items-center ${isHome ? "" : "mix-blend-exclusion"}
        max-md:flex max-md:justify-between max-md:items-center 
        z-100 max-md:px-2.5 transition-colors duration-500 
      `}
    >
      {/* LEFT – DESKTOP */}
      <div className="flex content-start justify-start max-md:hidden">
        <Link
          href="/"
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] truncate ${
            isHome ? "text-white" : "text-white"
          }`}
        >
          T—ML
        </Link>
      </div>

      {/* CENTER – DESKTOP */}
      <div className="flex justify-start gap-1 max-md:hidden">
        <Link
          href="/works"
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] ${isActive(
            "/works",
          )}`}
        >
          Works,
        </Link>

        <Link
          href="/about"
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] ${isActive(
            "/about",
          )}`}
        >
          About,
        </Link>

        <Link
          href="/contact"
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] ${isActive(
            "/contact",
          )}`}
        >
          Contact
        </Link>
      </div>

      {/* MOBILE */}
      <div className="max-md:flex justify-center gap-1 hidden">
        <Link
          href="/"
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] truncate ${
            isHome ? "text-white" : "text-white"
          }`}
        >
          T—ML,
        </Link>

        <Link
          href="/works"
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] ${isActive(
            "/works",
          )}`}
        >
          Works,
        </Link>

        <Link
          href="/about"
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] ${isActive(
            "/about",
          )}`}
        >
          About,
        </Link>

        <Link
          href="/contact"
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] ${isActive(
            "/contact",
          )}`}
        >
          Contact
        </Link>
      </div>

      {/* CLOCK */}
      <div className="w-full flex justify-end col-span-2 max-cl:hidden">
        <span
          className={`text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] uppercase 
        flex items-center gap-1 ${isHome ? "text-white" : "text-white"}`}
        >
          <Clock />
        </span>
      </div>
    </nav>
  );
};

export const WorkNav = ({ work }) => {
  const [workModal, setWorkModal] = useState(false);

  return (
    <>
      <nav
        className={`
        fixed top-0 left-0 p-5 py-2 pt-5 gap-5 w-full
        grid grid-cols-4 items-center mix-blend-exclusion
        max-md:flex max-md:justify-between max-md:items-center 
        z-100 max-md:px-2.5 transition-colors duration-500 text-white
      `}
      >
        <div className="flex justify-start max-md:hidden">
          <Link
            href="/"
            className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] truncate"
          >
            T—ML
          </Link>
        </div>

        <div className="flex justify-start gap-1 max-md:hidden">
          <Link
            href="/works"
            className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
          >
            Works,
          </Link>
          <Link
            href="/about"
            className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
          >
            About,
          </Link>
          <Link
            href="/contact"
            className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
          >
            Contact
          </Link>
        </div>

        <div className="max-md:flex justify-center gap-1 hidden">
          <Link
            href="/"
            className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
          >
            T—ML,
          </Link>
          <Link
            href="/works"
            className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
          >
            Works,
          </Link>
          <Link
            href="/about"
            className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
          >
            About,
          </Link>
          <Link
            href="/contact"
            className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]"
          >
            Contact
          </Link>
        </div>

        <div className="flex justify-center">
          {work ? (
            <div
              className="w-full flex items-center gap-1 cursor-pointer"
              onClick={() => setWorkModal(true)}
            >
              <span className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]">
                {work.title}
              </span>
              <span className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px]">
                —
              </span>
              <button
                className="hidden max-md:block 
              text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] cursor-pointer"
              >
                Info
              </button>
              <button
                className="block max-md:hidden 
              text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] cursor-pointer"
              >
                Information
              </button>
            </div>
          ) : null}
        </div>

        <div className="w-full flex justify-end max-md:hidden">
          <span className="text-[16px] font-medium font-instrument tracking-[-5%] leading-none max-md:text-[14px] uppercase flex items-center gap-1">
            <Clock />
          </span>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {workModal && work && (
          <WorkModal
            work={work}
            workModal={workModal}
            setWorkModal={setWorkModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};
