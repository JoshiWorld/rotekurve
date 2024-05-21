import * as React from "react";
import { type Link } from "@prisma/client";
import { LinksCarousel } from "../_components/links/link-carousel";
import { api } from "@/trpc/server";

export default async function Links() {
  const links = await api.link.getLinks() as Link[];

  return(
    <div className="flex flex-col items-center justify-center space-y-4 pt-5">
      <LinksCarousel links={links} />
    </div>
  )
}
