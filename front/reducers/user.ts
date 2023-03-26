import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserInfo, userLogin, userLogout, userRegister } from "../actions/user";

export interface UserState {
  userInfo: UserInfo | null;
  loginLoading: boolean; // 로그인 시도중
  loginDone: boolean;
  loginError: null;
  logoutLoading: boolean; // 로그아웃 시도중
  logoutDone: boolean;
  logoutError: null;
  registerLoading: boolean; // 회원가입 시도중
  registerDone: boolean;
  registerError: null;
}

const initialState: UserState = {
  userInfo: null, // 내 정보
  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
  logoutLoading: false, // 로그아웃 시도중
  logoutDone: false,
  logoutError: null,
  registerLoading: false, // 회원가입 시도중
  registerDone: false,
  registerError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    // 로그인
    [userLogin.pending.type]: state => {
      state.loginLoading = true;
      state.loginDone = false;
      state.loginError = null;
    },
    [userLogin.fulfilled.type]: (state, action: PayloadAction<UserInfo>) => {
      state.loginLoading = false;
      state.userInfo = action.payload;
      state.loginDone = true;
    },
    [userLogin.rejected.type]: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    // 로그아웃
    [userLogout.pending.type]: state => {
      state.logoutLoading = true;
      state.logoutDone = false;
      state.logoutError = null;
    },
    [userLogout.fulfilled.type]: state => {
      state.logoutLoading = false;
      state.userInfo = null;
      state.logoutDone = true;
    },
    [userLogout.rejected.type]: (state, action) => {
      state.logoutLoading = false;
      state.logoutError = action.payload;
    },
    // 회원가입
    [userRegister.pending.type]: state => {
      state.registerLoading = true;
      state.registerDone = false;
      state.registerError = null;
    },
    [userRegister.fulfilled.type]: state => {
      state.registerLoading = false;
      state.registerDone = true;
    },
    [userRegister.rejected.type]: (state, action) => {
      state.registerLoading = false;
      state.registerError = action.payload;
    },
  },
});

export default userSlice;
