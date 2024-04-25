import { api } from "@/trpc/server";
import { StartGrid } from "../_components/aktuelles/start-grid";

export default async function Aktuelles() {
    const posts = await api.post.getPosts();
    return (
      <div className="mt-8 flex flex-col items-center gap-2">
        <StartGrid items={posts} />
      </div>
    );
}