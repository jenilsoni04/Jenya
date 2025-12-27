import { call, put, takeLatest } from "redux-saga/effects";
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
} from "./productSlice";

function* fetchProductsApi(action) {
  const { skip = 0, limit = 20, category = "" } = action.payload || {};
  let url = `https://dummyjson.com/products?skip=${skip}&limit=${limit}`;
  
  if (category) {
    url = `https://dummyjson.com/products/category/${category}?skip=${skip}&limit=${limit}`;
  }

  try {
    const response = yield call(fetch, url);
    const data = yield response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

function* fetchCategoriesApi() {
  try {
    const response = yield call(fetch, "https://dummyjson.com/products/categories");
    const data = yield response.json();
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return data;
  } catch (error) {
    throw error;
  }
}

function* fetchProductsWorker(action) {
  try {
    const data = yield call(fetchProductsApi, action);
    yield put(fetchProductsSuccess(data));
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

function* fetchCategoriesWorker() {
  try {
    const data = yield call(fetchCategoriesApi);
    // Ensure we're storing an array
    const categoriesArray = Array.isArray(data) ? data : [];
    yield put(fetchCategoriesSuccess(categoriesArray));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    yield put(fetchCategoriesSuccess([])); // Set empty array on error
  }
}

export default function* productSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProductsWorker);
  yield takeLatest(fetchCategoriesRequest.type, fetchCategoriesWorker);
}

