/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState } from "react";
import { TweetType, UserType } from "../interfaces/models";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../interfaces/redux";
import { bookmarkTweet } from "../state/auth";
export default function useBookmark(tweet: TweetType) {
  const { user: myUser } = useSelector((state: ReduxState) => state.auth);

  const dispatch = useDispatch();

  const [isBookmarked, setIsBookmarked] = useState(
    myUser!.bookmarkedTweets.some((id) => id === tweet._id)
  );

  const [bookmarks, setBookmarks] = useState(tweet.bookmarks.length);

  const handleBookmarkTweet = () => {
    const body = JSON.stringify({ myUserId: myUser?._id, tweetId: tweet._id });
    if (isBookmarked) {
      setIsBookmarked((prev) => !prev);
      setBookmarks((prev) => prev - 1);
      dispatch(bookmarkTweet({ tweetId: tweet._id }));
      fetch(`http://localhost:3000/tweet/remove-bookmark`, {
        headers: { "Content-Type": "application/json" },
        method: "DELETE",
        body,
      });
    }
    if (!isBookmarked) {
      setIsBookmarked((prev) => !prev);
      setBookmarks((prev) => prev + 1);
      dispatch(bookmarkTweet({ tweetId: tweet._id }));
      fetch(`http://localhost:3000/tweet/bookmark-tweet`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body,
      });
    }
  };

  return { isBookmarked, bookmarks, handleBookmarkTweet };
}
