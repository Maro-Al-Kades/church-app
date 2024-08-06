"use client";

import { Chip } from "@nextui-org/chip";
import { IoHeartCircleOutline, IoHeartCircleSharp } from "react-icons/io5";
import Image from "next/image";
import { HeartFilledIcon } from "@/components/icons";
import { CiTextAlignRight } from "react-icons/ci";
import { projectToggleLike } from "@/redux/api/projectApiCall";
import { useState } from "react";
import { Button } from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";

const ProjectDetailsHeader = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  const { user } = useSelector((state) => state.auth);

  const [isLiked, setIsLiked] = useState(
    project?.likes?.includes(user?._id) || false
  );

  const handleLikeClick = () => {
    dispatch(projectToggleLike(project?._id));
    setIsLiked(!isLiked);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-start gap-8 lg:gap-20">
        <div>
          <Image
            alt={project?.title || "صورة المشروع"}
            className="w-full h-[270px] object-cover rounded-xl"
            src={project?.image?.url || "/hero.svg"}
            width={1000}
            height={270}
            data-aos="fade-left"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h2
            className="text-3xl font-semibold"
            data-aos="fade-right"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
          >
            {project?.title}
          </h2>

          <div className="text-md font-semibold flex items-center justify-start gap-2">
            <span>القسم :</span>
            <Chip
              size="md"
              color="primary"
              variant="shadow"
              className="text-md dark:text-gray-700 light:text-white"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
            >
              {project?.category}
            </Chip>
          </div>
          <div
            className="flex items-center gap-3"
            data-aos="fade-right"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
          >
            <HeartFilledIcon className="text-primary" />
            <span className="text-gray-400">
              {project?.likes?.length} اعجاب
            </span>
          </div>

          {user && (
            <div className="flex flex-row justify-start items-center gap-4">
              <Button
                color={
                  project?.likes?.includes(user?._id) ? "danger" : "primary"
                }
                variant="faded"
                onClick={handleLikeClick}
                className="font-semibold"
              >
                الاعجاب بالمشروع :
                {project?.likes?.includes(user?._id) ? (
                  <IoHeartCircleSharp size={24} className="text-red-500" />
                ) : (
                  <IoHeartCircleOutline size={24} />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-semibold text-primary flex flex-row items-center justify-start gap-3">
          <CiTextAlignRight size={25} />
          وصف المشروع
        </h1>
        <p
          className="py-4 max-w-3xl"
          data-aos="fade-right"
          data-aos-anchor-placement="top-bottom"
          data-aos-once="true"
        >
          {project?.description}
        </p>
      </div>
    </>
  );
};

export default ProjectDetailsHeader;
