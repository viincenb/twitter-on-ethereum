import { TweetComponent } from "../../tweet/components/TweetComponent";
import { Tweet } from "../../tweet/Tweet";

export interface ITimelineProps {
  tweets: Tweet[];
}

export const Timeline = (props: ITimelineProps) => {
  return (
    <>
      {props.tweets.map((tweet) => (
        <TweetComponent tweet={tweet} />
      ))}
    </>
  );
};
