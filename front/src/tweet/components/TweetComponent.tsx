import { Text } from "@fluentui/react";
import { Tweet } from "../Tweet";

export interface ITweetProps {
  tweet: Tweet;
}

export const TweetComponent = ({ tweet }: ITweetProps) => {
  return (
    <>
      <Text variant="large">{tweet.author}</Text>
      <Text variant="xxLarge">{tweet.content}</Text>
    </>
  );
};
