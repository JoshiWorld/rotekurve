import { type Post } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

export function PostsTableComponent({ posts }: { posts: Post[] }) {
  return (
    <div className="container overflow-x-auto">
      <Table>
        <TableHead>
          <TableHeadCell>Titel</TableHeadCell>
          <TableHeadCell>Erstellt</TableHeadCell>
          <TableHeadCell>Zuletzt bearbeitet</TableHeadCell>
          <TableHeadCell>Archiviert</TableHeadCell>
          <TableHeadCell>
            <span className="sr-only">Bearbeiten</span>
          </TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {posts.map((post, index) => (
            <TableRow
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-slate-800"
            >
              <TableCell className="font-medium text-gray-900 dark:text-white">
                {post.title.length > 30
                  ? post.title.substring(0, 50) + "..."
                  : post.title}
              </TableCell>
              <TableCell>{post.createdAt.toLocaleDateString()}</TableCell>
              <TableCell>{post.updatedAt.toLocaleDateString()}</TableCell>
              <TableCell>{post.archieved ? "Ja" : "Nein"}</TableCell>
              <TableCell>
                <a
                  href="#"
                  className="font-medium text-primary hover:underline"
                >
                  Bearbeiten
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
