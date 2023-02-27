import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import shortId from "shortid";

const exNote = [
  {
    id: shortId.generate(),
    playListName: "목록1",
    videoList: [
      {
        id: shortId.generate(),
        videoName: "동영상1",
        videoURL: "https://youtube.com/123",
        videoLength: 6000,
        bookmarkList: ["00:03:12", "00:04:13"],
        textNote: "adasdasdasdsad",
        lastViewTime: 0,
      },
      {
        id: shortId.generate(),
        videoName: "동영상2323232323",
        videoURL: "https://youtube.com/1234",
        videoLength: 8000,
        bookmarkList: ["00:03:12", "00:04:13", "00:12:13"],
        textNote: "adasdasdasdsad",
        lastViewTime: 23,
      },
    ],
  },
  {
    id: shortId.generate(),
    playListName: "목록222222222222222222222222222222222222222",
    videoList: [
      {
        id: shortId.generate(),
        videoName: "동영상222222222222222222",
        videoURL: "https://youtube.com/1234567",
        videoLength: 10000,
        bookmarkList: ["00:03:12", "00:04:13"],
        textNote: "qqq",
        lastViewTime: 1000,
      },
    ],
  },
];

export interface PlayList {
  id: string;
  playListName: string;
  videoList?: Video[];
}

export interface Video {
  id: string;
  videoName: string;
  videoURL: string;
  videoLength?: number;
  bookmarkList?: string[];
  textNote?: string;
  lastViewTime: number;
  playListId?: string;
}

export interface PlayListInVideo {
  videoId: string;
  playListId: string;
}

export const lodePlayList = createAsyncThunk("note/lodePlayList", async (_, thunkAPI) => {
  try {
    const response = {
      data: exNote,
    };
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
});

export const addPlayList = createAsyncThunk("note/addPlayList", async (data: PlayList, thunkAPI) => {
  try {
    const response = {
      data: {
        id: shortId.generate(),
        playListName: data.playListName,
        videoList: [],
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

export const addVideoList = createAsyncThunk("note/addVideoList", async (data: Video, thunkAPI) => {
  try {
    const response = {
      data: {
        playListId: data.playListId,
        id: shortId.generate(),
        videoName: data.videoName,
        videoURL: data.videoURL,
        lastViewTime: 0,
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

export const deletePlayList = createAsyncThunk("note/deletePlayList", async (data: string, thunkAPI) => {
  try {
    const response = {
      data,
    };
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
});

export const deleteVideo = createAsyncThunk("note/deleteVideo", async (data: PlayListInVideo, thunkAPI) => {
  try {
    const response = {
      data: {
        videoId: data.videoId,
        playListId: data.playListId,
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

export const loadVideoInfoData = createAsyncThunk("note/loadVideoInfoData", async (data: PlayListInVideo, thunkAPI) => {
  try {
    const response: { data: Video } = {
      data: {
        id: data.videoId,
        videoName: "동영상1",
        videoURL: "https://youtube.com/123",
        videoLength: 10000,
        bookmarkList: ["00:12:23", "00:56:12"],
        textNote: "<div>asdasd</div>",
        lastViewTime: 123,
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

export const addBookmark = createAsyncThunk("note/addBookmark", async (data: string, thunkAPI) => {
  try {
    const response = {
      data,
    };
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
});

export const deleteBookmark = createAsyncThunk("note/deleteBookmark", async (data: number, thunkAPI) => {
  try {
    const response = {
      data,
    };
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
});
