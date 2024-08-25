"use client";

import { createCategory } from "@/redux/api/categoryApiCall";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("يجب كتابة اسم القسم");

    dispatch(createCategory({ title }));
    setTitle(""); // Reset the input field
  };

  return (
    <div className="lg:p-4 py-12">
      <Card className="p-8">
        <CardHeader className="text-primary font-semibold text-2xl">
          اضافة قسم جديد
        </CardHeader>
        <form onSubmit={formSubmitHandler}>
          <CardBody>
            <Input
              variant="bordered"
              color="primary"
              isRequired
              type="text"
              label="اسم القسم"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />
          </CardBody>
          <CardFooter className="flex items-center justify-center">
            <Button
              className="w-[250px]"
              variant="shadow"
              color="primary"
              type="submit"
            >
              اضافة القسم
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AddCategoryForm;
