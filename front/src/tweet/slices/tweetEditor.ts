import { createSlice } from "@reduxjs/toolkit";
import { tweet } from "../actions/tweet";
import { TweetInput } from "../Tweet";

export type TweetEditorStatus = "ready" | "sending";

export interface TweetEditorState {
  tweet: TweetInput;
  status: TweetEditorStatus;
}

const initialState: TweetEditorState = {
  tweet: {
    content: "",
  },
  status: "ready",
};

export const tweetEditor = createSlice({
  name: "tweetEditor",
  initialState,
  reducers: {
    setTweet: (state, { payload }) => {
      state.tweet = payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(tweet.pending, (state) => {
        state.status = "sending";
      })
      .addCase(tweet.fulfilled, (state) => {
        state.status = "ready";
      })
      .addCase(tweet.rejected, (state) => {
        state.status = "ready";
      }),
});

export const { setTweet } = tweetEditor.actions;
