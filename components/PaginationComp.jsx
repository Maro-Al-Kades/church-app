"use client";

import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PaginationComp = ({ pages, currentPage, setCurrentPage }) => {
  const generatedPages = [];
  for (let i = 1; i <= pages; i++) {
    // عدلنا هنا الشرط
    generatedPages.push(i);
  }

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div
      className="flex flex-col gap-5 items-center justify-center"
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-once="true"
    >
      <Pagination
        total={pages}
        color="primary"
        page={currentPage}
        onChange={setCurrentPage}
      />
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={() => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))}
        >
          السابق
        </Button>
        <Button
          size="sm"
          variant="flat"
          color="primary"
          onPress={
            () => setCurrentPage((prev) => (prev < pages ? prev + 1 : prev)) // عدلنا هنا الشرط
          }
        >
          التالي
        </Button>
      </div>
    </div>
  );
};

export default PaginationComp;
