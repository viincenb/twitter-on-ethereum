import { Stack, Text } from "@fluentui/react";
import { Tweet } from "../Tweet";

export interface ITweetProps {
  tweet: Tweet;
}

export const TweetComponent = ({ tweet }: ITweetProps) => {
  const dateCreated: Date | null = tweet.dateCreated
    ? new Date(tweet.dateCreated * 1000)
    : null;

  return (
    <Stack tokens={{ childrenGap: "s1" }}>
      {dateCreated && <Text variant="medium">{dateCreated.toLocaleDateString()}</Text>}
      <Text variant="mediumPlus">{tweet.author}</Text>
      <Text variant="xxLarge">{tweet.content}</Text>
    </Stack>
  );
};
