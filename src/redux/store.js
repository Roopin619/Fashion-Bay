import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";
import logger from "redux-logger";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const sagaMiddleWare = createSagaMiddleware();

const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleWare,
].filter(Boolean);

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleWare.run(rootSaga);

export const persistor = persistStore(store);
