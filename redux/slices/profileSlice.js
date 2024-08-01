// redux/slices/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },

    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },

    updateProfileState(state, action) {
      state.profile = action.payload;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReducer, profileActions };
