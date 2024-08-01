"use client";

import React, { useState, useMemo } from "react";
import { categories } from "@/constants";
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

export default function AdminCategories() {
  const [page, setPage] = useState(1);
  const [categoriesState, setCategoriesState] = useState(categories);
  const rowsPerPage = 12;

  const pages = Math.ceil(categoriesState.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return categoriesState.slice(start, end);
  }, [page, categoriesState]);

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
        <TableColumn key="id">ID</TableColumn>
        <TableColumn key="content">اسم القسم</TableColumn>
        <TableColumn key="actions">التعديلات</TableColumn>
      </TableHeader>

      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "actions" ? (
                  <Button color="danger" size="sm" endContent={<MdDelete />}>
                    حذف القسم
                  </Button>
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
