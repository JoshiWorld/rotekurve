import { CreateLink } from "@/app/_components/internal/links/create-link";
import { LinksTable } from "@/app/_components/internal/links/links";
import { getServerAuthSession } from "@/server/auth";

export default async function Posts() {
  const session = await getServerAuthSession();

  if (!session) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <LinksTable />
      <CreateLink />
    </div>
  );
}
