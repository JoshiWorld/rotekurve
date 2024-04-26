import { EditPostForm } from "@/app/_components/internal/posts/edit-post";
import { api } from "@/trpc/server";
import { type Post } from "@prisma/client";

export default async function PostsEdit({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const currentPost: Post | null = await api.post.getPostById({ id: slug });
  if (!currentPost) return null;

  return <EditPostForm post={currentPost} />;
}
