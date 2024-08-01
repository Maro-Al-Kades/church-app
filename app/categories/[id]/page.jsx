"use client";

import ProjectItem from "@/components/projects/ProjectItem";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryID = () => {
  const router = useRouter();
  const { id } = router.query; // Get ID from router.query

  const [category, setCategory] = useState(null);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(""); // To store error messages

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const url = `http://localhost:8000/api/categories/${id}`;
        try {
          const response = await axios.get(url);
          setCategory(response.data.singleCategory); // Ensure this matches your API response structure
          setProjects(response.data.projects); // Set projects data
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("فشل تحميل البيانات، يرجى المحاولة لاحقًا.");
          setIsLoading(false);
        }
      } else {
        console.log("ID is undefined or empty");
        setError("معرف القسم غير محدد.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <h2 className="flex items-center justify-center text-3xl text-primary font-bold">
        {isLoading
          ? "Loading..."
          : error
          ? error
          : `جميع مشروعات الكنيسة في قسم ${category?.title}`}
      </h2>

      {!isLoading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
          {projects.map((item) => (
            <ProjectItem key={item._id} project={item} />
          ))}
        </div>
      )}

      {!isLoading && !error && projects.length === 0 && (
        <p>لا يوجد مشاريع في الوقت الحالي</p>
      )}
    </div>
  );
};

export default CategoryID;
