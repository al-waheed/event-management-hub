import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import EventSlice from "./EventSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["event"],
};
const rootReducer = combineReducers({
  event: EventSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
