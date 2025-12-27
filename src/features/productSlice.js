import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    loading: false,
    error: null,
    total: 0,
    skip: 0,
    limit: 20,
    selectedCategory: "",
  },
  reducers: {
    fetchProductsRequest: (state, action) => {
      state.loading = true;
      state.error = null;
      if (action.payload?.skip !== undefined) {
        state.skip = action.payload.skip;
      }
      if (action.payload?.category) {
        state.selectedCategory = action.payload.category;
      }
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.products;
      state.total = action.payload.total;
      state.skip = action.payload.skip;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCategoriesRequest: (state) => {
      // Categories loading state if needed
    },
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.skip = 0;
    },
  },
});

export const {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  setCategory,
} = productSlice.actions;

export default productSlice.reducer;

