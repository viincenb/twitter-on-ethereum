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
      <Stack
        horizontal
        tokens={{ childrenGap: "s1" }}
        verticalAlign="baseline"
      >
        <Text style={{ fontWeight: 600 }} variant="mediumPlus">
          {tweet.author}
        </Text>

        {dateCreated && (
          <Text variant="mediumPlus">{dateCreated.toLocaleDateString()}</Text>
        )}
      </Stack>

      <Text style={{ fontWeight: 400 }} variant="xLarge">
        {tweet.content}
      </Text>
    </Stack>
  );
};
