import { CreatePost } from "@/app/_components/internal/posts/create-post";
import { PostsTable } from "@/app/_components/internal/posts/posts";
import { getServerAuthSession } from "@/server/auth";

export default async function Posts() {
    const session = await getServerAuthSession();

    if(!session) return null;

    return (
      <div className="mt-8 flex flex-col items-center gap-2">
        <PostsTable />
        <CreatePost />
      </div>
    );
}