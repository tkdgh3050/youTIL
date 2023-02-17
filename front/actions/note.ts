import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const exNote = [
  {
    playListName: "목록1",
    videoList: [
      {
        videoName: "동영상1",
        videoURL: "https://youtube.com/123",
        videoId: "bHQqvYy5KYo",
        videoLength: "",
        bookmarkList: ["00:03:12", "00:04:13"],
        textNote: "adasdasdasdsad",
        lastViewTime: "00:01:02",
      },
    ],
  },
  {
    playListName: "목록2",
    videoList: [
      {
        videoName: "동영상1",
        videoURL: "https://youtube.com/123",
        videoId: "bHQqvYy5KYo",
        videoLength: "",
        bookmarkList: ["00:03:12", "00:04:13"],
        textNote: "adasdasdasdsad",
        lastViewTime: "00:01:02",
      },
    ],
  },
];

export interface NoteData {
  playListName: string;
  videoList: [
    {
      videoName: string;
      videoURL: string;
      videoId: string;
      videoLength: string;
      bookmarkList: string[];
      textNote: string;
      lastViewTime: string;
    }
  ];
}

export const lodeNoteData = createAsyncThunk("note/lodeNote", async (_, thunkAPI) => {
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
