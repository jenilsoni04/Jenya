import { call, put, takeLatest } from "redux-saga/effects";
import { loginRequest, loginSuccess, loginFailure } from "./authSlice";

function loginApi({ username, password }) {
  return fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Invalid credentials");
    }
    return data;
  });
}

function* loginWorker(action) {
  try {
    const data = yield call(loginApi, action.payload);
    localStorage.setItem("token", data.token);
    console.log("Login successful, token saved, dispatching loginSuccess");
    yield put(loginSuccess(data));
  } catch (err) {
    console.error("Login failed:", err.message);
    yield put(loginFailure(err.message));
  }
}

export default function* authSaga() {
  yield takeLatest(loginRequest.type, loginWorker);
}
