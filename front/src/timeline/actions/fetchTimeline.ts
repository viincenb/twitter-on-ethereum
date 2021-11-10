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
    callContractWithAccount<Tweet[]>(
      contracts.timeline.methods.getTimeline(
        contracts.tweet.options.address,
        contracts.follow.options.address
      )
    )
  );

  return (tweets.payload as Tweet[])
    .concat([])
    .sort((a, b) => (a.dateCreated < b.dateCreated ? 1 : -1));
});
