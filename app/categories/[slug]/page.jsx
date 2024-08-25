"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjectsBasedOnCategory } from "@/redux/api/projectApiCall";

import { useParams } from "next/navigation";
import ProjectItem from "@/components/projects/ProjectItem";
import { Spinner } from "@nextui-org/react";

const CategoryProjectsPage = () => {
  const params = useParams();
  const { slug } = params || {};

  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.project);
  const loading = useSelector((state) => state.project.loading);
  const categories = useSelector((state) => state.project.categories);

  useEffect(() => {
    dispatch(fetchProjectsBasedOnCategory(slug));
  }, [dispatch, slug]);

  if (loading) {
    return (
      <div className="text-primary text-3xl font-bold flex w-full mx-auto items-center justify-center">
        <Spinner color="primary" title="جاري تحميل المشاريع..." />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl text-primary font-bold pb-6 lg:py-10">
        المشاريع
      </h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {projects?.map((project) => (
          <li>
            <ProjectItem key={project.id} project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryProjectsPage;
