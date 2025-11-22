"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Clock from "./clock-nav";

const GlobalNav = () => {
  const pathname = usePathname();
  const isActive = (href) => {
    if (
      pathname === "/works" ||
      pathname === "/about" ||
      pathname === "/contact"
    ) {
      return pathname === href
        ? "text-s max-md:text-s/50!"
        : "text-s/50 max-md:text-s!";
    }
    return pathname === href ? "text-s" : "text-s/50";
  };

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 p-4 py-2 pt-4 gap-4  w-full
          grid grid-cols-4 items-center mix-blend-difference
          max-md:flex max-md:justify-between max-md:items-center max-cl:p-1 max-cl:pt-5
          z-100 max-md:px-3 max-sm:px-2
        `}
      >
        {/* LEFT – DESKTOP */}
        <div className="flex content-start justify-start max-md:hidden">
          <Link
            href="/"
            className={` texts-global  max-cl:text-[.7rem] text-s! font-medium tracking-[-0.03em] ${isActive(
              "/"
            )}`}
          >
            T—ML
          </Link>
        </div>

        {/* CENTER – DESKTOP */}
        <div className="flex justify-start gap-1 max-md:hidden">
          <Link
            href="/works"
            className={` texts-global  max-cl:text-[.7rem] font-medium tracking-[-0.03em] ${isActive(
              "/works"
            )}`}
          >
            Work,
          </Link>

          <Link
            href="/about"
            className={` texts-global  max-cl:text-[.7rem] font-medium tracking-[-0.03em] ${isActive(
              "/about"
            )}`}
          >
            About,
          </Link>

          <Link
            href="/contact"
            className={` texts-global  max-cl:text-[.7rem] font-medium tracking-[-0.03em] ${isActive(
              "/contact"
            )}`}
          >
            Contact
          </Link>
        </div>

        {/* MOBILE */}
        <div className="max-md:flex justify-center gap-1 hidden">
          <Link
            href="/"
            className={` texts-global  max-cl:text-[.7rem] text-s font-medium tracking-[-0.03em] truncate
        
      `}
          >
            T—ML,
          </Link>

          <Link
            href="/works"
            className={` texts-global  max-cl:text-[.7rem] font-medium tracking-[-0.03em] ${isActive(
              "/works"
            )}`}
          >
            Work,
          </Link>

          <Link
            href="/about"
            className={` texts-global  max-cl:text-[.7rem] font-medium tracking-[-0.03em] ${isActive(
              "/about"
            )}`}
          >
            About,
          </Link>

          <Link
            href="/contact"
            className={` texts-global  max-cl:text-[.7rem] font-medium tracking-[-0.03em] ${isActive(
              "/contact"
            )}`}
          >
            Contact
          </Link>
        </div>

        {/* CLOCK */}
        <div className="w-full flex justify-end col-span-2 max-cl:hidden">
          <span className=" texts-global  max-cl:text-[.7rem] text-s font-medium tracking-[-0.03em] uppercase flex items-center gap-1">
            <Clock />
          </span>
        </div>
      </nav>
    </>
  );
};

export default GlobalNav;
