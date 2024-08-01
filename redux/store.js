// redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";

// استرجاع بيانات المستخدم من localStorage
const storedUser = localStorage.getItem("userInfo");
const initialState = {
  auth: {
    user: storedUser ? JSON.parse(storedUser) : null,
  },
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
  preloadedState: initialState, // تعيين الحالة الأولية
});

export default store;
