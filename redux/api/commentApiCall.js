import { toast } from "react-toastify";
import request from "@/utils/request";
import { projectActions } from "@/redux/slices/projectSlice";
import { commentActions } from "@/redux/slices/commentSlice";

export function createComment(newComment) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth;

      if (!user) {
        return toast.error("يجب تسجيل الدخول لإضافة تعليق.");
      }

      const { data } = await request.post("/api/comments", newComment, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      dispatch(projectActions.addCommentToProject(data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export function updateComment(commentId, comment) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth;

      if (!user) {
        return toast.error("يجب تسجيل الدخول لإضافة تعليق.");
      }

      const { data } = await request.put(
        `/api/comments/${commentId}`,
        comment,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      dispatch(projectActions.updateCommentProject(data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export function deleteComment(commentId) {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth;

      await request.delete(`/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      dispatch(projectActions.deleteCommentProject(commentId));
      dispatch(commentActions.deleteComment(commentId));

      toast.success("تم حذف التعليق بنجاح")
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}

export function fetchAllComments() {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth;

      if (!user) {
        return toast.error("يجب تسجيل الدخول لعرض التعليقات.");
      }

      const { data } = await request.get(`/api/comments`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      dispatch(commentActions.setComments(data));
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
}