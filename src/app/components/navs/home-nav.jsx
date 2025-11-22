"use client";

import Link from "next/link";
import Clock from "./clock-nav";

const HomeNav = () => {
  return (
    <>
      <nav
        className={`
    fixed top-0 left-0 p-4 py-2 pt-4 gap-4  w-full
    grid grid-cols-4 items-center max-md:px-3 max-sm:px-2 max-md:flex max-md:justify-between max-md:items-center
    z-100
     
  `}
      >
        <div className="flex justify-start max-md:hidden">
          <Link
            href="/"
            className={`  texts-global  text-s font-medium tracking-[-0.03em]
        
      `}
          >
            T—ML
          </Link>
        </div>

        <div className="flex justify-start  gap-1 max-md:hidden">
          <Link
            href="/works"
            className={`  texts-global  text-s font-medium tracking-[-0.03em]
       
      `}
          >
            Work,
          </Link>

          <Link
            href="/about"
            className={`  texts-global  text-s font-medium tracking-[-0.03em]
       
      `}
          >
            About,
          </Link>

          <Link
            href="/contact"
            className={`  texts-global  text-s font-medium tracking-[-0.03em]
     
      `}
          >
            Contact
          </Link>
        </div>

        <div className="max-md:flex justify-center  gap-1 hidden">
          <Link
            href="/"
            className={`  texts-global  text-s font-medium tracking-[-0.03em] truncate
        
      `}
          >
            T—ML,
          </Link>
          <Link
            href="/works"
            className={`  texts-global  text-s font-medium tracking-[-0.03em]`}
          >
            Work,
          </Link>

          <Link
            href="/about"
            className={`  texts-global  text-s font-medium tracking-[-0.03em]`}
          >
            About,
          </Link>

          <Link
            href="/contact"
            className={`  texts-global  text-s font-medium tracking-[-0.03em]`}
          >
            Contact
          </Link>
        </div>

        <div className="w-full flex justify-end col-span-2 ">
          <span className="  texts-global  text-s font-medium tracking-[-0.03em] uppercase flex items-center gap-1">
            <Clock />
          </span>
        </div>
      </nav>
    </>
  );
};

export default HomeNav;
