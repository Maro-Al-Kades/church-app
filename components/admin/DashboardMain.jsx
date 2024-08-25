"use client";

import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  FaFolder,
  FaProjectDiagram,
  FaRegComments,
  FaUsers,
} from "react-icons/fa";
import AddCategoryForm from "./AddCategoryForm";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "@/redux/api/categoryApiCall";
import { getUsersCount } from "@/redux/api/profileApiCall";
import { getProjectsCount } from "@/redux/api/projectApiCall";

import { useEffect } from "react";
import { fetchAllComments } from "@/redux/api/commentApiCall";
import AOS from "aos";


const DashboardMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { projectsCount } = useSelector((state) => state.project);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    AOS.init({ duration: 800 });
    window.scrollTo(0, 0);

    dispatch(fetchAllCategories());
    dispatch(getUsersCount());
    dispatch(getProjectsCount());
    dispatch(fetchAllComments());
  }, [dispatch]);

  return (
    <div
      className="flex-1 p-8 border border-primary/20 rounded-xl gap-8"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <Card fullWidth>
          <CardHeader className="font-semibold text-primary text-xl">
            المستخدمين
          </CardHeader>
          <CardBody className="text-right text-2xl font-bold">
            {usersCount}
          </CardBody>
          <CardFooter className="flex flex-row items-center justify-between">
            <Button
              endContent={<FaUsers size={20} />}
              fullWidth
              color="secondary"
              variant="flat"
              as={Link}
              href="admin/users"
            >
              كل المستخدمين
            </Button>
          </CardFooter>
        </Card>
        <Card fullWidth>
          <CardHeader className="font-semibold text-primary text-xl">
            المشاريع
          </CardHeader>
          <CardBody className="text-right text-2xl font-bold">
            {projectsCount}
          </CardBody>
          <CardFooter className="flex flex-row items-center justify-between">
            <Button
              endContent={<FaProjectDiagram size={20} />}
              fullWidth
              color="secondary"
              variant="flat"
              as={Link}
              href="admin/projects"
            >
              كل المشاريع
            </Button>
          </CardFooter>
        </Card>
        <Card fullWidth>
          <CardHeader className="font-semibold text-primary text-xl">
            الاقسام
          </CardHeader>
          <CardBody className="text-right text-2xl font-bold">
            {categories?.length}
          </CardBody>
          <CardFooter className="flex flex-row items-center justify-between">
            <Button
              endContent={<FaFolder size={20} />}
              fullWidth
              color="secondary"
              variant="flat"
              as={Link}
              href="admin/categories"
            >
              كل الاقسام
            </Button>
          </CardFooter>
        </Card>
        <Card fullWidth>
          <CardHeader className="font-semibold text-primary text-xl">
            التعليقات
          </CardHeader>
          <CardBody className="text-right text-2xl font-bold">
            {comments?.length}
          </CardBody>
          <CardFooter className="flex flex-row items-center justify-between">
            <Button
              endContent={<FaRegComments size={20} />}
              fullWidth
              color="secondary"
              variant="flat"
              as={Link}
              href="admin/comments"
            >
              كل التعليقات
            </Button>
          </CardFooter>
        </Card>
      </div>

      <AddCategoryForm />
    </div>
  );
};

export default DashboardMain;
