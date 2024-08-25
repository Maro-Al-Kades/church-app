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
import { MdBackHand, MdDelete } from "react-icons/md";
import { GiBackForth } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchAllCategories,
} from "@/redux/api/categoryApiCall";
import Link from "next/link";
import AOS from "aos";
import { toast } from "react-toastify";

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    AOS.init({ duration: 800 });
    window.scrollTo(0, 0);

    dispatch(fetchAllCategories());
  }, [dispatch]);

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages =
    categories.length > 0 ? Math.ceil(categories.length / rowsPerPage) : 1;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return categories.slice(start, end);
  }, [page, categories]);

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));

    setTimeout(() => {
    dispatch(fetchAllCategories());
    }, 100);
  };

  return (
    <div
      className="p-4"
      data-aos="fade-left"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
    >
      <div className="p-4">
        <Button
          color="warning"
          as={Link}
          href="/admin"
          endContent={<GiBackForth size={18} />}
        >
          الرجوع الي لوحة التحكم
        </Button>
      </div>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center mt-4">
            <Pagination
              showControls
              showShadow
              color="primary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="id" className="text-lg text-primary">
            ID
          </TableColumn>
          <TableColumn key="name" className="text-lg text-primary">
            اسم القسم
          </TableColumn>
          <TableColumn key="actions" className="text-lg text-primary">
            التعديلات
          </TableColumn>
        </TableHeader>

        <TableBody items={items}>
          {(item) => (
            <TableRow key={item?._id}>
              <TableCell className="text-md">{item?._id}</TableCell>
              <TableCell className="text-md font-bold">{item?.title}</TableCell>
              <TableCell>
                <Button
                  color="danger"
                  size="md"
                  endContent={<MdDelete />}
                  onPress={() => handleDelete(item?._id)}
                  variant="flat"
                >
                  حذف القسم
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
