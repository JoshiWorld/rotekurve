import { LinksTableComponent } from "@/components/table-comp";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export async function LinksTable() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const links = await api.link.getLinks();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <LinksTableComponent links={links} />;
}