"use client";

import CommentsWrapper from "@/components/comments/CommentsWrapper";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@nextui-org/spinner";
import { Skeleton } from "@nextui-org/skeleton";
import AOS from "aos";
import "aos/dist/aos.css";

const ProjectDetails = () => {
  const params = useParams();
  const { id } = params || {};

  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const url = `http://localhost:8000/api/projects/${id}`;
        try {
          const response = await axios.get(url);
          setProject(response.data.project);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    AOS.init({ duration: 1200 });

    return () => clearTimeout(timer);
  }, [id]);

  const updateImageSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.warning("لا يوجد اي صور");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.patch(
        `http://localhost:8000/api/projects/${id}/upload-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProject(response.data.project);
      toast.success("تم تحميل الصورة بنجاح");
    } catch (error) {
      toast.error("Error updating image");
    }
  };

  const user = project?.user;

  return (
    <section className="flex flex-col gap-12">
      <ToastContainer theme="colored" position="bottom-right" />
      <div className="flex flex-col lg:flex-row justify-start gap-8 lg:gap-20">
        <div>
          {isLoading ? (
            <Skeleton className="rounded-xl">
              <div className="w-[500px] h-[270px] object-cover rounded-xl bg-gray-300" />
            </Skeleton>
          ) : (
            <Image
              alt={project.title}
              className="w-full h-[270px] object-cover rounded-xl"
              src={project.image?.url}
              width={1000}
              height={270}
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
            />
          )}
        </div>
        <div className="flex flex-col gap-6">
          {isLoading ? (
            <Skeleton className="w-[500px] h-[50px] rounded-md bg-gray-300" />
          ) : (
            <h2
              className="text-3xl font-semibold"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
            >
              {project.title}
            </h2>
          )}
          {isLoading ? (
            <Skeleton className="w-[250px] h-[30px] rounded-md bg-gray-300" />
          ) : (
            <div
              className="flex items-center gap-3"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
            >
              <FaStar className="text-primary" />
              <span className="text-gray-400">
                {project.likes?.length} تقييم
              </span>
            </div>
          )}

          <div className="text-md font-semibold">
            القسم :{" "}
            {isLoading ? (
              <Skeleton className="w-[60px] h-[30px] rounded-full bg-gray-300" />
            ) : (
              <Chip
                size="md"
                color="primary"
                variant="shadow"
                className="text-md dark:text-gray-700 light:text-white"
                data-aos="fade-right"
                data-aos-anchor-placement="top-bottom"
                data-aos-once="true"
              >
                {project.category}
              </Chip>
            )}
          </div>

          {isLoading ? (
            <Skeleton className="w-[400px] h-[20px] rounded-md bg-gray-300" />
          ) : (
            <p
              className="py-4 max-w-3xl"
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              data-aos-once="true"
            >
              {project.description}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-8">
          {user ? (
            <Avatar
              src={
                user.profilePhoto?.url ||
                "https://i.pravatar.cc/150?u=a042581f4e29026024d"
              }
              size="lg"
              className="w-[50px] h-[50px]"
              isBordered
              color="primary"
              as={Link}
              href={`/profile/${user._id}`}
            />
          ) : (
            <Avatar
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              size="lg"
              className="w-[50px] h-[50px]"
              isBordered
              color="primary"
            />
          )}

          <div>
            <h2 className="text-primary text-xl font-bold">
              {user?.username || "مستخدم غير موجود"}
            </h2>
            <p>
              تاريخ الانضمام :{" "}
              <span className="text-primary">
                {user ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </p>
          </div>
        </div>

        <div>
          <Button
            color="warning"
            variant="bordered"
            endContent={<MdEdit />}
            onPress={onOpen}
          >
            تعديل المشروع
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="2xl"
            shadow="lg"
            backdrop="blur"
            className="p-3"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-row justify-between items-center">
                    تعديل المشروع
                  </ModalHeader>
                  <ModalBody>
                    <form
                      onSubmit={updateImageSubmitHandler}
                      className="flex flex-row items-center justify-between"
                    >
                      <Input
                        color="primary"
                        isRequired
                        type="file"
                        label="اختر صورة"
                        className="w-[600px] input-file"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                      />
                      <Button
                        className=""
                        color="danger"
                        variant="shadow"
                        endContent={<MdDelete size={20} />}
                      >
                        حذف المشروع
                      </Button>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button fullWidth color="secondary" onPress={onClose}>
                      تغيير البيانات
                    </Button>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="flat"
                      onPress={onClose}
                    >
                      الغاء
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>

      <CommentsWrapper />
    </section>
  );
};

export default ProjectDetails;
