import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
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
  updateIsPinned,
  loadLastViewVideoList,
  loadRecentAddVideoList,
  loadPinnedVideoList,
} from '../actions/note';

export interface NoteState {
  playList: PlayList[] | null; // 내 노트정보
  videoInfo: Video | null; // 동영상 재생 시 정보
  lastViewVideoList: Video[] | null; // 메인 - 시청 중 동영상
  recentAddVideoList: Video[] | null; // 메인 - 최근 추가 동영상
  pinnedVideoList: Video[] | null; // 메인 - 즐겨찾기 동영상
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
  updateIsPinnedLoading: boolean; // 동영상을 핀 했는지 안했는지 여부 수정
  updateIsPinnedDone: boolean;
  updateIsPinnedError: Error | null;
  loadLastViewVideoListLoading: boolean; // 메인 - 시청 중 동영상
  loadLastViewVideoListDone: boolean;
  loadLastViewVideoListError: Error | null;
  loadRecentAddVideoListLoading: boolean; // /메인 - 최근 추가 동영상
  loadRecentAddVideoListDone: boolean;
  loadRecentAddVideoListError: Error | null;
  loadPinnedVideoListLoading: boolean; // 메인 - 즐겨찾기 동영상
  loadPinnedVideoListDone: boolean;
  loadPinnedVideoListError: Error | null;
}

const initialState: NoteState = {
  playList: null, // 내 노트정보
  videoInfo: null, // 비디오 정보
  lastViewVideoList: null, // 메인 - 시청 중 동영상
  recentAddVideoList: null, // 메인 - 최근 추가 동영상
  pinnedVideoList: null, // 메인 - 즐겨찾기 동영상
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
  updateIsPinnedLoading: false, // 동영상을 핀 했는지 안했는지 여부 수정
  updateIsPinnedDone: false,
  updateIsPinnedError: null,
  loadLastViewVideoListLoading: false, // 메인 - 시청 중 동영상
  loadLastViewVideoListDone: false,
  loadLastViewVideoListError: null,
  loadRecentAddVideoListLoading: false, // /메인 - 최근 추가 동영상
  loadRecentAddVideoListDone: false,
  loadRecentAddVideoListError: null,
  loadPinnedVideoListLoading: false, // 메인 - 즐겨찾기 동영상
  loadPinnedVideoListDone: false,
  loadPinnedVideoListError: null,
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: {
    // 플레이리스트 불러오기
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
    // 플레이리스트 추가
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
    // 비디오 추가
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
    // 플레이리스트 삭제
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
    // 비디오 삭제
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
    // 비디오 정보들 불러오기
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
    // 북마크 추가
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
    // 북마크 삭제
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
    // 필기와 마지막 본 시간 업데이트
    [updateTextNoteLastViewTime.pending.type]: state => {
      state.updateTextNoteLastViewTimeLoading = true;
      state.updateTextNoteLastViewTimeDone = false;
      state.updateTextNoteLastViewTimeError = null;
    },
    [updateTextNoteLastViewTime.fulfilled.type]: state => {
      state.updateTextNoteLastViewTimeLoading = false;
      state.updateTextNoteLastViewTimeDone = true;
    },
    [updateTextNoteLastViewTime.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.updateTextNoteLastViewTimeLoading = false;
      state.updateTextNoteLastViewTimeError = action.payload;
    },
    // 즐겨찾기 업데이트
    [updateIsPinned.pending.type]: state => {
      state.updateIsPinnedLoading = true;
      state.updateIsPinnedDone = false;
      state.updateIsPinnedError = null;
    },
    [updateIsPinned.fulfilled.type]: (state, action: PayloadAction<number>) => {
      if (state.videoInfo) {
        state.videoInfo.isPinned = action.payload;
      }
      state.updateIsPinnedLoading = false;
      state.updateIsPinnedDone = true;
    },
    [updateIsPinned.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.updateIsPinnedLoading = false;
      state.updateIsPinnedError = action.payload;
    },
    // 시청 중 동영상 리스트 불러오기
    [loadLastViewVideoList.pending.type]: state => {
      state.loadLastViewVideoListLoading = true;
      state.loadLastViewVideoListDone = false;
      state.loadLastViewVideoListError = null;
    },
    [loadLastViewVideoList.fulfilled.type]: (state, action: PayloadAction<Video[]>) => {
      state.lastViewVideoList = action.payload;
      state.loadLastViewVideoListLoading = false;
      state.loadLastViewVideoListDone = true;
    },
    [loadLastViewVideoList.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.loadLastViewVideoListLoading = false;
      state.loadLastViewVideoListError = action.payload;
    },
    // 최근 추가한 동영상 리스트 불러오기
    [loadRecentAddVideoList.pending.type]: state => {
      state.loadRecentAddVideoListLoading = true;
      state.loadRecentAddVideoListDone = false;
      state.loadRecentAddVideoListError = null;
    },
    [loadRecentAddVideoList.fulfilled.type]: (state, action: PayloadAction<Video[]>) => {
      state.recentAddVideoList = action.payload;
      state.loadRecentAddVideoListLoading = false;
      state.loadRecentAddVideoListDone = true;
    },
    [loadRecentAddVideoList.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.loadRecentAddVideoListLoading = false;
      state.loadRecentAddVideoListError = action.payload;
    },
    // 최근 즐겨찾기한 동영상 리스트 불러오기
    [loadPinnedVideoList.pending.type]: state => {
      state.loadPinnedVideoListLoading = true;
      state.loadPinnedVideoListDone = false;
      state.loadPinnedVideoListError = null;
    },
    [loadPinnedVideoList.fulfilled.type]: (state, action: PayloadAction<Video[]>) => {
      state.pinnedVideoList = action.payload;
      state.loadPinnedVideoListLoading = false;
      state.loadPinnedVideoListDone = true;
    },
    [loadPinnedVideoList.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.loadPinnedVideoListLoading = false;
      state.loadPinnedVideoListError = action.payload;
    },
  },
});

export default noteSlice;
