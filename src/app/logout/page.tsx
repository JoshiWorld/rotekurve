"use client";
import React from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <div className="m-40 flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
      >
        <span onClick={() => signOut()}>Ausloggen bestätigen</span>
      </HoverBorderGradient>
    </div>
  );
}
