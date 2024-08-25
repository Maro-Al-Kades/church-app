"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Button,
} from "@nextui-org/react";
import { FaRegEye } from "react-icons/fa";
import { CiTrash } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getAllUsersProfiles } from "@/redux/api/profileApiCall";
import { GiBackForth } from "react-icons/gi";
import Link from "next/link";
import { Pagination } from "@nextui-org/pagination";
import AOS from "aos";

const statusColorMap = {
  active: "success",
  paused: "warning",
  vacation: "warning",
};

const columns = [
  { name: "الاسم", uid: "username" },
  { name: "الصلاحية", uid: "role" },
  { name: "التوثيق", uid: "status" },
  { name: "التعديلات", uid: "actions" },
];

export default function App() {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    AOS.init({ duration: 800 });
    window.scrollTo(0, 0);

    dispatch(getAllUsersProfiles());
  }, [isProfileDeleted]);

  const pages =
    profiles?.users?.length > 0
      ? Math.ceil(profiles.users?.length / rowsPerPage)
      : 0;

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return profiles?.users?.slice(start, end) || [];
  }, [page, profiles]);

  // Delete User Handler
  const deleteUserHandler = (userId) => {
    dispatch(deleteProfile(userId));
  };

  return (
    <>
      <div className="p-4">
        <Button
          color="warning"
          as={Link}
          href="/admin"
          endContent={<GiBackForth size={18} />}
        >
          الرجوع إلي لوحة التحكم
        </Button>
      </div>

      <Table
        data-aos="fade-left"
        data-aos-anchor-placement="top-bottom"
        data-aos-once="true"
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              className="text-md font-bold text-primary"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item?._id}>
              <TableCell>
                <User
                  avatarProps={{ radius: "lg", src: item?.profilePhoto?.url }}
                  description={item?.email}
                  name={item?.username}
                />
              </TableCell>
              <TableCell>{item?.isAdmin ? "ادمن" : "مستخدم"}</TableCell>
              <TableCell>
                <Chip
                  className="capitalize"
                  color={
                    item?.isAccountVerified
                      ? statusColorMap.active
                      : statusColorMap.paused
                  }
                  size="sm"
                  variant="flat"
                >
                  {item?.isAccountVerified ? "تم التوثيق" : "غير موثق"}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="relative flex items-center justify-center gap-3">
                  <Button
                    endContent={<FaRegEye size={18} />}
                    size="sm"
                    as={Link}
                    href={`/profile/${item?._id}`}
                    target="_blank"
                  >
                    الملف الشخصي
                  </Button>
                  <Button
                    endContent={<CiTrash size={18} />}
                    color="danger"
                    variant="flat"
                    size="sm"
                    onClick={() => deleteUserHandler(item?._id)}
                  >
                    حذف المستخدم
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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
    </>
  );
}
