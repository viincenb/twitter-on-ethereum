import { configureStore } from "@reduxjs/toolkit";
import Web3 from "web3";
import { connectedAccount } from "../account/slices/connectedAccount";
import { logger } from "redux-logger";
import { timeline } from "../timeline/slices/timeline";

export const store = configureStore({
  reducer: {
    connectedAccount: connectedAccount.reducer,
    timeline: timeline.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { web3: new Web3((window as any).ethereum) } },
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
