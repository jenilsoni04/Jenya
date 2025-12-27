import { all } from "redux-saga/effects";
import authSaga from "../features/authSaga";
import productSaga from "../features/productSaga";

export default function* rootSaga() {
  yield all([authSaga(), productSaga()]);
}
