import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type Link } from "@prisma/client";
import { EditLinks } from "./edit-links";

export default async function LinksEdit({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const session = await getServerAuthSession();
  if(!session) return null;

  const currentLink: Link | null = await api.link.getById({ id: slug });
  if (!currentLink) return null;

  return <EditLinks link={currentLink} />;
}
