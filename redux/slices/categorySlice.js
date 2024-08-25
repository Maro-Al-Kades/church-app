import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },

    AddCategory(state, action) {
      state.categories.push(action.payload)
    },

    deleteCategory(state, action) {
      state.categories = state.categories.filter(c => c._id !== action.payload)
    }
  },
});

const categoryReducer = categorySlice.reducer;
const categoryActions = categorySlice.actions;

export { categoryReducer, categoryActions };
