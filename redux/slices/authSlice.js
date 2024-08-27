// redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: typeof window !== "undefined" && localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  registerMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.registerMessage = null;
    },

    logout(state) {
      state.user = null;
    },

    register(state, action) {
      state.registerMessage = action.payload;
    },

    setUserPhoto(state, action) {
      state.user.profilePhoto = action.payload;
    },

    setUsername(state, action) {
      state.user.username = action.payload;
    },

    setUserFromLocalStorage(state, action) {
      state.user = action.payload;
    },


  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authReducer, authActions };
