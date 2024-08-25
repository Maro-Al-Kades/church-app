"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  fetchCategories,
  fetchSingleProject,
  updateProject,
  updateProjectImage,
} from "@/redux/api/projectApiCall";

import { RiDeleteBin6Line } from "react-icons/ri";

import { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

import { Button } from "@nextui-org/button";

import { Input } from "@nextui-org/input";
import { Select, SelectItem, Textarea } from "@nextui-org/react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { fetchAllCategories } from "@/redux/api/categoryApiCall";

const EditProjectModal = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { project } = useSelector((state) => state.project);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);
  const router = useRouter();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [title, setTitle] = useState(project?.title);
  const [description, setDescription] = useState(project?.description);
  const [category, setCategory] = useState(project?.category);
  const [file, setFile] = useState(null);

  const updateImageSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return toast.warning("لا يوجد اي صور");

    const formData = new FormData();
    formData.append("image", file);

    const response = await dispatch(updateProjectImage(formData, project?._id));
    if (response && response.success) {
      dispatch(fetchSingleProject(id));
      toast.success(
        "تم تحديث الصورة بنجاح اعد تحميل الصفحة لتظهر الصورة الجديدة"
      );
    }
  };

  useEffect(() => {
    if (project) {
      setTitle(project.title || "");
      setDescription(project.description || "");
      setCategory(project.category || "");
    }
  }, [project]);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (title.trim() === "") return toast.error("اسم المشروع مطلوب");
    if (typeof category !== "string" || category.trim() === "")
      return toast.error("القسم مطلوب");
    if (description.trim() === "") return toast.error("وصف المشروع مطلوب");

    const response = await dispatch(
      updateProject({ title, category, description }, project?._id)
    );
    if (response && response.success) {
      dispatch(fetchSingleProject(project?._id)); // Fetch the updated project data
    }
    setTimeout(() => {
      dispatch(fetchSingleProject(project?._id)); // Fetch the updated project data
      toast.success("تم تحديث المشروع بنجاح");
      onOpenChange(false); // Close the modal
    }, 100);
  };

  return (
    <>
      {user?._id === project?.user?.id && (
        <div>
          <div className="flex flex-row items-center justify-between gap-3">
            <Button
              color="warning"
              variant="bordered"
              endContent={<MdEdit />}
              onPress={onOpen}
            >
              تعديل المشروع
            </Button>

            <Button
              color="danger"
              variant="bordered"
              endContent={<RiDeleteBin6Line />}
              onPress={onDeleteOpen}
            >
              حذف المشروع
            </Button>
          </div>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onOpenChange={(open) => {
          onOpenChange(open);
          if (open) {
            dispatch(fetchCategories()); // Fetch categories when the modal opens
          }
        }}
        backdrop="blur"
      >
        <ModalContent className="p-4">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1>تعديل المشروع</h1>
                <p className="text-sm text-primary">
                  اذا لم تظهر البيانات الرجاء اعادة تحميل الصفحة...
                </p>
              </ModalHeader>
              <ModalBody>
                <form
                  className="mt-4 flex flex-col gap-4"
                  onSubmit={formSubmitHandler}
                >
                  <Input
                    isRequired
                    variant="faded"
                    label="اسم المشروع"
                    placeholder="اسم المشروع"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <Select
                    variant="faded"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    label={project?.category}
                  >
                    {categories?.map((category) => (
                      <SelectItem key={category.title} value={category.title}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </Select>
                  <Textarea
                    isRequired
                    variant="faded"
                    label="وصف المشروع"
                    placeholder="وصف المشروع"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <Button
                    color="primary"
                    variant="solid"
                    type="submit"
                    onPress={onClose}
                  >
                    تحديث المشروع
                  </Button>
                </form>
                <form
                  onSubmit={updateImageSubmitHandler}
                  className="mt-6 flex flex-col gap-4"
                >
                  <Input
                    isRequired
                    variant="bordered"
                    label="الصورة"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <Button
                    color="primary"
                    variant="solid"
                    type="submit"
                    onPress={onClose}
                  >
                    تحديث الصورة
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={onDeleteClose}
        placement="top-center"
        size="sm"
        shadow="lg"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>تأكيد حذف المشروع</ModalHeader>
          <ModalBody>
            هل أنت متأكد أنك تريد حذف المشروع؟ هذه العملية لا يمكن التراجع عنها.
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="faded" onPress={onDeleteClose}>
              إلغاء
            </Button>
            <Button
              color="danger"
              onPress={() => {
                dispatch(deleteProject(project?._id));
                router.push(`/profile/${user?._id}`);
                onDeleteClose();
              }}
            >
              حذف المشروع
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProjectModal;
