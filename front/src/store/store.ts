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
      "0x10A4F076F65FC5EF27934863888556E8811583d0"
    ),
    follow: injectContract(
      web3,
      followContractAbi,
      "0x866174D8E0dd7754407D6617a9a52F0aB0E83F7e"
    ),
    timeline: injectContract(
      web3,
      timelineContractAbi,
      "0x7b1E6358De3C08d063B4F3D3129C078805FF3E19"
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
