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
            width={150}
            height={200}
            className="h-6 sm:h-9"
            alt="Rote Kurve Supporters Logo"
          />
        ) : (
          <Image
            src="/images/logo_white.png"
            width={150}
            height={200}
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
