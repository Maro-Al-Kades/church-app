import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { projectReducer } from "./slices/projectSlice";
import { categoryReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentSlice";

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
    project: projectReducer,
    category: categoryReducer,
    comment: commentReducer,
  },
  preloadedState: initialState,
});

export default store;
