"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { createProject, fetchCategories } from "@/redux/api/projectApiCall";
import { Spinner } from "@nextui-org/react";
import { fetchAllCategories } from "@/redux/api/categoryApiCall";

const CreateProject = () => {
  const dispatch = useDispatch();
  const { isProjectCreated } = useSelector((state) => state.project);
  const { categories } = useSelector((state) => state.category);
  const { user } = useSelector((state) => state.auth);

  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [headerText, setHeaderText] = useState("إنشاء مشروع جديد");

  useEffect(() => {
    if (!user) {
      router.push("/");
    } else {
      dispatch(fetchAllCategories());
    }
  }, [user, dispatch, router]);

  useEffect(() => {
    if (isProjectCreated) {
      setHeaderText("جاري التحويل الي صفحة المشاريع...");
      router.push("/projects");
    }
  }, [isProjectCreated, router]);

  //~ Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    //~ Toast Handler
    if (title.trim() === "") return toast.error("يجب كتابة اسم المشروع");
    if (description.trim() === "")
      return toast.error("Post description is Required");
    if (category === "") return toast.error("Post category is Required");
    if (!file) return toast.error("Post image is Required");

    //~ File Upload Logic
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category); // Ensure this is the category ID

    dispatch(createProject(formData));
    setIsLoading(true);
    setHeaderText("جاري التحويل الي صفحة المشاريع...");
  };

  return (
    <section className="flex flex-col lg:flex-row gap-12 mx-auto justify-between items-center">
      <ToastContainer closeButton position="bottom-right" theme="colored" />
      <div>
        <h1 className="text-3xl text-primary font-bold pb-6 lg:py-10">
          {headerText}
        </h1>

        <form className="flex flex-col gap-6" onSubmit={formSubmitHandler}>
          <Input
            variant="bordered"
            color="primary"
            isRequired
            type="text"
            label="اسم المشروع"
            className="min-w-[400px]  md:min-w-[500px] lg:w-[600px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Select
            label="اختر قسم من الاقسام"
            className="min-w-[400px]  md:min-w-[500px] lg:w-[600px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <SelectItem key={category.title} value={category.title}>
                {category.title}
              </SelectItem>
            ))}
          </Select>



          <Textarea
            label="تفاصيل المشروع"
            disableAnimation
            disableAutosize
            classNames={{
              base: "min-w-[400px]  md:min-w-[500px] lg:w-[600px]",
              input: "resize-y min-h-[80px]",
            }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            color="primary"
            isRequired
            type="file"
            label="اختر صورة"
            className="min-w-[400px]  md:min-w-[500px] lg:w-[600px] input-file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <Button
            type="submit"
            color="primary"
            variant="shadow"
            isLoading={loading}
            spinner={
              <svg
                className="animate-spin h-5 w-5 text-current"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
            }
          >
            نشر المشروع
          </Button>
        </form>
      </div>

      <div>
        <Image src="/create.svg" alt="create" width={500} height={500} />
      </div>
    </section>
  );
};

export default CreateProject;
