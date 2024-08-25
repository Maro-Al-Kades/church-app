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

// create category
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`/api/categories`, newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token
        }
      });
      dispatch(categoryActions.AddCategory(data));
      toast.success("تم اضافة القسم بنجاح")
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
    }
  };
}

// delete category
export function deleteCategory(categoryId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`/api/categories/${categoryId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token
        }
      });
      dispatch(categoryActions.deleteCategory(data.categoryId));
      toast.success("تم حذف القسم بنجاح")
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "حدث خطأ";
      toast.error(errorMessage);
    }
  };
}
