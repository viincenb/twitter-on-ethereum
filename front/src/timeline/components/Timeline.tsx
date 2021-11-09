import { Stack } from "@fluentui/react";
import { TweetComponent } from "../../tweet/components/TweetComponent";
import { Tweet } from "../../tweet/Tweet";

export interface ITimelineProps {
  tweets: Tweet[];
}

export const Timeline = (props: ITimelineProps) => {
  const { tweets } = props;

  return (
    <Stack tokens={{ childrenGap: "l2" }}>
      {tweets.map((tweet, index) => (
        <TweetComponent key={index} tweet={tweet} />
      ))}
    </Stack>
  );
};
