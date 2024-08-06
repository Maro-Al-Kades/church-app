import { toast } from "react-toastify";
import request from "@/utils/request";
import { projectActions } from "@/redux/slices/projectSlice";

// Fetch All Categories
export function fetchAllCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/categories`);
      dispatch(projectActions.setCategories(data.categories || []));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
    }
  };
}
