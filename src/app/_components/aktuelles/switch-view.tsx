"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { type Post } from "@prisma/client";
import { useState } from "react";
import { StartGrid } from "./start-grid";
import { PostListView } from "./list-view";

export function SwitchView({ items }: { items: Post[] }) {
    const [isExtendedView, setIsExtendedView] = useState<boolean>(false);

    const handleToggle = () => {
        setIsExtendedView((prev) => !prev);
    }

    return (
      <div className="mt-8 flex flex-col items-center gap-2">
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
