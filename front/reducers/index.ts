import { combineReducers } from "redux";

import userSlice from "./user";

const rootReducer = combineReducers({
  //reducer 들 넣기
  user: userSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
