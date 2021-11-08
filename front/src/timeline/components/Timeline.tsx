import { Stack } from "@fluentui/react";
import { TweetComponent } from "../../tweet/components/TweetComponent";
import { Tweet } from "../../tweet/Tweet";

export interface ITimelineProps {
  tweets: Tweet[];
}

export const Timeline = (props: ITimelineProps) => {
  const { tweets } = props;

  return (
    <Stack>
      {tweets.map((tweet) => (
        <TweetComponent key={tweet.content} tweet={tweet} />
      ))}
    </Stack>
  );
};
