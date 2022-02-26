import { TextField, PrimaryButton, Stack, IIconProps } from "@fluentui/react";
import React, { useState } from "react";
import { TweetInput } from "../Tweet";

export interface ITweetEditorEvents {
  onSubmit: (tweet: TweetInput) => any;
}

export interface ITweetEditorProps {
  tweet: TweetInput;
}

export const TweetEditor = (props: ITweetEditorProps & ITweetEditorEvents) => {
  const { onSubmit } = props;
  const [tweet, setTweet] = useState(props.tweet);
  const sendIcon: IIconProps = { iconName: "Send" };

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
      <Stack horizontal tokens={{ childrenGap: "s1" }}>
        <Stack.Item grow>
          <TextField
            onChange={handleChange}
            placeholder="What's happening?"
            value={tweet.content}
          />
        </Stack.Item>

        <PrimaryButton iconProps={sendIcon} type="submit">
          Tweet
        </PrimaryButton>
      </Stack>
    </form>
  );
};
