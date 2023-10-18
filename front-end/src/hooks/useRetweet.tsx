/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react";
import { TweetType, UserType } from "../interfaces/models";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../interfaces/redux";
import { retweetTweet } from "../state/auth";
export default function useRetweet(tweet: TweetType) {
  const { user: myUser } = useSelector((state: ReduxState) => state.auth);

  const dispatch = useDispatch();

  const [isRetweeted, setIsRetweeted] = useState(
    myUser!.retweetedTweets.some((id) => id === tweet._id)
  );

  const [retweets, setRetweets] = useState(tweet.retweets.length);

  const handleRetweetTweet = () => {
    const body = JSON.stringify({ myUserId: myUser?._id, tweetId: tweet._id });
    if (isRetweeted) {
      setIsRetweeted((prev) => !prev);
      setRetweets((prev) => prev - 1);
      dispatch(retweetTweet({ tweetId: tweet._id }));
      fetch(`http://localhost:3000/tweet/remove-retweet`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body,
      });
    }
    if (!isRetweeted) {
      setIsRetweeted((prev) => !prev);
      setRetweets((prev) => prev + 1);
      dispatch(retweetTweet({ tweetId: tweet._id }));
      fetch(`http://localhost:3000/tweet/retweet`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body,
      });
    }
  };

  return { isRetweeted, retweets, handleRetweetTweet };
}
