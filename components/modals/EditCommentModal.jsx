import { useSelector } from "react-redux";
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

const EditCommentModal = () => {
  const { user } = useSelector((state) => state.auth);
  const { project } = useSelector((state) => state.project);

  // console.log("User:", user);
  // console.log("Project:", project);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {project?.user?._id === user?._id ? (
        <>
          <Button isIconOnly aria-label="edit" onPress={onOpen}>
            <FaPencilAlt />
          </Button>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    تعديل التعليق
                  </ModalHeader>

                  <ModalBody>
                    <Textarea
                      label="التعليق"
                      placeholder="اكتب تعليقك هنا..."
                      variant="bordered"
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onPress={onClose}
                      type="submit"
                      fullWidth
                    >
                      تعديل
                    </Button>
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={onClose}
                      fullWidth
                    >
                      الغاء
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </>
  );
};

export default EditCommentModal;
