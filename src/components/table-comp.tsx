"use client";

import { type Post } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export function PostsTableComponent({ posts }: { posts: Post[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
        totalPosts={posts.length}
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