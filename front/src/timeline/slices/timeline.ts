import { createSlice } from "@reduxjs/toolkit";
import { Tweet } from "../../tweet/Tweet";

interface timelineState {
  tweets: Tweet[];
}

const initialState: timelineState = {
  tweets: [
    {
      content: "My first tweet",
    },
    {
      content: "My second tweet",
    },
  ],
};

export const timeline = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTweets: (state, { payload }) => {
      state.tweets = payload;
    },
  },
});
