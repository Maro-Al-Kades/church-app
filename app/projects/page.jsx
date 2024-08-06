"use client";

import PaginationComp from "@/components/PaginationComp";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, getProjectsCount } from "@/redux/api/projectApiCall";
import ProjectItem from "@/components/projects/ProjectItem";
import { Spinner } from "@nextui-org/react";

const PROJECTS_PER_PAGE = 6;

const Projects = () => {
  const dispatch = useDispatch();
  const { projectsCount, projects } = useSelector((state) => state.project);

  const [currentPage, setCurrentPage] = useState(1); // Default to 1
  const pages = Math.ceil(projectsCount / PROJECTS_PER_PAGE);

  useEffect(() => {
    dispatch(fetchProjects(currentPage));
  }, [currentPage, dispatch]); // Added dispatch to dependency array

  useEffect(() => {
    dispatch(getProjectsCount());
  }, [dispatch]); // Added dispatch to dependency array

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary pb-8 flex items-center justify-center">
        جميع مشاريع الكنيسة في الكرازة
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
        {projects.length > 0 ? (
          projects.map((item) => <ProjectItem key={item._id} project={item} />)
        ) : (
          <div className="text-primary text-3xl font-bold flex w-full mx-auto items-center justify-center">
            <Spinner
              label="جاري تحميل المشروع الخاصة بالكنيسة..."
              color="primary"
            />
          </div>
        )}
      </div>

      <PaginationComp
        pages={pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Projects;
