import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { NoteData, lodeNoteData } from "../actions/note";

export interface NoteState {
  noteData: NoteData[] | null; //내 노트정보
  lodeNoteDataLoading: boolean; // 내 노트정보 불러오기
  lodeNoteDataDone: boolean;
  lodeNoteDataError: Error | null;
}

const initialState: NoteState = {
  noteData: null, //내 노트정보
  lodeNoteDataLoading: false, // 내 노트정보 불러오기
  lodeNoteDataDone: false,
  lodeNoteDataError: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers: {
    [lodeNoteData.pending.type]: state => {
      state.lodeNoteDataLoading = true;
      state.lodeNoteDataDone = false;
      state.lodeNoteDataError = null;
    },
    [lodeNoteData.fulfilled.type]: (state, action: PayloadAction<NoteData[]>) => {
      state.lodeNoteDataLoading = false;
      state.lodeNoteDataDone = true;
      state.noteData = action.payload;
    },
    [lodeNoteData.rejected.type]: (state, action: PayloadAction<Error>) => {
      state.lodeNoteDataLoading = false;
      state.lodeNoteDataError = action.payload;
    },
  },
});

export default noteSlice;
