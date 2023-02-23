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
    playListName: "목록222222222222222222222222222222222222222",
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
  textNote?: Draft.RawDraftContentState;
  lastViewTime: string;
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
        videoLength: "00:12:30",
        bookmarkList: [],
        textNote: {
          blocks: [
            {
              key: "5l1b5",
              text: "asd",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
            {
              key: "7fko",
              text: "qwerwq",
              type: "unstyled",
              depth: 0,
              inlineStyleRanges: [],
              entityRanges: [],
              data: {},
            },
          ],
          entityMap: {},
        },
        lastViewTime: "00:01:02",
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
