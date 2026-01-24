import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/userReducers.js";
import eventReducers from "./reducers/eventReducers.js";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    event: eventReducers,
  },
});
