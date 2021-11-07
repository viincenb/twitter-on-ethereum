import { Tweet } from "../Tweet";

export interface ITweetProps {
  tweet: Tweet;
}

export const TweetComponent = (props: ITweetProps) => {
  return (
    <p>
      Tweet <br />
      {props.tweet.content}
    </p>
  );
};
