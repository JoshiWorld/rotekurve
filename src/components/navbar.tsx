"use client";

import * as React from "react";
import { ThemeSwitch } from "./theme-switch";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type NavbarItem = {
  title: string;
  href: string;
};

const navbarItems: NavbarItem[] = [
  {
    title: "Aktuelles",
    href: "/aktuelles",
  },
  {
    title: "Über uns",
    href: "/about-us",
  },
  // {
  //   title: "Spielplan",
  //   href: "/spielplan",
  // },
  {
    title: "Links",
    href: "/links",
  },
  {
    title: "Kontakt",
    href: "/contact",
  },
];

export function Nav() {
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();
  const windowSize = useWindowSize();
  // @ts-expect-error || @ts-ignore
  const isMobile = windowSize.width <= 640;

  return (
    <Navbar
      fluid
      rounded
      className="z-20 bg-background shadow-xl dark:bg-background dark:shadow-md dark:shadow-gray-600"
    >
      <NavbarBrand href="https://rotekurve-supporters.de">
        {resolvedTheme === "dark" ? (
          <Image
            src="/images/logo_black.png"
            width={isMobile ? 100 : 150}
            height={isMobile ? 150 : 200}
            className="h-6 sm:h-9"
            alt="Rote Kurve Supporters Logo"
          />
        ) : (
          <Image
            src="/images/logo_white.png"
            width={isMobile ? 100 : 150}
            height={isMobile ? 150 : 200}
            className="h-6 sm:h-9"
            alt="Rote Kurve Supporters Logo"
          />
        )}
        {/* <span className="self-center whitespace-nowrap text-xl font-semibold">
          Rote Kurve
        </span> */}
      </NavbarBrand>
      <div className="flex md:order-2">
        <ThemeSwitch />
        <NavbarToggle />
      </div>
      <NavbarCollapse>
        {navbarItems.map((item, index) => (
          <NavbarLink
            active={pathname === item.href}
            key={index}
            href={item.href}
          >
            {item.title}
          </NavbarLink>
        ))}
      </NavbarCollapse>
    </Navbar>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        // @ts-expect-error || @ts-ignore
        width: window.innerWidth,
        // @ts-expect-error || @ts-ignore
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}