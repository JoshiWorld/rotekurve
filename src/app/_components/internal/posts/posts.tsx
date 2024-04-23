import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { type Post } from "@prisma/client";
import { PostsTableComponent } from "../../../../components/table-comp";

export async function PostsTable() {
    const session = await getServerAuthSession();
    if (!session?.user) return null;

    const posts = await api.post.getPosts();

    // return <TableTest posts={posts} />;
    return <PostsTableComponent posts={posts} />;
}

function TableTest({ posts }: { posts: Post[] }) {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400 rtl:text-right">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Titel
              </th>
              <th scope="col" className="px-6 py-3">
                Erstellt
              </th>
              <th scope="col" className="px-6 py-3">
                Zuletzt bearbeitet
              </th>
              <th scope="col" className="px-6 py-3">
                Archiviert
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Bearbeiten</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => (
              <tr
                key={index}
                className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {post.title.length > 30
                    ? post.title.substring(0, 50) + "..."
                    : post.title}
                </th>
                <td className="px-6 py-4">
                  {post.createdAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {post.updatedAt.toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{post.archieved ? "Ja" : "Nein"}</td>
                <td className="px-6 py-4 text-right">
                  <a
                    href="#"
                    className="font-medium text-primary hover:underline"
                  >
                    Bearbeiten
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}