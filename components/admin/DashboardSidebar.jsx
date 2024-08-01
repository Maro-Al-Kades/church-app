import { Button } from "@nextui-org/button";
import {
  FaProjectDiagram,
  FaRegComments,
  FaUsers,
} from "react-icons/fa";
import { IoFolderSharp } from "react-icons/io5";

const DashboardSidebar = () => {
  return (
    <div className="w-1/4 p-4 border border-primary rounded-xl">
      <div className="flex flex-col items-center justify-between gap-8 w-full">
        <Button fullWidth size="lg" endContent={<FaUsers size={20} />}>
          المستخدمين
        </Button>
        <Button fullWidth size="lg" endContent={<FaProjectDiagram size={20} />}>
          المشاريع
        </Button>
        <Button fullWidth size="lg" endContent={<IoFolderSharp size={20} />}>
          الاقسام
        </Button>
        <Button fullWidth size="lg" endContent={<FaRegComments size={20} />}>
          التعليقات
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
