"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { FaPencilAlt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateComment } from "@/redux/api/commentApiCall";

const EditCommentModal = ({ comment }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentForUpdate, setCommentForUpdate] = useState(comment?.text || "");

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (commentForUpdate.trim() === "") {
      return toast.error("من فضلك اكتب تعليق");
    }
    
    dispatch(updateComment(comment._id, { text: commentForUpdate })).then(() => {
      toast.success("تم تحديث التعليق بنجاح من فضلك اعد تحميل الصفحة لظهور التعليق الجديد");
    });
  };

  return (
    <>
      <Button isIconOnly aria-label="edit" onPress={onOpen}>
        <FaPencilAlt />
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={formSubmitHandler}>
              <ModalHeader className="flex flex-col gap-1">
                تعديل التعليق
              </ModalHeader>

              <ModalBody>
                <Textarea
                  label="التعليق"
                  placeholder="اكتب تعليقك هنا..."
                  variant="bordered"
                  value={commentForUpdate}
                  onChange={(e) => setCommentForUpdate(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  type="submit"
                  fullWidth
                  onPress={onClose}
                >
                  تعديل
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={onClose}
                  fullWidth
                >
                  إلغاء
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCommentModal;
