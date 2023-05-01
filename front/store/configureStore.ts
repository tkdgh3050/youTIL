import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import logger from 'redux-logger';

import reducer from '../reducers';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware => {
    if (process.env.NODE_ENV === 'development') {
      return getDefaultMiddleware().concat(logger); // 개발 상태일 때 redux-logger 사용
    }
    return getDefaultMiddleware();
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;
