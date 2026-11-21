"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransitionRouter } from "next-view-transitions";

function useSlideTransition() {
  const router = useTransitionRouter();

  const handleRouteTransition = (href) => {
    if (!document.startViewTransition) {
      router.push(href);
      return;
    }

    router.push(href, {
      onTransitionReady: () => {
        document.documentElement.animate(
          [
            { opacity: 1, transform: "translateY(0)" },
            { opacity: 0.2, transform: "translateY(-35%)" },
          ],
          {
            duration: 700,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-old(root)",
          },
        );

        document.documentElement.animate(
          [{ transform: "translateY(100%)" }, { transform: "translateY(0%)" }],
          {
            duration: 700,
            easing: "cubic-bezier(0.87, 0, 0.13, 1)",
            fill: "forwards",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      },
    });
  };

  return { handleRouteTransition };
}

export default function LinkTransition({ href, children, className }) {
  const { handleRouteTransition } = useSlideTransition();
  const nextRouter = useRouter();

  return (
    <Link
      href={href}
      prefetch={true}
      onMouseEnter={() => nextRouter.prefetch(href)}
      onClick={(e) => {
        e.preventDefault();
        handleRouteTransition(href);
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
