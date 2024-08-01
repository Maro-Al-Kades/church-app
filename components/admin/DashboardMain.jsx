import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  FaFolder,
  FaProjectDiagram,
  FaRegComments,
  FaUsers,
} from "react-icons/fa";
import AddCategoryForm from "./AddCategoryForm";
import Link from "next/link";

const DashboardMain = () => {
  return (
    <div className="flex-1 p-8 border border-primary/20 rounded-xl gap-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <Card fullWidth>
          <CardHeader className="font-semibold text-primary text-xl">
            المستخدمين
          </CardHeader>
          <CardBody className="text-right text-2xl font-bold">250</CardBody>
          <CardFooter className="flex flex-row items-center justify-between">
            <Button
              endContent={<FaUsers size={20} />}
              fullWidth
              color="secondary"
              variant="flat"
              as={Link}
              href="admin/users"
            >
              كل المستخدمين
            </Button>
          </CardFooter>
        </Card>
        <Card fullWidth>
          <CardHeader className="font-semibold text-primary text-xl">
            المشاريع
          </CardHeader>
          <CardBody className="text-right text-2xl font-bold">120</CardBody>
          <CardFooter className="flex flex-row items-center justify-between">
            <Button
              endContent={<FaProjectDiagram size={20} />}
              fullWidth
              color="secondary"
              variant="flat"
              as={Link}
              href="admin/projects"
            >
              كل المشاريع
            </Button>
          </CardFooter>
        </Card>
        <Card fullWidth>
          <CardHeader className="font-semibold text-primary text-xl">
            الاقسام
          </CardHeader>
          <CardBody className="text-right text-2xl font-bold">8</CardBody>
          <CardFooter className="flex flex-row items-center justify-between">
            <Button
              endContent={<FaFolder size={20} />}
              fullWidth
              color="secondary"
              variant="flat"
              as={Link}
              href="admin/categories"
            >
              كل الاقسام
            </Button>
          </CardFooter>
        </Card>
        <Card fullWidth>
          <CardHeader className="font-semibold text-primary text-xl">
            التعليقات
          </CardHeader>
          <CardBody className="text-right text-2xl font-bold">444</CardBody>
          <CardFooter className="flex flex-row items-center justify-between">
            <Button
              endContent={<FaRegComments size={20} />}
              fullWidth
              color="secondary"
              variant="flat"
              as={Link}
              href="admin/comments"
            >
              كل التعليقات
            </Button>
          </CardFooter>
        </Card>
      </div>

      <AddCategoryForm />
    </div>
  );
};

export default DashboardMain;
