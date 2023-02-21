import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { PlayList, lodePlayList, addPlayList, addVideoList, deletePlayList, deleteVideo, Video, PlayListInVideo } from "../actions/note";

export interface NoteState {
  playList: PlayList[] | null; //내 노트정보
  lodePlayListLoading: boolean; // 내 노트정보 불러오기
  lodePlayListDone: boolean;
  lodePlayListError: Error | null;
  addPlayListLoading: boolean; // 재생목록 추가
  addPlayListDone: boolean;
  addPlayListError: Error | null;
  addVideoListLoading: boolean; // 비디오 추가
  addVideoListDone: boolean;
  addVideoListError: Error | null;
  deletePlayListLoading: boolean; // 재생목록 삭제
  deletePlayListDone: boolean;
  deletePlayListError: Error | null;
  deleteVideoLoading: boolean; // 비디오 삭제
  deleteVideoDone: boolean;
  deleteVideoError: Error | null;
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
  deletePlayListLoading: false, // 재생목록 삭제
  deletePlayListDone: false,
  deletePlayListError: null,
  deleteVideoLoading: false, // 비디오 삭제
  deleteVideoDone: false,
  deleteVideoError: null,
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
      playList?.videoList?.unshift(action.payload);
      state.addVideoListLoading = false;
      state.addVideoListDone = true;
    },
    [addVideoList.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.addVideoListLoading = false;
      state.addVideoListError = action.payload;
    },
    [deletePlayList.pending.type]: state => {
      state.deletePlayListLoading = true;
      state.deletePlayListDone = false;
      state.deletePlayListError = null;
    },
    [deletePlayList.fulfilled.type]: (state, action: PayloadAction<string>) => {
      if (state.playList) {
        const newPlayList = state.playList.filter(v => v.id !== action.payload);
        state.playList = newPlayList;
      }
      state.deletePlayListLoading = false;
      state.deletePlayListDone = true;
    },
    [deletePlayList.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.deletePlayListLoading = false;
      state.deletePlayListError = action.payload;
    },
    [deleteVideo.pending.type]: state => {
      state.deleteVideoLoading = true;
      state.deleteVideoDone = false;
      state.deleteVideoError = null;
    },
    [deleteVideo.fulfilled.type]: (state, action: PayloadAction<PlayListInVideo>) => {
      if (state.playList) {
        const findPlayList = state.playList.find(v => v.id === action.payload.playListId);
        if (findPlayList?.videoList) {
          findPlayList.videoList = findPlayList.videoList.filter(v => v.id !== action.payload.videoId);
        }
      }
      state.deleteVideoLoading = false;
      state.deleteVideoDone = true;
    },
    [deleteVideo.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.deleteVideoLoading = false;
      state.deleteVideoError = action.payload;
    },
  },
});

export default noteSlice;
