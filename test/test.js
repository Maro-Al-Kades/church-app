"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProject } from "@/redux/api/projectApiCall";
import { useParams } from "next/navigation";

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const { project, loading, error } = useSelector((state) => state.project);
  const params = useParams();
  const { id } = params || {};

  useEffect(() => {
    dispatch(fetchSingleProject(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{project?.title}</h1>
      <p>{project?.description}</p>
      <img src={project?.image?.url} />
      <div> {project?.user?.username} </div>

    </div>
  );
};

export default ProjectDetail;