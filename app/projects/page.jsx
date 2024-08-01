import PaginationComp from "@/components/PaginationComp";
import ProjectsList from "@/components/projects/ProjectsList";
import React from "react";

const Projects = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary pb-8 flex items-center justify-center">
        جميع مشاريع الكنيسة في الكرازة
      </h1>

      <ProjectsList />

      <PaginationComp />
    </div>
  );
};

export default Projects;
