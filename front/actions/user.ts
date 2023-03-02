import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
    //const response = await axios.post("/user/login", data);
    console.log(data);
    const response = {
      data: {
        email: "a@naver.com",
        isAdmin: false,
      },
    };
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
});

export const userLogout = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  //const response = await axios.post("/user/logout");
  try {
    console.log("logout");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
});

export const userRegister = createAsyncThunk("user/register", async (data: UserData, thunkAPI) => {
  try {
    //const response = await axios.post("/user", data);
    console.log("register");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
});
