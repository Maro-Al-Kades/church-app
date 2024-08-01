"use client";

import React, { useState, useMemo } from "react";
import { projects, profiles } from "@/constants"; // Ensure you import the profiles list here
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
import { MdDelete, MdVisibility } from "react-icons/md";

// Helper function to get the user name by ID
const getUserNameById = (userId, users) => {
  const user = users.find((user) => user.id === userId);
  return user ? user.name : userId;
};

export default function AdminProjects() {
  const [page, setPage] = useState(1);
  const [projectsState, setProjectsState] = useState(projects);
  const rowsPerPage = 5;

  const handleDelete = (id) => {
    setProjectsState(projectsState.filter((project) => project._id !== id));
  };

  const handleView = (id) => {
    // Implement view logic here, e.g., navigate to project details page
    console.log("Viewing project with ID:", id);
  };

  const pages = Math.ceil(projectsState.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return projectsState.slice(start, end);
  }, [page, projectsState]);

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
        <TableColumn key="_id">ID</TableColumn>
        <TableColumn key="user">الاسم</TableColumn>
        <TableColumn key="title">اسم المشروع</TableColumn>
        <TableColumn key="actions">التعديلات</TableColumn>
      </TableHeader>

      <TableBody items={items}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "actions" ? (
                  <div className="flex gap-4">
                    <Button
                      color="danger"
                      size="sm"
                      endContent={<MdDelete />}
                      onClick={() => handleDelete(item._id)}
                      className="mr-2"
                    >
                      حذف
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      endContent={<MdVisibility />}
                      onClick={() => handleView(item._id)}
                    >
                      عرض
                    </Button>
                  </div>
                ) : columnKey === "user" ? (
                  getUserNameById(item.user, profiles)
                ) : (
                  item[columnKey]
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

// List of users
export const profiles = [
  { id: "64b2a1a6f1a7a8b123456789", name: "أحمد علي" },
  { id: "64b2a1a6f1a7a8b123456790", name: "محمد حسن" },
  { id: "64b2a1a6f1a7a8b123456791", name: "علي إبراهيم" },
  { id: "64b2a1a6f1a7a8b123456792", name: "سارة محمد" },
  { id: "64b2a1a6f1a7a8b123456793", name: "نورة خالد" },
  { id: "64b2a1a6f1a7a8b123456794", name: "حسن علي" },
];
