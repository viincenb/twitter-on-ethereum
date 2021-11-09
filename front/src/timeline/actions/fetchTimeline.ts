import { createAsyncThunk } from "@reduxjs/toolkit";
import { callContractWithAccount } from "../../account/actions/callContractWithAccount";
import { ExtraArgument } from "../../store/store";
import { Tweet } from "../../tweet/Tweet";

export const fetchTimeline = createAsyncThunk<
  Tweet[],
  void,
  { extra: ExtraArgument }
>("timeline/fetch", async (none, { dispatch, extra: { contracts } }) => {
  const tweets = await dispatch(
    callContractWithAccount<Tweet[]>(contracts.tweet.methods.getTimeline())
  );

  return tweets.payload as Tweet[];
});
