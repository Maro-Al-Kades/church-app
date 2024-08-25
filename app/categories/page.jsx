"use client";

import { useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";
import CategoryItem from "@/components/categories/CategoryItem";

const CategoriesPage = () => {
  const loading = useSelector((state) => state.project.loading);

  if (loading) {
    return (
      <div className="text-primary text-3xl font-bold flex w-full mx-auto items-center justify-center">
        <Spinner color="primary" title="جاري تحميل الاقسام..." />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-10">
        <h2 className="flex items-center justify-center text-3xl text-primary font-bold">
          جميع الاقسام الخاصة بالكنيسة
        </h2>

        <CategoryItem />
      </div>
    </>
  );
};

export default CategoriesPage;
