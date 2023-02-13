import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import reducer from "../reducers";
import rootSaga from "../sagas";

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production" ? compose(applyMiddleware(...middleWares)) : composeWithDevTools(applyMiddleware(...middleWares)); // 개발용

  const store = createStore(reducer, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
};

export default configureStore;
