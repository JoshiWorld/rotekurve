import { BlogView } from "@/app/_components/aktuelles/blog-view";
import { api } from "@/trpc/server";
import { type Post } from "@prisma/client";

// date is splitted because of server side hydration
const BlogPost = async ({ params: { slug } }: { params: { slug: string } }) => {
  const currentPost: Post | null = await api.post.getPostById({id: slug});
  if(!currentPost) return;

  return (
    <p className="text-2xl">
      <BlogView post={currentPost} date={currentPost.createdAt.toLocaleDateString()} />
    </p>
  );
};

export default BlogPost;