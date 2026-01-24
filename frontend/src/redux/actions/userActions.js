import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "../index.jsx";

export const userRegister = createAsyncThunk(
  "/user/signup",
  async (user, thankApi) => {
    try {
      const reponce = await clientServer.post("/signup", {
        username: user.username,
        phone: user.phone,
        email: user.email,
        password: user.password,
      });
      return thankApi.fulfillWithValue(reponce.data);
    } catch (err) {
      return thankApi.rejectWithValue(err.response.data);
    }
  },
);

export const userLogin = createAsyncThunk(
  "/user/Login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/login", {
        email: user.email,
        password: user.password,
      });
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        return thunkAPI.rejectWithValue("token not Provided");
      }
      return thunkAPI.fulfillWithValue(reponce.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);

export const getUser = createAsyncThunk(
  "/user/getUser",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/user", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  },
);
