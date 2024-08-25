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
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "@/redux/api/commentApiCall";
import { toast } from "react-toastify";

const AddCommentModal = ({ projectId }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [text, setText] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (text.trim() === "") return toast.error("من فضلك اكتب تعليقك");

    dispatch(createComment({ text, projectId }));

    setText("");

    toast.success("تم نشر التعليق بنجاح")
  };

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
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        classNames={{
                          base: "w-full",
                          input: "resize-y min-h-[80px]",
                        }}
                      />
                    </div>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={(e) => {
                      formSubmitHandler(e);
                      onClose();
                    }}
                  >
                    نشر التعليق
                  </Button>
                  <Button
                    fullWidth
                    color="primary"
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
