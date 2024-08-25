import { FaComment } from "react-icons/fa";
import OtherComments from "./OtherComments";

import { useSelector } from "react-redux";
import AddCommentModal from "@/components/modals/AddCommentModal";

const CommentsWrapper = ({commentId}) => {
  const { project } = useSelector((state) => state.project);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-primary flex flex-row items-center justify-start gap-3">
        <FaComment size={25} className="text-primary" />
        التعليقات
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
        <div className="flex flex-row gap-2 py-5 text-xl">
          <span>{project?.comments?.length}</span> تعليق
        </div>

        <div>
          <AddCommentModal projectId={project?._id} />
        </div>
      </div>

      <div className="py-4">
        <div className="my-8 flex flex-col gap-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-y-6 w-full">
              <OtherComments comments={project?.comments} commentId={commentId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsWrapper;
