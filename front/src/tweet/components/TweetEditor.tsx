import { TextField } from "@fluentui/react";
import React, { useState } from "react";
import { Tweet } from "../Tweet";

export interface ITweetEditorEvents {
  onSubmit: (tweet: Tweet) => any;
}

export interface ITweetEditorProps {
  tweet: Tweet;
}

export const TweetEditor = (props: ITweetEditorProps & ITweetEditorEvents) => {
  const { onSubmit } = props;
  const [tweet, setTweet] = useState(props.tweet);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(tweet);
  };

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) =>
    setTweet({
      ...tweet,
      content: event.currentTarget.value,
    });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        onChange={handleChange}
        placeholder="Tweet something"
        value={tweet.content}
      />
      <input type="submit" hidden />
    </form>
  );
};
