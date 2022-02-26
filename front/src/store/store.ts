import { configureStore, combineReducers } from "@reduxjs/toolkit";
import Web3 from "web3";
import { connectedAccount } from "../account/slices/connectedAccount";
import { createLogger } from "redux-logger";
import { timeline } from "../timeline/slices/timeline";
import { tweetEditor } from "../tweet/slices/tweetEditor";
import { injectContract } from "../web3/middlewares/injectContract";
import tweetContractAbi from "../web3/Tweets.json";
import followContractAbi from "../web3/Folllows.json";
import timelineContractAbi from "../web3/Timelines.json";
import { accountMiddleware } from "../account/middlewares/accountMiddlewares";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

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
    follow: injectContract(
      web3,
      followContractAbi,
      "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    ),
    timeline: injectContract(
      web3,
      timelineContractAbi,
      "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
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
      }),
      accountMiddleware
    ),
});

export type RootState = ReturnType<typeof reducer>;

export type ExtraArgument = typeof extraArgument;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
