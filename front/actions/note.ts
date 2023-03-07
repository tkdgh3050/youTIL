import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backUrl } from "../config/config";

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export interface PlayList {
  id: number;
  playListName: string;
  videoList?: Video[];
}

export interface Video {
  id: number;
  videoName: string;
  videoURL: string;
  videoLength?: number;
  bookmarkList?: Bookmark[];
  textNote?: string;
  lastViewTime: number;
  playListId?: number;
  isPinned?: number;
}

export interface PlayListInVideo {
  videoId: number;
  playListId: number;
}

export interface Bookmark {
  id: number;
  time: number;
  playListId: number;
  videoId: number;
}

export const lodePlayList = createAsyncThunk("note/lodePlayList", async (_, thunkAPI) => {
  try {
    const response = await axios.get("note/");
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

export const addPlayList = createAsyncThunk("note/addPlayList", async (data: PlayList, thunkAPI) => {
  try {
    const response = await axios.post("note/playList", data);
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

export const addVideoList = createAsyncThunk("note/addVideoList", async (data: Video, thunkAPI) => {
  try {
    const response = await axios.post("note/videoList", data);
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

export const deletePlayList = createAsyncThunk("note/deletePlayList", async (data: number, thunkAPI) => {
  try {
    const response = await axios.delete(`note/playList/${data}`);
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

export const deleteVideo = createAsyncThunk("note/deleteVideo", async (data: PlayListInVideo, thunkAPI) => {
  try {
    const response = await axios.delete(`note/videoList/${data.playListId}/${data.videoId}`);
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

export const loadVideoInfoData = createAsyncThunk("note/loadVideoInfoData", async (data: PlayListInVideo, thunkAPI) => {
  try {
    const response = await axios.get(`note/videoInfo/${data.playListId}/${data.videoId}`);
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

export const addBookmark = createAsyncThunk("note/addBookmark", async (data: { playListInVideo: PlayListInVideo; time: string }, thunkAPI) => {
  try {
    const response = await axios.post("note/bookmark", data);
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

export const deleteBookmark = createAsyncThunk("note/deleteBookmark", async (data: number, thunkAPI) => {
  try {
    // 해당하는 북마크 인덱스 삭제
    const response = await axios.delete(`note/bookmark/${data}`);
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

export const updateTextNoteLastViewTime = createAsyncThunk(
  "note/updateTextNoteLastViewTime",
  async (data: { playListInVideo: PlayListInVideo; textNote: string; lastViewTime: number }, thunkAPI) => {
    try {
      const response = await axios.patch(`note/videoInfo/textNoteLastViewTime`, data);
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
  }
);

export const updateIsPinned = createAsyncThunk(
  "note/updateIsPinned",
  async (data: { playListInVideo: PlayListInVideo; isPinned: number }, thunkAPI) => {
    try {
      const response = await axios.patch(`note/videoInfo/isPinned`, data);
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
  }
);
