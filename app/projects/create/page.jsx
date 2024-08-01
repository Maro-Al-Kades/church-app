"use client";

import { categories } from "@/constants";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import Image from "next/image";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const CreateProject = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = (useState < File) | (null > null);

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
    formData.append("category", category);

    //` TODO: SEND FORM DATA TO SERVER

    console.log({
      title,
      description,
      category,
      file,
    });
  };

  return (
    <section className="flex flex-col lg:flex-row gap-12 mx-auto justify-between items-center">
      <ToastContainer closeButton position="bottom-right" theme="colored" />
      <div>
        <h1 className="text-3xl text-primary font-bold pb-6 lg:py-10">
          إنشاء مشروع جديد
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
              <SelectItem key={category.id}>{category.content}</SelectItem>
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

          <Button type="submit" color="secondary" variant="shadow">
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
