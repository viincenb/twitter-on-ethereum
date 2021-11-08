import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Web3 from "web3";
import { connectedAccount } from "../account/slices/connectedAccount";
import { logger } from "redux-logger";
import { timeline } from "../timeline/slices/timeline";
import { tweetEditor } from "../tweet/slices/tweetEditor";

const reducer = combineReducers({
  connectedAccount: connectedAccount.reducer,
  timeline: timeline.reducer,
  tweetEditor: tweetEditor.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { web3: new Web3((window as any).ethereum) } },
    }).concat(logger),
});

export type RootState = ReturnType<typeof reducer>;

export type AppDispatch = typeof store.dispatch;
