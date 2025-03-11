"use client";

import React from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { type Post } from "@prisma/client";

// date is splitted because of server side hydration
export function BlogView({ post, date }: { post: Post, date: string }) {
  const modifiedContent = post.content
    .replace(/<i>/g, '<i class="font-thin">')
    .replace(/<em>/g, '<em class="font-thin">');

  return (
    <div className="flex flex-col overflow-hidden md:pt-28">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                {post.title}
              </span>
              <br />
            </h1>
          </>
        }
      >
        {post.image ? (
          <div className="w-full">
            <Image
              src={`${post.image}`}
              alt="hier sollte ein bild sein"
              height={720}
              width={1400}
              className="mx-auto aspect-auto h-auto w-full rounded-2xl object-left-top"
              draggable={false}
              style={{
                objectFit: "cover",
              }}
            />
          </div>
        ) : (
          <Skeleton />
        )}
      </ContainerScroll>

      <div
        className="container w-full md:pt-36"
        dangerouslySetInnerHTML={{ __html: modifiedContent || "" }}
      />
    </div>
  );
}

const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800"></div>
);