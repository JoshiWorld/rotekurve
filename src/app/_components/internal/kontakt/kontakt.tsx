import { SocialTableComponent } from "@/components/table-comp";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export async function SocialsTable() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const links = await api.contact.getSocials();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <SocialTableComponent links={links} />;
}