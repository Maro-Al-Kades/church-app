"use client";

import React, { useEffect, useState } from "react";
import ProjectItem from "./ProjectItem";
import axios from "axios";
import { Spinner } from "@nextui-org/spinner";

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/projects/");
        setProjects(response.data);
      } catch (error) {
        setError(error.message || "Error fetching projects");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-primary text-3xl font-bold flex items-center justify-center">
        <Spinner
          label="جاري تحميل المشروع الخاصة بالكنيسة..."
          color="primary"
        />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {projects.length > 0 ? (
        projects.map((item) => <ProjectItem key={item._id} project={item} />)
      ) : (
        <p>لا يوجد مشاريع في الوقت الحالي</p>
      )}
    </div>
  );
};

export default ProjectsList;
