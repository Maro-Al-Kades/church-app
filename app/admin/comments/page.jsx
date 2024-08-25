"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments, deleteComment } from "@/redux/api/commentApiCall";
import { Chip, User } from "@nextui-org/react";
import AOS from "aos";

// Define the getKeyValue function
function getKeyValue(obj, key) {
  return obj[key];
}

// Define the truncateContent function
function truncateContent(content, maxLength) {
  return content?.length > maxLength
    ? content?.substring(0, maxLength) + "..."
    : content;
}

export default function AdminComments() {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  const [page, setPage] = useState(1);
  const rowsPerPage = 12;
  const maxContentLength = 100; // Set max length for content

  useEffect(() => {
    AOS.init({ duration: 800 });
    window.scrollTo(0, 0);

    dispatch(fetchAllComments());
  }, [dispatch]);

  const pages = Math.ceil(comments?.length / rowsPerPage);

  const paginatedComments = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return comments?.slice(start, end);
  }, [page, comments]);

  const handleDelete = (commentId) => {
    dispatch(deleteComment(commentId));

    setTimeout(() => {
      dispatch(fetchAllComments());
    }, 1000);
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
            data-aos="fade-down"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
      data-aos="fade-left"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
    >
      <TableHeader>
        <TableColumn key="username" className="text-primary">
          الاسم
        </TableColumn>
        <TableColumn key="content" className="text-primary">
          التعليق
        </TableColumn>
        <TableColumn key="time" className="text-primary">
          تاريخ النشر
        </TableColumn>
        <TableColumn key="actions" className="text-primary">
          التعديلات
        </TableColumn>
      </TableHeader>

      <TableBody items={paginatedComments}>
        {(comment) => (
          <TableRow key={comment._id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "actions" ? (
                  <Button
                    color="danger"
                    size="md"
                    variant="flat"
                    endContent={<MdDelete />}
                    onClick={() => handleDelete(comment._id)}
                  >
                    حذف التعليق
                  </Button>
                ) : columnKey === "time" ? (
                  <Chip size="lg" variant="flat" color="primary">
                    {new Date(comment.createdAt).toLocaleString("ar-EG")}
                  </Chip>
                ) : columnKey === "content" ? (
                  <>
                    <div>{truncateContent(comment.text, maxContentLength)}</div>
                  </>
                ) : columnKey === "username" ? (
                  <User
                    avatarProps={{
                      radius: "lg",
                      src: comment?.user?.profilePhoto?.url,
                    }}
                    name={comment?.user?.username}
                  />
                ) : (
                  getKeyValue(comment, columnKey)
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
