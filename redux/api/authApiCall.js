// redux/api/authApiCall.js

import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";
import request from "@/utils/request";

// تسجيل دخول المستخدم
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.login(data));

      localStorage.setItem("userInfo", JSON.stringify(data)); // حفظ بيانات المستخدم
      toast.success("تم تسجيل الدخول بنجاح");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}

// تسجيل خروج المستخدم
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());

    localStorage.removeItem("userInfo"); // إزالة بيانات المستخدم
  };
}

export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));

      // toast.success("تم تسجيل الدخول بنجاح");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
