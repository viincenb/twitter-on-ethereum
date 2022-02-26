import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { tweet } from "../actions/tweet";
import { ITweetEditorEvents, ITweetEditorProps, TweetEditor } from "./TweetEditor";

const mapTweetEditorStateToProps = ({
  tweetEditor: { tweet },
}: RootState): ITweetEditorProps => ({
  tweet,
});

const mapTweetEditorDispatchToEvents = {
  onSubmit: tweet,
};

export const AccountTweetEditor = connect<
  ITweetEditorProps,
  ITweetEditorEvents,
  {},
  RootState
>(
  mapTweetEditorStateToProps,
  mapTweetEditorDispatchToEvents
)(TweetEditor);
