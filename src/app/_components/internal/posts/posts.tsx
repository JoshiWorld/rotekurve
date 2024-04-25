import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { PostsTableComponent } from "../../../../components/table-comp";

export async function PostsTable() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const posts = await api.post.getPosts();

    // return <TableTest posts={posts} />;
    return <PostsTableComponent posts={posts} />;
}