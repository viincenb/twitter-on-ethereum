import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Web3 from "web3";
import { connectedAccount } from "../account/slices/connectedAccount";
import { createLogger } from "redux-logger";
import { timeline } from "../timeline/slices/timeline";
import { tweetEditor } from "../tweet/slices/tweetEditor";
import { injectContract } from "../web3/middlewares/injectContract";
import tweetContractAbi from "../tweet/TweetContract.json";

const reducer = combineReducers({
  connectedAccount: connectedAccount.reducer,
  timeline: timeline.reducer,
  tweetEditor: tweetEditor.reducer,
});

const web3 = new Web3((window as any).ethereum);

const extraArgument = {
  web3,
  contracts: {
    tweet: injectContract(
      web3,
      tweetContractAbi,
      "0x5FbDB2315678afecb367f032d93F642f64180aa3"
    ),
  },
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument,
      },
    }).concat(
      createLogger({
        collapsed: true,
      })
    ),
});

export type RootState = ReturnType<typeof reducer>;

export type ExtraArgument = typeof extraArgument;

export type AppDispatch = typeof store.dispatch;
