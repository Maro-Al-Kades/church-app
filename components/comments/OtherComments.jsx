"use client";

import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { useFormatter } from "next-intl";
import EditCommentModal from "@/components/modals/EditCommentModal";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import { Button } from "@nextui-org/react";
import { deleteComment } from "@/redux/api/commentApiCall";
import { toast } from "react-toastify";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"; // تأكد من الاستيراد الصحيح
import { useState } from "react";


const OtherComments = ({ commentId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.project.project?.comments);
  const { user } = useSelector((state) => state.auth);
  const format = useFormatter();

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedCommentId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedCommentId(null);
  };

  const deleteCommentHandler = () => {
    dispatch(deleteComment(selectedCommentId));
    closeDeleteModal();
  };

  if (!format) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {comments?.map((comment) => (
        <Card className="comments p-2 px-6" radius="lg" key={comment._id}>
          <CardHeader className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center justify-start gap-4">
              <Avatar src={comment?.profilePhoto?.url} />
              <div>
                <h3 className="text-primary font-semibold">
                  {comment?.username}
                </h3>
                <p className="text-gray-500">
                  {format.relativeTime(comment?.createdAt)}
                </p>
              </div>
            </div>

            {comment?.user === user?._id && (
              <div className="flex items-center justify-end gap-4">
                <EditCommentModal comment={comment} />

                <Button
                  isIconOnly
                  aria-label="delete"
                  color="danger"
                  variant="flat"
                  onClick={() => openDeleteModal(comment._id)}
                >
                  <MdDelete size={20} />
                </Button>
              </div>
            )}
          </CardHeader>

          <CardBody className="p-6">
            <p className="dark:text-gray-200 text-right max-w-screen-xl">
              {comment?.text}
            </p>
          </CardBody>
        </Card>
      ))}

      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={isDeleteOpen}
        onOpenChange={closeDeleteModal}
        placement="top-center"
        size="sm"
        shadow="lg"
        backdrop="blur"
      >
        <ModalContent>
          <ModalHeader>تأكيد حذف التعليق</ModalHeader>
          <ModalBody>
            هل أنت متأكد أنك تريد حذف هذا التعليق؟ هذه العملية لا يمكن التراجع عنها.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={closeDeleteModal}>
              إلغاء
            </Button>
            <Button
              color="danger"
              onPress={deleteCommentHandler}
            >
              حذف التعليق
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default OtherComments;
