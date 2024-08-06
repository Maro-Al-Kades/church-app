import { toast } from "react-toastify";
import request from "@/utils/request";
import { categoryActions } from "@/redux/slices/categorySlice";

// Fetch All Categories
export function fetchAllCategories() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/categories`);
      dispatch(categoryActions.setCategories(data.categories || []));
    } catch (error) {
      const errorMessage = error.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
    }
  };
}
