import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export interface UserData {
  email: string;
  password: string;
  isAdmin?: boolean;
}

export interface UserInfo {
  email: string;
  isAdmin: boolean;
}

export const userLogin = createAsyncThunk("user/login", async (data: UserData, thunkAPI) => {
  try {
    const response = await axios.post("/user/login", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      if (err.response) {
        return thunkAPI.rejectWithValue({ status: err.response.status, data: err.response.data });
      }
    }
  }
});

export const userLogout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/user/logout");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      if (err.response) {
        return thunkAPI.rejectWithValue({ status: err.response.status, data: err.response.data });
      }
    }
  }
});

export const userRegister = createAsyncThunk("user/register", async (data: UserData, thunkAPI) => {
  try {
    await axios.post("/user", data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      console.log(err);
      if (err.response) {
        return thunkAPI.rejectWithValue({ status: err.response.status, data: err.response.data });
      }
    }
    return error;
  }
});
