import express, { NextFunction, Request, Response } from "express";
import User from "../models/User.ts";
import Tweet from "../models/Tweet.ts";
import { TweetType, UserType } from "../interfaces/models.ts";
import {
  getTweetId,
  getAllUserTweets,
  getAllFollowingTweets,
  deleteTweet,
  likeTweet,
  removeLike,
  retweet,
  removeRetweet,
  removeBookmark,
  bookmark,
  addTweetIsViewed,
  sendReply,
  getTweetReplies,
  getAllUserReplies,
  getAllUserLikedTweets
} from "../controllers/tweets.ts";
const router = express.Router();

router.get("/:tweetId", getTweetId);

router.get("/get-all-user-tweets/:userId", getAllUserTweets);

router.get("/get-all-user-replies/:userId", getAllUserReplies);

router.get("/get-all-user-likes/:userId", getAllUserLikedTweets);

router.get("/get-replies/:tweetId", getTweetReplies);

router.get("/get-all-following-tweets/:userId", getAllFollowingTweets);

router.delete("/delete-tweet", deleteTweet);

router.patch("/like-tweet", likeTweet);

router.delete("/remove-like-tweet", removeLike);

router.patch("/retweet", retweet);

router.delete("/remove-retweet", removeRetweet);

router.patch("/bookmark-tweet", bookmark);

router.delete("/remove-bookmark", removeBookmark);

router.patch("/add-tweet-is-viewed", addTweetIsViewed);

router.post("/send-reply", sendReply);

export default router;
