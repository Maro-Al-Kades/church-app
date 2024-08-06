"use client";

import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";
import { fetchAllCategories } from "@/redux/api/categoryApiCall";

const CategoryItem = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.project);

  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchAllCategories());
    AOS.init({ duration: 800 });
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 w-full">
      {isLoading ? (
        <div className="text-primary text-3xl font-bold flex items-center justify-center w-full">
          <Spinner
            label="جاري تحميل الاقسام الخاصة بالكنيسة..."
            color="primary"
          />
        </div>
      ) : error ? (
        <p>{error}</p>
      ) : Array.isArray(categories) && categories.length > 0 ? (
        categories.map((category) => (
          <Card
            key={category._id}
            isHoverable
            isPressable
            className="p-4 w-[200px]"
            shadow="lg"
            as={Link}
            href={`/categories/${category._id}`}
            fullWidth
            data-aos="fade-right"
            data-aos-anchor-placement="top-bottom"
            data-aos-once="true"
          >
            <CardBody className="flex items-center justify-center h-full text-md">
              {category.title}
            </CardBody>
          </Card>
        ))
      ) : (
        <p>لا يوجد أقسام حالياً</p>
      )}
    </div>
  );
};

export default CategoryItem;
