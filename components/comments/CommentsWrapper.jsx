import { FaPlus, FaStar } from "react-icons/fa";
import OtherComments from "./OtherComments";
import { comments } from "@/constants";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import { useState } from "react";

const CommentsWrapper = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState(null);

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary">التعليقات والتقييمات</h1>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="flex flex-row gap-2 py-5 text-xl">
          التقييمات <span>10</span>
          <FaStar className="text-primary" size={25} />
        </div>
        <div>
          <Button
            variant="bordered"
            endContent={<FaStar />}
            onPress={onOpen}
            size="md"
          >
            كتابة تعليق واعطاء تقييم
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
            size="xl"
            shadow="lg"
            backdrop="blur"
            className="p-3"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-row justify-between items-center">
                    كتابة تعليق واعطاء تقييم
                  </ModalHeader>
                  <ModalBody>
                    <form className="flex flex-col items-center justify-between">
                      <div className="w-full flex flex-col gap-4">
                        <h3 className="text-primary font-semibold">التعليق</h3>
                        <Textarea
                          label="التعليق"
                          disableAnimation
                          disableAutosize
                          classNames={{
                            base: "w-full",
                            input: "resize-y min-h-[80px]",
                          }}
                        />
                      </div>
                      <div className="w-full flex flex-row items-center justify-between py-10">
                        <h3 className="text-primary font-semibold">
                          اعطي تقييم
                        </h3>
                        <div className="flex flex-row gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              size={25}
                              className={`cursor-pointer ${
                                rating && rating >= star
                                  ? "text-primary"
                                  : "text-gray-400"
                              }`}
                              onClick={() => setRating(star)}
                            />
                          ))}
                        </div>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter>
                    <Button fullWidth color="secondary" onPress={onClose}>
                      نشر التعليق
                    </Button>
                    <Button
                      fullWidth
                      color="secondary"
                      variant="flat"
                      onPress={onClose}
                    >
                      الغاء
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>

      <div className="py-4">
        <div className="my-8 flex flex-col gap-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-y-6 w-full">
              <OtherComments comments={comments} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsWrapper;
