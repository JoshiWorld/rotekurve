import { EditUserForm } from "@/app/_components/internal/user/edit-user";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type User } from "@prisma/client";

export default async function PostsEdit({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const session = await getServerAuthSession();
  if (!session) return null;

  const currentUser: User | null = await api.user.getById({ id: slug });
  if (!currentUser) return null;

  return <EditUserForm user={currentUser} />;
}
