import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  loading: false,
  isProfileDeleted: false,
  usersCount: 0, // القيمة الافتراضية
  profiles: [],
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

    updateProfile(state, action) {
      state.profile = action.payload;
    },

    setLoading(state) {
      state.loading = true;
    },

    clearLoading(state) {
      state.loading = false;
    },

    setIsProfileDeleted(state) {
      state.isProfileDeleted = true;
      state.loading = false;
    },

    clearIsProfileDeleted(state) {
      state.isProfileDeleted = false;
    },

    setUsersCount(state, action) {
      state.usersCount = action.payload; // تعيين قيمة العدد بشكل صحيح
    },

    setProfiles(state, action) {
      state.profiles = action.payload;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileReducer, profileActions };
