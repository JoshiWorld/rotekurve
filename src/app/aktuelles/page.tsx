import { api } from "@/trpc/server";
import { SwitchView } from "../_components/aktuelles/switch-view";

export default async function Aktuelles() {
    const posts = await api.post.getPosts();

    return <SwitchView items={posts} />;
}