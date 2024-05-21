"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { type Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { StartGrid } from "./start-grid";
import { PostListView } from "./list-view";
import { AktuellesHeadSparkles } from "./main-header";

export function SwitchView({ items }: { items: Post[] }) {
    const [isExtendedView, setIsExtendedView] = useState<boolean>(() => {
      const cachedValue = localStorage ? localStorage.getItem("isExtendedView") : false;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return cachedValue ? JSON.parse(cachedValue) : false;
    });

    useEffect(() => {
      // Update local storage when state changes
      localStorage.setItem("isExtendedView", JSON.stringify(isExtendedView));
    }, [isExtendedView]);

    const handleToggle = () => {
        setIsExtendedView((prev) => !prev);
    }

    return (
      <div className="mt-1 flex flex-col items-center gap-2">
        <AktuellesHeadSparkles />

        <div className="flex items-center space-x-2">
          <Switch
            id="switch-view"
            checked={isExtendedView}
            onClick={handleToggle}
          />
          <Label htmlFor="switch-view">Erweiterte Ansicht</Label>
        </div>

        {isExtendedView ? (
          <PostListView items={items} />
        ) : (
          <StartGrid items={items} />
        )}
      </div>
    );
}
