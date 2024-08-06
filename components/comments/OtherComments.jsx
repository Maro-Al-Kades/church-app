"use client";

import { Avatar } from "@nextui-org/avatar";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

import { useFormatter } from "next-intl";

import EditCommentModal from "@/components/modals/EditCommentModal";
import { useSelector } from "react-redux";

const OtherComments = () => {
  const { project } = useSelector((state) => state.project);
  const format = useFormatter();

  if (!format) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {project?.comments?.map((comment) => (
        <Card className="comments p-2 px-6" radius="lg" key={comment?._id}>
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

            <div className="flex items-center justify-end gap-4">
              <EditCommentModal />
            </div>
          </CardHeader>

          <CardBody className="p-6">
            <p className="dark:text-gray-200 text-right max-w-screen-xl">
              {comment?.text}
            </p>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export default OtherComments;
