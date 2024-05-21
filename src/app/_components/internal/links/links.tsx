import { LinksTableComponent } from "@/components/table-comp";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type Link } from "@prisma/client";

export async function LinksTable() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const links = await api.link.getLinks() as Link[];

  return <LinksTableComponent links={links} />;
}