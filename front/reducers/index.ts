import { combineReducers } from "redux";

import userSlice from "./user";
import noteSlice from "./note";

const rootReducer = combineReducers({
  //reducer 들 넣기
  user: userSlice.reducer,
  note: noteSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
