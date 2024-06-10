import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type SocialLinks } from "@prisma/client";
import { EditKontakts } from "./edit-links";

export default async function KontaktEdit({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const session = await getServerAuthSession();
  if(!session) return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-redundant-type-constituents
  const currentLink: SocialLinks | null = await api.contact.getSocialById({ id: slug });
  if (!currentLink) return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <EditKontakts link={currentLink} />;
}
