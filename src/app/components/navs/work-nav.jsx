"use client";
import { useState } from "react";

import Link from "next/link";
import WorkModal from "../pages/works/slug/work-modal";
import { AnimatePresence } from "framer-motion";
import Clock from "./clock-nav";

const WorkNav = ({ work }) => {
  const [workModal, setWorkModal] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 p-4 py-2 pt-4 w-full grid grid-cols-4 gap-4 items-center mix-blend-exclusion max-md:flex max-md:justify-between max-md:items-center z-200">
        <div className="flex justify-start max-md:hidden max-md:p-3 max-sm:p-2">
          <Link
            href="/"
            className="texts-global   text-s font-medium tracking-[-0.03em] truncate"
          >
            T—ML
          </Link>
        </div>

        <div className="flex justify-start gap-1 max-md:hidden">
          <Link
            href="/works"
            className="texts-global    text-s font-medium tracking-[-0.03em]"
          >
            Work,
          </Link>
          <Link
            href="/about"
            className="texts-global  text-s font-medium tracking-[-0.03em]"
          >
            About,
          </Link>
          <Link
            href="/contact"
            className="texts-global    text-s font-medium tracking-[-0.03em]"
          >
            Contact
          </Link>
        </div>

        <div className="max-md:flex justify-center gap-1 hidden">
          <Link
            href="/"
            className="texts-global   text-s font-medium tracking-[-0.03em]"
          >
            T—ML,
          </Link>
          <Link
            href="/works"
            className="texts-global    text-s font-medium tracking-[-0.03em]"
          >
            Work,
          </Link>
          <Link
            href="/about"
            className="texts-global   text-s font-medium tracking-[-0.03em]"
          >
            About,
          </Link>
          <Link
            href="/contact"
            className="texts-global   text-s font-medium tracking-[-0.03em]"
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
              <span className="texts-global   text-s font-medium tracking-[-0.03em]">
                {work.title}
              </span>
              <span className="texts-global   text-s font-medium tracking-[-0.15em]">
                —
              </span>
              <button className="hidden max-md:block texts-global  text-s font-medium tracking-[-0.03em] cursor-pointer">
                Info
              </button>
              <button className="block max-md:hidden texts-global  text-s font-medium tracking-[-0.03em] cursor-pointer">
                Information
              </button>
            </div>
          ) : null}
        </div>

        <div className="w-full flex justify-end max-md:hidden">
          <span className="texts-global   text-s font-medium tracking-[-0.03em] uppercase flex items-center gap-1">
            <Clock />
          </span>
        </div>
      </nav>

      <AnimatePresence mode="sync">
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

export default WorkNav;
