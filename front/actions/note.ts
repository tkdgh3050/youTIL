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
        videoLength: "00:12:30",
        bookmarkList: ["00:03:12", "00:04:13"],
        textNote: "adasdasdasdsad",
        lastViewTime: "00:01:02",
      },
      {
        id: shortId.generate(),
        videoName: "동영상2323232323",
        videoURL: "https://youtube.com/1234",
        videoLength: "00:32:30",
        bookmarkList: ["00:03:12", "00:04:13", "00:12:13"],
        textNote: "adasdasdasdsad",
        lastViewTime: "00:01:02",
      },
    ],
  },
  {
    id: shortId.generate(),
    playListName: "목록22222222",
    videoList: [
      {
        id: shortId.generate(),
        videoName: "동영상222222222222222222",
        videoURL: "https://youtube.com/1234567",
        videoLength: "12:01:10",
        bookmarkList: ["00:03:12", "00:04:13"],
        textNote: "qqq",
        lastViewTime: "00:00:00",
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
  videoLength?: string;
  bookmarkList?: string[];
  textNote?: string;
  lastViewTime: string;
  playListId?: string;
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
        lastViewTime: "",
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
