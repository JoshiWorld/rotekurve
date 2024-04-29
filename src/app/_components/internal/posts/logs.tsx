/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { type Log } from "@prisma/client";

export function LogView({log}: {log: Log}) {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>
        {/* @ts-expect-error || updatedBy is always true */}
        {log.updatedBy} ({log.createdAt.toLocaleDateString()})
      </AlertTitle>
      <AlertDescription
        dangerouslySetInnerHTML={{ __html: log.updatedContent || "" }}
      />
    </Alert>
  );
}
