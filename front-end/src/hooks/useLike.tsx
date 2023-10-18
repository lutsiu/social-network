/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react";
import { TweetType, UserType } from "../interfaces/models";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../interfaces/redux";
import { likeTweet } from "../state/auth";
export default function useLike(tweet: TweetType) {
  const { user: myUser } = useSelector((state: ReduxState) => state.auth);

  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(
    myUser!.likedTweets.some((id) => id === tweet._id)
  );

  const [likes, setLikes] = useState(tweet.likes.length);

  const handleLikeTweet = () => {
    const body = JSON.stringify({ myUserId: myUser?._id, tweetId: tweet._id });
    if (isLiked) {
      setIsLiked((prev) => !prev);
      setLikes((prev) => prev - 1);
      dispatch(likeTweet({ tweetId: tweet._id }));
      fetch(`http://localhost:3000/tweet/remove-like-tweet`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body,
      });
    }
    if (!isLiked) {
      setIsLiked((prev) => !prev);
      setLikes((prev) => prev + 1);
      dispatch(likeTweet({ tweetId: tweet._id }));
      fetch(`http://localhost:3000/tweet/like-tweet`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body,
      });
    }
  };

  return { isLiked, likes, handleLikeTweet };
}
