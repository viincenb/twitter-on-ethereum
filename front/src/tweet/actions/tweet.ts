import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendContractWithAccount } from "../../account/actions/sendContractWithAccount";
import { ExtraArgument } from "../../store/store";
import { Tweet } from "../Tweet";

export const tweet = createAsyncThunk<any, Tweet, { extra: ExtraArgument }>(
  "tweet",
  async (tweet, { extra: { contracts }, dispatch }) => {
    await dispatch(sendContractWithAccount(contracts.tweet.methods.sendTweet(tweet)));
  }
);
