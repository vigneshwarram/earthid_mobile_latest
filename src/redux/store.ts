import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
import {
  userReducer,
  accountReducer,
  contractReducer,
  approveOTPReducer,
  documentListReducer,
} from "./reducer/user.reducer";

const persistConfig = {
  key: "root",
  keyPrefix: "",
  storage: AsyncStorage,
  whitelist: ["contract", "user", "Documents"],
};
const rootReducer = combineReducers({
  user: userReducer,
  account: accountReducer,
  contract: contractReducer,
  ApproveOtp: approveOTPReducer,
  Documents: documentListReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
