"use client";

import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProject } from "@/redux/api/projectApiCall";

import { Spinner } from "@nextui-org/spinner";

import { useEffect } from "react";

import { Avatar } from "@nextui-org/avatar";

import Link from "next/link";
import EditProjectModal from "@/components/modals/EditProjectModal";

const ProjectsDetailsProfile = ({ id }) => {
  const dispatch = useDispatch();

  const { project, loading, error } = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(fetchSingleProject(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner label="جاري تحميل البيانات..." color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-xl">
          حدث خطأ أثناء تحميل البيانات: {error}
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-xl">مشروع غير موجود</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-8">
          <Avatar
            src={project.user?.profilePhoto?.url || ""}
            size="lg"
            className="w-[50px] h-[50px]"
            isBordered
            color="primary"
            as={Link}
            href={`/profile/${project.user?._id}`}
          />

          <div>
            <h2 className="text-primary text-xl font-bold">
              {project.user?.username || "مستخدم غير موجود"}
            </h2>
            <p>
              تاريخ الانضمام :{" "}
              <span className="text-primary">
                {project.user
                  ? new Date(project.user?.createdAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>
        <EditProjectModal />
      </div>
    </>
  );
};

export default ProjectsDetailsProfile;
