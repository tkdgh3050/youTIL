import axios, { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { backUrl } from '../config/config';

// axios 기본설정으로 back 서버 주소와 credential 설정
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

// 회원가입, 로그인을 위한 타입
export interface UserData {
  email: string;
  password: string;
  isAdmin?: boolean;
}

// 클라이언트 단에 돌려줄 유저 정보를 위한 타입
export interface UserInfo {
  email: string;
  isAdmin: boolean;
}

// 로그인하는 action
export const userLogin = createAsyncThunk('user/login', async (data: UserData, thunkAPI) => {
  try {
    const response = await axios.post('/user/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      if (err.response) {
        return thunkAPI.rejectWithValue({ status: err.response.status, data: err.response.data });
      }
    } else {
      throw error;
    }
  }
});

// 로그아웃하는 action
export const userLogout = createAsyncThunk('user/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/user/logout');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      if (err.response) {
        return thunkAPI.rejectWithValue({ status: err.response.status, data: err.response.data });
      }
    } else {
      throw error;
    }
  }
});

// 회원가입하는 action
export const userRegister = createAsyncThunk('user/register', async (data: UserData, thunkAPI) => {
  try {
    await axios.post('/user', data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      console.log(err);
      if (err.response) {
        return thunkAPI.rejectWithValue({ status: err.response.status, data: err.response.data });
      }
    } else {
      throw error;
    }
  }
});
