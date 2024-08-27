"use client";

import { configureStore } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { projectReducer } from "./slices/projectSlice";
import { categoryReducer } from "./slices/categorySlice";
import { commentReducer } from "./slices/commentSlice";

let preloadedState = {
  auth: {
    user: null,
  },
};

if (typeof window !== "undefined") {
  const storedUser = localStorage.getItem("userInfo");
  preloadedState = {
    auth: {
      user: storedUser ? JSON.parse(storedUser) : null,
    },
  };
}

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    project: projectReducer,
    category: categoryReducer,
    comment: commentReducer,
  },
  preloadedState,
});

export default store;
