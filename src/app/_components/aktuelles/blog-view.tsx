"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { type Post } from "@prisma/client";

// date is splitted because of server side hydration
export function BlogView({ post, date }: { post: Post, date: string }) {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              {post.title} <br />
              <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                {date}
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`${post.image}`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>

      <div className="container w-full">{post.content}</div>
    </div>
  );
}