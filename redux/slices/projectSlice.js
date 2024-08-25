// redux/slices/projectSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
  categories: [],
  projectsCount: null,
  project: null, // الحالة الحالية للمشروع الواحد
  error: null,
  loading: false,
  isProjectCreated: false,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects(state, action) {
      state.projects = action.payload;
    },
    setProjectsCount(state, action) {
      state.projectsCount = action.payload;
    },
    setProjectCate(state, action) {
      state.project = action.payload;
    },
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    clearLoading(state) {
      state.loading = false;
    },
    setIsProjectCreated(state) {
      state.isProjectCreated = true;
      state.loading = false;
    },
    clearIsProjectCreated(state) {
      state.isProjectCreated = false;
    },
    setProject(state, action) {
      state.project = action.payload; // تحديث الحالة للمشروع الواحد
    },
    setLikes(state, action) {
      state.project.likes = action.payload.likes;
    },
    deleteProject(state, action) {
      state.projects = state.projects.filter((p) => p._id !== action.payload);
    },
    addCommentToProject(state, action) {
      state.project.comments.push(action.payload);
    },
    updateCommentProject(state, action) {
      const updatedComments = state.project.comments.map((comment) =>
        comment._id === action.payload._id ? { ...action.payload } : comment
      );
      state.project = {
        ...state.project,
        comments: updatedComments, // تغيير المرجع
      };
    },

    deleteCommentProject(state, action) {
      const comment = state.project.comments.find(
        (c) => c._id === action.payload
      );

      const commentIndex = state.project.comments.indexOf(comment);

      state.project.comments.splice(commentIndex, 1);
    },
  },
});

const projectReducer = projectSlice.reducer;
const projectActions = projectSlice.actions;

export { projectReducer, projectActions };
