"use client";

import React, { useState, useMemo } from "react";
import { comments } from "@/constants";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { Button } from "@nextui-org/button";
import { MdDelete } from "react-icons/md";

// Define the getKeyValue function
function getKeyValue(obj, key) {
  return obj[key];
}

export default function AdminComments() {
  const [page, setPage] = useState(1);
  const [commentsState, setCommentsState] = useState(comments);
  const rowsPerPage = 12;
  const maxContentLength = 500; // Set max length for content

  const handleDelete = (id) => {
    setCommentsState(commentsState.filter((comment) => comment._id !== id));
  };

  const pages = Math.ceil(commentsState.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return commentsState.slice(start, end);
  }, [page, commentsState]);

  const truncateContent = (content) => {
    return content.length > maxContentLength
      ? content.substring(0, maxContentLength) + "..."
      : content;
  };

  return (
    <Table
      aria-label="Example table with client side pagination"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
    >
      <TableHeader>
        <TableColumn key="username" className="text-primary">
          الاسم
        </TableColumn>
        <TableColumn key="content" className="text-primary">
          التعليق
        </TableColumn>
        <TableColumn key="actions" className="text-primary">
          التعديلات
        </TableColumn>
      </TableHeader>

      <TableBody items={items}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "actions" ? (
                  <Button
                    color="danger"
                    size="sm"
                    endContent={<MdDelete />}
                    onClick={() => handleDelete(item._id)}
                  >
                    حذف التعليق
                  </Button>
                ) : columnKey === "content" ? (
                  truncateContent(getKeyValue(item, columnKey))
                ) : (
                  getKeyValue(item, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
