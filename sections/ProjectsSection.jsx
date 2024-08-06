"use client";

import Glow from "@/components/Glow";
import ProjectItem from "@/components/projects/ProjectItem";
import { Button } from "@nextui-org/button";

import Link from "next/link";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "@/redux/api/projectApiCall";
import { useEffect, useState } from "react";
import { Spinner } from "@nextui-org/react";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchProjects(1));
    setLoading(false);
  }, []);

  const [loading, setLoading] = useState(true);

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

  return (
    <>
      <section className="py-20 flex flex-col gap-8 items-center justify-center md:mt-20">
        <Glow />
        <h1 className="text-3xl text-primary font-bold">افضل المشاريع</h1>

        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
            {projects.length > 0 ? (
              projects.map((item) => (
                <ProjectItem key={item._id} project={item} />
              ))
            ) : (
              <p className="text-3xl text-primary font-bold ">
                لا يوجد مشاريع في الوقت الحالي
              </p>
            )}
          </div>
        </>

        <Button
          color="primary"
          className="w-[250px] font-semibold text-md "
          size="lg"
          variant="shadow"
          endContent={<MdKeyboardDoubleArrowLeft size={20} />}
          as={Link}
          href="/projects"
        >
          تصفح كل المشاريع
        </Button>
      </section>
    </>
  );
};

export default Projects;
