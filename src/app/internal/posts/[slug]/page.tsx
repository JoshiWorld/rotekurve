import { EditPostForm } from "@/app/_components/internal/posts/edit-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type Log, type Post } from "@prisma/client";

export default async function PostsEdit({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const session = await getServerAuthSession();
  if(!session) return null;

  const currentPost: Post | null = await api.post.getPostById({ id: slug });
  if (!currentPost) return null;
  // const logs: Log[] | null = await api.log.getLogs({ id: currentPost.id });

  // return <EditPostForm post={currentPost} logs={logs} />;
  return <EditPostForm post={currentPost} />;
}
