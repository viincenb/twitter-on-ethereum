import { createSlice } from "@reduxjs/toolkit";
import { Tweet } from "../../tweet/Tweet";
import { fetchTimeline } from "../actions/fetchTimeline";

interface timelineState {
  tweets: Tweet[];
}

const initialState: timelineState = {
  tweets: [],
};

export const timeline = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTweets: (state, { payload }) => {
      state.tweets = payload;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchTimeline.fulfilled, (state, { payload }) => {
      state.tweets = payload;
    }),
});
