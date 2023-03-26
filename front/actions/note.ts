import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { backUrl } from "../config/config";

// axios 기본설정으로 back 서버 주소와 credential 설정
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
  created_at?: string;
  modified_lastViewTime_at?: string;
  modified_isPinned_at?: string;
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

// 모든 playlist를 불러오는 action
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

// playlist 추가하는 action, PlayList 파라미터 받음
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

// video 추가하는 action, Video 파라미터 받음
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

// playlist 지우는 action, playlist id 파라미터 받음
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

// video 지우는 action, playlist id 와 video id 파라미터 받음
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

// videoView에서 사용할 video 관련 데이터 불러오는 action, playlist id 와 video id 파라미터 받음
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

// 북마크 추가하는 action, playlist id 와 video id 그리고 시간정보를 파라미터로 받음
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

// 북마크 삭제하는 action, bookmark id를 파라미터로 받음
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

// 필기랑 마지막 재생위치 저장하는 action, playlist id 와 video id, 필기, 마지막 재생위치 파라미터로 받음
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

// 동영상 핀 지정여부를 업데이트 하는 action, playlist id 와 video id와 핀 여부를 1과 0 숫자인 파라미터로 받음
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

// 메인화면에서 시청중인 동영상 정보 불러오는 action
export const loadLastViewVideoList = createAsyncThunk("note/loadLastViewVideoList", async (data, thunkAPI) => {
  try {
    const response = await axios.get(`note/loadLastViewVideoList`);
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

// 메인화면에서 최근 추가한 동영상 정보 불러오는 action
export const loadRecentAddVideoList = createAsyncThunk("note/loadRecentAddVideoList", async (data, thunkAPI) => {
  try {
    const response = await axios.get(`note/loadRecentAddVideoList`);
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

// 메인화면에서 최근 즐겨찾기한 동영상 불러오는 action
export const loadPinnedVideoList = createAsyncThunk("note/loadPinnedVideoList", async (data, thunkAPI) => {
  try {
    const response = await axios.get(`note/loadPinnedVideoList`);
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
