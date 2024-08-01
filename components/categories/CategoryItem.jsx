"use client";

import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import axios from "axios";

const CategoryItem = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/categories/"
        );
        setCategories(response.data.categories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setIsLoading(false);
        // Consider adding user-friendly error handling here
      }
    };

    fetchData();
    AOS.init({ duration: 800 });
  }, []); // Empty dependency array for initial render only

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 w-full">
      {isLoading ? (
        <p>Loading...</p> // Loading message
      ) : (
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
      )}
    </div>
  );
};

export default CategoryItem;
