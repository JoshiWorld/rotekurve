/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { CardDescription } from "@/components/ui/card-hover-effect";
import { Button } from "@/components/ui/button";
import { type Link } from "@prisma/client";

export function LinksCarousel({ links }: { links: Link[] }) {
  const plugin = React.useRef(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      onMouseEnter={plugin.current.stop}
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {links.map((link, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardHeader>
                  <CardTitle>{link.title}</CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-center">
                  <Button variant="link" asChild>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">Zur Website</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
