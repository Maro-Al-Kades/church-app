import clsx from "clsx";
import React from "react";

const Glow = ({ className }) => {
  return (
    <div
      className={clsx(
        "absolute animate-pulse  w-[400px] h-[400px] blur-3xl bg-primary/40 rounded-full",
        className
      )}
    />
  );
};

export default Glow;
