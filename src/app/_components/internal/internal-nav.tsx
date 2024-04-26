"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

export function InternalNav() {
  const pathname = usePathname();
  const paths = pathname.substring(1, pathname.length).split("/");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;

          return (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>
                    {path.charAt(0).toUpperCase()}
                    {path.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  <React.Fragment>
                    <BreadcrumbLink
                      href={
                        path === "internal"
                          ? `/${path}`
                          : `/internal/${path}`
                      }
                    >
                      {path.charAt(0).toUpperCase()}
                      {path.slice(1)}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                )}
              </BreadcrumbItem>
              {isLast && index !== paths.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
