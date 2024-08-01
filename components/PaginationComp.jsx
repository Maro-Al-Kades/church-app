"use client";

import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/pagination";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PaginationComp = () => {
  const [currentPage, setCurrentPage] = React.useState(1);

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
        total={10}
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
          onPress={() =>
            setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
          }
        >
          التالي
        </Button>
      </div>
    </div>
  );
};

export default PaginationComp;
