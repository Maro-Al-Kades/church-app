import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";

const AddCategoryForm = () => {
  return (
    <div className="lg:p-4 py-12">
      <Card className="p-8">
        <CardHeader className="text-primary font-semibold text-2xl">
          اضافة قسم جديد
        </CardHeader>

        <CardBody>
          <Input
            variant="bordered"
            color="primary"
            isRequired
            type="text"
            label="اسم القسم"
            className="w-full"
          />
        </CardBody>

        <CardFooter className="flex items-center justify-center">
          <Button className="w-[250px]" variant="shadow" color="secondary">
            اضافة القسم
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCategoryForm;
