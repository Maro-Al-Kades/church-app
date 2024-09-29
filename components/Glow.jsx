import clsx from "clsx";
import React from "react";

const Glow = ({ className }) => {
  return (
    <div
      className={clsx(
        "lg:absolute lg:animate-pulse lg:w-[400px] lg:h-[400px] lg:blur-3xl lg:bg-primary/40 lg:rounded-full",
        className
      )}
    />
  );
};

export default Glow;
