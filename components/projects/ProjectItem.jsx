"use client";

import { useState, useEffect } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Skeleton } from "@nextui-org/skeleton";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectItem = ({ project }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const profilePhotoUrl = "https://i.pravatar.cc/150?u=a042581f4e29026024d";

  return (
    <Card
      className="px-3"
      shadow="lg"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
    >
      {isLoading ? (
        <Skeleton className="rounded-lg">
          <CardHeader>
            <div className="w-[400px] h-[270px] object-cover rounded-xl bg-gray-300" />
          </CardHeader>
        </Skeleton>
      ) : (
        <CardHeader>
          <Image
            alt={project.title}
            className="w-full h-[270px] object-cover rounded-xl"
            src={project.image.url}
            width={1000}
            height={1000}
          />
        </CardHeader>
      )}
      <CardBody className="flex flex-row items-center justify-between">
        {isLoading ? (
          <Skeleton className="rounded-lg">
            <h2 className="text-xl font-semibold">{project.title}</h2>
          </Skeleton>
        ) : (
          <h2 className="text-xl font-semibold">{project.title}</h2>
        )}
        {isLoading ? (
          <Skeleton className="rounded-full">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
          </Skeleton>
        ) : (
          <Avatar
            as={Link}
            href={`/profile/${project._id}`}
            src={profilePhotoUrl}
          />
        )}
      </CardBody>

      <CardFooter className="flex flex-col justify-between gap-3">
        {isLoading ? (
          <Skeleton className="rounded-lg">
            <p className="mt-2 text-sm text-right flex items-start justify-start">
              {project.description}
            </p>
          </Skeleton>
        ) : (
          <p className="mt-2 text-sm text-right flex items-start justify-start">
            {project.description}
          </p>
        )}

        <div className="flex flex-row w-full justify-between py-2 text-secondary">
          {isLoading ? (
            <Skeleton className="rounded-xl">
              <div className="w-20 h-6 bg-gray-300" />
            </Skeleton>
          ) : (
            <Chip
              color="primary"
              as={Link}
              href={`/categories/${project.category}`}
            >
              {project.category}
            </Chip>
          )}

          {isLoading ? (
            <Skeleton className="rounded-lg">
              <div className="rounded-lg bg-gray-300" />
            </Skeleton>
          ) : (
            <span>التقييم: {project.likes.length} صوت</span>
          )}
        </div>

        <div className="flex flex-row w-full items-center justify-between">
          <span className="text-secondary">تم النشر في:</span>
          <span>{new Date(project.createdAt).toLocaleDateString()}</span>
        </div>

        <Button
          as={Link}
          href={`/projects/${project._id}`}
          variant="flat"
          color="primary"
          fullWidth
        >
          عرض التفاصيل
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectItem;
