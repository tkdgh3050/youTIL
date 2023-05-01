import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'regenerator-runtime/runtime';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

import App from './App';
import store from '../store/configureStore';

// 창을 닫았다가 다시 들어왔을 때 유지하고 싶은 redux 값을 불러오기 위해 사용
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.querySelector('#root'),
);
