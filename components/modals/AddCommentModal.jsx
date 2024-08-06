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
import Link from "next/link";
import { FaComment, FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";

const AddCommentModal = () => {
  const { user } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState(null);

  return (
    <>
      <Button
        variant="bordered"
        endContent={<FaComment />}
        onPress={onOpen}
        size="md"
      >
        كتابة تعليق
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
        {user ? (
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
                      <h3 className="text-primary font-semibold">اعطي تقييم</h3>
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
        ) : (
          <ModalContent>
            <ModalHeader>
              يجب عليك تسجيل الدخول أولا لكتابة تعليق واعطاء تقييم
            </ModalHeader>
            <ModalBody>
              <p className="text-primary font-semibold text-xl">
                يمكنك تسجيل الدخول عن طريق البريد الالكتروني.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                fullWidth
                color="secondary"
                variant="ghost"
                as={Link}
                href="/auth/login"
              >
                تسجيل الدخول
              </Button>
            </ModalFooter>
          </ModalContent>
        )}
      </Modal>
    </>
  );
};

export default AddCommentModal;
