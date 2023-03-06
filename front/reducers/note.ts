import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  PlayList,
  lodePlayList,
  addPlayList,
  addVideoList,
  deletePlayList,
  deleteVideo,
  Video,
  PlayListInVideo,
  loadVideoInfoData,
  addBookmark,
  deleteBookmark,
  updateTextNoteLastViewTime,
  Bookmark,
} from "../actions/note";

export interface NoteState {
  playList: PlayList[] | null; //내 노트정보
  videoInfo: Video | null;
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
  loadVideoInfoDataLoading: boolean; // 비디오정보 불러오기
  loadVideoInfoDataDone: boolean;
  loadVideoInfoDataError: Error | null;
  addBookmarkLoading: boolean; // 북마크 추가
  addBookmarkDone: boolean;
  addBookmarkError: Error | null;
  deleteBookmarkLoading: boolean; // 북마크 삭제
  deleteBookmarkDone: boolean;
  deleteBookmarkError: Error | null;
  updateTextNoteLastViewTimeLoading: boolean; // 텍스트노트, 지금까지 본 시간 수정
  updateTextNoteLastViewTimeDone: boolean;
  updateTextNoteLastViewTimeError: Error | null;
}

const initialState: NoteState = {
  playList: null, //내 노트정보
  videoInfo: null, //비디오 정보
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
  loadVideoInfoDataLoading: false, // 비디오정보 불러오기
  loadVideoInfoDataDone: false,
  loadVideoInfoDataError: null,
  addBookmarkLoading: false, // 북마크 추가
  addBookmarkDone: false,
  addBookmarkError: null,
  deleteBookmarkLoading: false, // 북마크 삭제
  deleteBookmarkDone: false,
  deleteBookmarkError: null,
  updateTextNoteLastViewTimeLoading: false, // 텍스트노트, 지금까지 본 시간 수정
  updateTextNoteLastViewTimeDone: false,
  updateTextNoteLastViewTimeError: null,
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
      if (state.playList?.length) {
        state.playList.unshift(action.payload);
      } else {
        state.playList = [action.payload];
      }
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
      if (playList) {
        if (playList.videoList?.length) {
          playList.videoList?.unshift(action.payload);
        } else {
          playList.videoList = [action.payload];
        }
      }
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
    [deletePlayList.fulfilled.type]: (state, action: PayloadAction<number>) => {
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
    [loadVideoInfoData.pending.type]: state => {
      state.loadVideoInfoDataLoading = true;
      state.loadVideoInfoDataDone = false;
      state.loadVideoInfoDataError = null;
    },
    [loadVideoInfoData.fulfilled.type]: (state, action: PayloadAction<Video>) => {
      state.videoInfo = action.payload;
      state.loadVideoInfoDataLoading = false;
      state.loadVideoInfoDataDone = true;
    },
    [loadVideoInfoData.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.loadVideoInfoDataLoading = false;
      state.loadVideoInfoDataError = action.payload;
    },
    [addBookmark.pending.type]: state => {
      state.addBookmarkLoading = true;
      state.addBookmarkDone = false;
      state.addBookmarkError = null;
    },
    [addBookmark.fulfilled.type]: (state, action: PayloadAction<Bookmark>) => {
      if (state.videoInfo?.bookmarkList) {
        state.videoInfo.bookmarkList.push(action.payload);
        state.videoInfo.bookmarkList.sort((a, b) => a.time - b.time);
      }
      state.addBookmarkLoading = false;
      state.addBookmarkDone = true;
    },
    [addBookmark.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.addBookmarkLoading = false;
      state.addBookmarkError = action.payload;
    },
    [deleteBookmark.pending.type]: state => {
      state.deleteBookmarkLoading = true;
      state.deleteBookmarkDone = false;
      state.deleteBookmarkError = null;
    },
    [deleteBookmark.fulfilled.type]: (state, action: PayloadAction<number>) => {
      if (state.videoInfo?.bookmarkList) {
        state.videoInfo.bookmarkList = state.videoInfo.bookmarkList.filter(v => v.id !== action.payload);
      }
      state.deleteBookmarkLoading = false;
      state.deleteBookmarkDone = true;
    },
    [deleteBookmark.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.deleteBookmarkLoading = false;
      state.deleteBookmarkError = action.payload;
    },
    [updateTextNoteLastViewTime.pending.type]: state => {
      state.updateTextNoteLastViewTimeLoading = true;
      state.updateTextNoteLastViewTimeDone = false;
      state.updateTextNoteLastViewTimeError = null;
    },
    [updateTextNoteLastViewTime.fulfilled.type]: (state, action: PayloadAction<{ textNote: string; lastViewTime: number }>) => {
      if (state.videoInfo) {
        state.videoInfo.lastViewTime = action.payload.lastViewTime;
        state.videoInfo.textNote = action.payload.textNote;
      }
      state.updateTextNoteLastViewTimeLoading = false;
      state.updateTextNoteLastViewTimeDone = true;
    },
    [updateTextNoteLastViewTime.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.updateTextNoteLastViewTimeLoading = false;
      state.updateTextNoteLastViewTimeError = action.payload;
    },
  },
});

export default noteSlice;
