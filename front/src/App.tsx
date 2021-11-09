import React from "react";
import { Stack } from "@fluentui/react";
import { Provider, connect } from "react-redux";
import {
  EthereumConnect,
  IEthereumConnectProps,
} from "./account/components/EthereumConnect";
import { RootState, store } from "./store/store";
import { followAccount } from "./timeline/actions/followAccount";
import {
  FollowInput,
  IFollowInputEvents,
} from "./timeline/components/FollowInput";
import { ITimelineProps, Timeline } from "./timeline/components/Timeline";
import { tweet } from "./tweet/actions/tweet";
import {
  ITweetEditorEvents,
  ITweetEditorProps,
  TweetEditor,
} from "./tweet/components/TweetEditor";

function App() {
  const mapStateToProps = ({
    timeline: { tweets },
  }: RootState): ITimelineProps => ({ tweets });

  const ConnectedTimeline = connect<ITimelineProps, {}, {}, RootState>(
    mapStateToProps
  )(Timeline);

  const mapAccountStateToProps = ({
    connectedAccount: { status },
  }: RootState): IEthereumConnectProps => ({
    isDisabled: status === "connecting",
  });

  const ConnectedConnect = connect<IEthereumConnectProps, {}, {}, RootState>(
    mapAccountStateToProps
  )(EthereumConnect);

  const mapTweetEditorStateToProps = ({
    tweetEditor: { tweet },
  }: RootState): ITweetEditorProps => ({
    tweet,
  });

  const mapTweetEditorDispatchToEvents = {
    onSubmit: tweet,
  };

  const ConnectedTweetEditor = connect<
    ITweetEditorProps,
    ITweetEditorEvents,
    {},
    RootState
  >(
    mapTweetEditorStateToProps,
    mapTweetEditorDispatchToEvents
  )(TweetEditor);

  const mapFollowInputDispatchToEvents = {
    onSubmit: followAccount,
  };

  const ConnectedFollowInput = connect<{}, IFollowInputEvents, {}, RootState>(
    () => ({}),
    mapFollowInputDispatchToEvents
  )(FollowInput);

  return (
    <Provider store={store}>
      <Stack
        horizontalAlign="center"
        verticalAlign="center"
      >
        <ConnectedConnect />
        <ConnectedTweetEditor />
        <ConnectedFollowInput />
        <ConnectedTimeline />
      </Stack>
    </Provider>
  );
}

export default App;
