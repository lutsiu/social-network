import { useEffect, useState } from "react";
import { TweetAndUser } from "../interfaces/models";
import { useSelector } from "react-redux";
import { ReduxState } from "../interfaces/redux";

export default function useTweet(retrievedTweets: TweetAndUser[] | []) {
  const [tweets, setTweets] = useState(retrievedTweets);
  const myUser = useSelector((state: ReduxState) => state.auth.user);

  useEffect(() => {
    const handleUpdateTweets = async function (): Promise<void> {
      try {
        const res = await fetch(
          `http://localhost:3000/tweet/get-all-user-tweets/${
            myUser?._id as string
          }`
        );
        const resFollowingTweets = await fetch(
          `http://localhost:3000/tweet/get-all-following-tweets/${
            myUser?._id as string
          }`
        );
        const userUpdatedTweets = (await res.json()) as TweetAndUser[] | null;
        if (!userUpdatedTweets) return;
        const followingTweets = resFollowingTweets.ok ? await resFollowingTweets.json() as TweetAndUser[] : null;
        setTweets((prev) => {
          const prevFollowingTweets = prev.filter(prevTweet => prevTweet.tweet.userId !== myUser?._id);
          const uniqueIds = new Set();
          const allTweets = followingTweets ? [...userUpdatedTweets, ...followingTweets] : [...userUpdatedTweets ];
          const uniqueTweets = allTweets.filter((tweet) => {
            if (!uniqueIds.has(tweet.tweet._id)) {
              uniqueIds.add(tweet.tweet._id);
              return true
            }
            return false;
          });
          return uniqueTweets;
        });
      } catch (err) {
        console.log(err);
      }
    };
    setTimeout(() => {
      void handleUpdateTweets()
    }, 1000);
  }, [myUser?.tweets, myUser?._id, myUser?.following]);
  // add tweet to tweets when you create it in redux
  return tweets;
}
