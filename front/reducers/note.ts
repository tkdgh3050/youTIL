import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PlayList, lodePlayList, addPlayList, addVideoList, Video } from "../actions/note";

export interface NoteState {
  playList: PlayList[] | null; //내 노트정보
  lodePlayListLoading: boolean; // 내 노트정보 불러오기
  lodePlayListDone: boolean;
  lodePlayListError: Error | null;
  addPlayListLoading: boolean; // 재생목록 추가
  addPlayListDone: boolean;
  addPlayListError: Error | null;
  addVideoListLoading: boolean; // 재생목록 추가
  addVideoListDone: boolean;
  addVideoListError: Error | null;
}

const initialState: NoteState = {
  playList: null, //내 노트정보
  lodePlayListLoading: false, // 내 노트정보 불러오기
  lodePlayListDone: false,
  lodePlayListError: null,
  addPlayListLoading: false, // 재생목록 추가
  addPlayListDone: false,
  addPlayListError: null,
  addVideoListLoading: false, // 비디오 추가
  addVideoListDone: false,
  addVideoListError: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: {
    [lodePlayList.pending.type]: state => {
      state.lodePlayListLoading = true;
      state.lodePlayListDone = false;
      state.lodePlayListError = null;
    },
    [lodePlayList.fulfilled.type]: (state, action: PayloadAction<PlayList[]>) => {
      state.lodePlayListLoading = false;
      state.lodePlayListDone = true;
      state.playList = action.payload;
    },
    [lodePlayList.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.lodePlayListLoading = false;
      state.lodePlayListError = action.payload;
    },
    [addPlayList.pending.type]: state => {
      state.addPlayListLoading = true;
      state.addPlayListDone = false;
      state.addPlayListError = null;
    },
    [addPlayList.fulfilled.type]: (state, action: PayloadAction<PlayList>) => {
      state.addPlayListLoading = false;
      state.addPlayListDone = true;
      state.playList?.unshift(action.payload);
    },
    [addPlayList.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.addPlayListLoading = false;
      state.addPlayListError = action.payload;
    },
    [addVideoList.pending.type]: state => {
      state.addVideoListLoading = true;
      state.addVideoListDone = false;
      state.addVideoListError = null;
    },
    [addVideoList.fulfilled.type]: (state, action: PayloadAction<Video>) => {
      const playList = state.playList?.find(v => v.id === action.payload.playListId);
      console.log(action.payload.playListId);
      playList?.videoList?.unshift(action.payload);
      state.addVideoListLoading = false;
      state.addVideoListDone = true;
    },
    [addVideoList.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.addVideoListLoading = false;
      state.addVideoListError = action.payload;
    },
  },
});

export default noteSlice;
