/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { type Post, type Link } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { api } from "@/trpc/react";

export function PostsTableComponent({ posts }: { posts: Post[] }) {
  const [postsList, setPostsList] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postsList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
    setPostsList(posts);
  }, [posts]);

  return (
    <div className="container overflow-x-auto">
      <div className="min-w-full overflow-x-auto">
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
            {currentPosts.map((post, index) => (
              <TableRow
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-zinc-900"
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
                    href={`/internal/posts/${post.id}`}
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

      <PaginationTable
        postsPerPage={postsPerPage}
        totalPosts={postsList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export function LinksTableComponent({ links }: { links: Link[] }) {
  const [linksList, setLinksList] = useState<Link[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentLink = linksList.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
    setLinksList(links);
  }, [links]);

  const delLink = api.link.delete.useMutation({
    onSuccess: () => {
      window.location.reload();
    }
  });

  return (
    <div className="container overflow-x-auto">
      <div className="min-w-full overflow-x-auto">
        <Table>
          <TableHead>
            <TableHeadCell>Titel</TableHeadCell>
            <TableHeadCell>Beschreibung</TableHeadCell>
            <TableHeadCell>Link</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Bearbeiten</span>
            </TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Löschen</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {currentLink.map((link, index) => (
              <TableRow
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-zinc-900"
              >
                <TableCell className="font-medium text-gray-900 dark:text-white">
                  {link.title.length > 30
                    ? link.title.substring(0, 50) + "..."
                    : link.title}
                </TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-white">
                  {link.description.length > 30
                    ? link.description.substring(0, 50) + "..."
                    : link.description}
                </TableCell>
                <TableCell className="font-medium text-gray-900 dark:text-white">
                  {link.href.length > 30
                    ? link.href.substring(0, 50) + "..."
                    : link.href}
                </TableCell>
                <TableCell>
                  <a
                    href={`/internal/links/${link.id}`}
                    className="font-medium text-primary hover:underline"
                  >
                    Bearbeiten
                  </a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="secondary"
                    onClick={() => delLink.mutate({ id: link.id })}
                    disabled={delLink.isPending}
                  >
                    <TrashIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <PaginationTable
        postsPerPage={postsPerPage}
        totalPosts={linksList.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

const PaginationTable = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = [];

  // Calculate total number of pages
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  // return (
  //   <nav>
  //     <ul className="pagination">
  //       {pageNumbers.map((number) => (
  //         <li key={number} className="page-item">
  //           <a onClick={() => paginate(number)} href="#" className="page-link">
  //             {number}
  //           </a>
  //         </li>
  //       ))}
  //     </ul>
  //   </nav>
  // );

  const handlePrev = () => {
    if (currentPage === 1) return;
    paginate(currentPage - 1);
  }

  const handleNext = () => {
    if (currentPage === pageNumbers.length) return;
    paginate(currentPage + 1);
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem hidden={currentPage === 1}>
          <PaginationPrevious onClick={handlePrev} className="cursor-pointer" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem hidden={currentPage === pageNumbers.length}>
          <PaginationNext onClick={handleNext} className="cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

type PaginationProps = {
  postsPerPage: number;
  totalPosts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};