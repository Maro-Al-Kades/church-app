"use client";

import CommentsWrapper from "@/components/comments/CommentsWrapper";

import { useParams } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";

import AOS from "aos";
import "aos/dist/aos.css";

import ProjectDetailsHeader from "@/components/projects/ProjectDetailsHeader";
import ProjectsDetailsProfile from "@/components/projects/ProjectsDetailsProfile";

const ProjectDetails = () => {
  const params = useParams();
  const { id } = params || {};

  return (
    <section className="flex flex-col gap-12">
      <ProjectDetailsHeader />

      <ProjectsDetailsProfile id={id} />

      <CommentsWrapper />
    </section>
  );
};

export default ProjectDetails;
