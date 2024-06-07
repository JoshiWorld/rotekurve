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

  return (
    <Navbar
      fluid
      rounded
      className="bg-background shadow-xl dark:bg-background dark:shadow-md dark:shadow-gray-600 z-20"
    >
      <NavbarBrand href="https://rotekurve.de">
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          {/* Rotekurve */}
        </span>
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
