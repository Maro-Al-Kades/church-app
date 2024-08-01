import Glow from "@/components/Glow";
import ProjectsList from "@/components/projects/ProjectsList";
import { Button } from "@nextui-org/button";

import Link from "next/link";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Projects = () => {
  return (
    <>
      <section className="py-20 flex flex-col gap-8 items-center justify-center md:mt-20">
        <Glow />
        <h1 className="text-3xl text-primary font-bold">افضل المشاريع</h1>
        <ProjectsList />

        <Button
          color="primary"
          className="w-[250px] font-semibold text-md "
          size="lg"
          variant="shadow"
          endContent={<MdKeyboardDoubleArrowLeft size={20} />}
          as={Link}
          href="/projects"
        >
          تصفح كل المشاريع
        </Button>
      </section>
    </>
  );
};

export default Projects;
