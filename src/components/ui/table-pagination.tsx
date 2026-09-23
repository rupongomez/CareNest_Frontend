import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

const getButtonArray = (totalPages: number) => {
  return Array.from({ length: totalPages }, (_, index) => index + 1);
};

export default function TablePagination() {
  const totalPages = 7;
  console.log(getButtonArray(totalPages));
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>

        {getButtonArray(totalPages).map((item) => (
          <PaginationItem key={item}>
            <PaginationLink>{item}</PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink>
            <PaginationEllipsis />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
