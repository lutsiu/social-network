import { NextFunction, Request, Response } from "express";
import User from "../models/User.ts";
import Tweet from "../models/Tweet.ts";
import { TweetType, UserType } from "../interfaces/models.ts";
import path from "path";
import { cwd } from "process";
import fs from 'fs/promises'
export const getTweetId = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const tweet = await Tweet.findById(tweetId);
    return res.status(200).json(tweet);
  } catch (e) {
    res.status(404).json("Not found");
  }
};

export const getAllUserTweets = async (req, res) => {
  try {
    // don't forget about pagination
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user.tweets.length === 0) {
      return res.status(404).json(null);
    }

    const tweetsPromises = user.tweets.map((tweet) => Tweet.findById(tweet));
    const tweets = await Promise.all(tweetsPromises);
    const data = tweets.map((tweet) => {
      return { tweet, user };
    });
    tweets.map(tweet => console.log(tweet.description));
    res.status(200).json(data);
  } catch (err) {
    res.status(409).json("some server error occured");
  }
};

export const getAllUserLikedTweets = async (req, res) => {
  try {
    // don't forget about pagination
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user.tweets.length === 0) {
      return res.status(404).json(null);
    }

    const tweetsPromises = user.likedTweets.map((tweet) => Tweet.findById(tweet));
    const tweets = await Promise.all(tweetsPromises);
    const data = tweets.map((tweet) => {
      return { tweet, user };
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(409).json("some server error occured");
  }
};

export const getAllFollowingTweets = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user.following.length === 0) {
      return res.status(404).json(null);
    }
    const { following } = user;
    const followingUsersPromises = following.map((folUser) =>
      User.findById(folUser)
    );
    const followingUsers = await Promise.all(followingUsersPromises);

    const followingTweetsSum = followingUsers.reduce((prev, cur) => {
      return prev + cur.tweets.length;
    }, 0);

    if (followingTweetsSum === 0) {
      return res.status(404).json(null);
    }
    const followingTweetsIDs = followingUsers.flatMap(
      (folUser) => folUser.tweets
    );
    const followingTweetsPromise = followingTweetsIDs.map((tweet) =>
      Tweet.findOne({ _id: tweet })
    );
    const followingTweets = await Promise.all(followingTweetsPromise);

    const dataToReturn = followingTweets.map((folTweet) => {
      const matchingUser = followingUsers.find((folUser) =>
        folUser.tweets.some(
          (tw) => tw._id.toString() === folTweet._id.toString()
        )
      );
      if (matchingUser) {
        return { user: matchingUser, tweet: folTweet };
      }
    });

    return res.status(200).json(dataToReturn);
  } catch (err) {
    res.status(409).json("some server error occured");
  }
};

export const deleteTweet = async (req, res) => {
  try {
    const { myUserId, tweetId } = req.body;
    const myUser = await User.findById(myUserId);
    const tweet = await Tweet.findById(tweetId);
    if (!myUser || !tweet)
      return res.status(404).json("One of users wasn't found");
    if (!myUser.tweets.some((id) => id.toString() === tweetId))
      return res.status(304).json("This isn't a user's tweet");
    if (tweet.userId.toString() !== myUserId)
      return res.status(304).json("This isn't a user's tweet");
    myUser.tweets = myUser.tweets.filter((id) => id.toString() !== tweetId);
    const tweetImages = tweet.images;
    tweetImages.forEach(async (img) => {
      const imgPath = path.join(process.cwd(), img);
      await fs.unlink(imgPath);
    })
    await myUser.save();
    await Tweet.findByIdAndDelete(tweetId);

    return res.status(204);
  } catch (err) {
    res.status(409).json("Some server error occured");
  }
};

export const likeTweet = async (req, res) => {
  try {
    const { myUserId, tweetId } = req.body;
    const myUser = await User.findById(myUserId);
    const tweet = await Tweet.findById(tweetId);
    if (!myUser || !tweet)
      return res.status(404).json("One of users wasn't found");
    if (myUser.likedTweets.some((id) => id.toString() === tweetId))
      return res.status(304).json("Tweet has already been liked");
    if (tweet.likes.some((id) => id.toString() === myUserId))
      return res.status(304).json("Tweet has already been liked");
    myUser.likedTweets.push(tweetId);
    myUser.save();
    tweet.likes.push(myUserId);
    tweet.save();
    return res.status(204);
  } catch (err) {
    res.status(409).json("Some server error occured");
  }
};

export const removeLike = async (req, res) => {
  try {
    const { myUserId, tweetId } = req.body;
    const myUser = await User.findById(myUserId);
    const tweet = await Tweet.findById(tweetId);
    if (!myUser || !tweet)
      return res.status(404).json("One of users wasn't found");
    if (!myUser.likedTweets.some((id) => id.toString() === tweetId))
      return res.status(304).json("Tweet wasn't liked");
    if (!tweet.likes.some((id) => id.toString() === myUserId))
      return res.status(304).json("Tweet wasn't liked");
    myUser.likedTweets = myUser.likedTweets.filter(
      (id) => id.toString() !== tweetId
    );
    myUser.save();
    tweet.likes = tweet.likes.filter((id) => id.toString() !== myUserId);
    tweet.save();
    return res.status(204);
  } catch (err) {
    res.status(409).json("Some server error occured");
  }
};

export const retweet = async (req, res) => {
  try {
    const { myUserId, tweetId } = req.body;
    const myUser = await User.findById(myUserId);
    const tweet = await Tweet.findById(tweetId);
    if (!myUser || !tweet)
      return res.status(404).json("One of users wasn't found");
    if (myUser.retweetedTweets.some((id) => id.toString() === tweetId))
      return res.status(304).json("Tweet has already been retweeted");
    if (tweet.retweets.some((id) => id.toString() === myUserId))
      return res.status(304).json("Tweet has already been retweeted");
    myUser.retweetedTweets.push(tweetId);
    myUser.save();
    tweet.retweets.push(myUserId);
    tweet.save();
    return res.status(204);
  } catch (err) {
    res.status(409).json("Some server error occured");
  }
};

export const removeRetweet = async (req, res) => {
  try {
    const { myUserId, tweetId } = req.body;
    const myUser = await User.findById(myUserId);
    const tweet = await Tweet.findById(tweetId);
    if (!myUser || !tweet)
      return res.status(404).json("One of users wasn't found");
    if (!myUser.retweetedTweets.some((id) => id.toString() === tweetId))
      return res.status(304).json("Tweet wasn't retweeted");
    if (!tweet.retweets.some((id) => id.toString() === myUserId))
      return res.status(304).json("Tweet wasn't retweeted");
    myUser.retweetedTweets = myUser.retweetedTweets.filter(
      (id) => id.toString() !== tweetId
    );
    myUser.tweets = myUser.tweets.filter((id) => id.toString() !== tweetId);
    myUser.save();
    tweet.retweets = tweet.retweets.filter((id) => id.toString() !== myUserId);
    tweet.save();
    return res.status(204);
  } catch (err) {
    res.status(409).json("Some server error occured");
  }
};

export const bookmark = async (req, res) => {
  try {
    const { myUserId, tweetId } = req.body;
    const myUser = await User.findById(myUserId);
    const tweet = await Tweet.findById(tweetId);
    console.log(myUser, tweet);
    if (!myUser || !tweet)
      return res.status(404).json("One of users wasn't found");
    if (myUser.bookmarkedTweets.some((id) => id.toString() === tweetId))
      return res.status(304).json("Tweet has already been bookmarked");
    if (tweet.bookmarks.some((id) => id.toString() === myUserId))
      return res.status(304).json("Tweet has already been bookmarked");
    myUser.bookmarkedTweets.push(tweetId);
    myUser.save();
    tweet.bookmarks.push(myUserId);
    tweet.save();
    return res.status(204);
  } catch (err) {
    res.status(409).json("Some server error occured");
  }
};

export const removeBookmark = async (req, res) => {
  try {
    const { myUserId, tweetId } = req.body;
    const myUser = await User.findById(myUserId);
    const tweet = await Tweet.findById(tweetId);
    if (!myUser || !tweet)
      return res.status(404).json("One of users wasn't found");
    if (!myUser.bookmarkedTweets.some((id) => id.toString() === tweetId))
      return res.status(304).json("Tweet wasn't bookmarked");
    if (!tweet.bookmarks.some((id) => id.toString() === myUserId))
      return res.status(304).json("Tweet wasn't bookmarked");
    myUser.bookmarkedTweets = myUser.bookmarkedTweets.filter(
      (id) => id.toString() !== tweetId
    );
    myUser.save();
    tweet.bookmarks = tweet.bookmarks.filter(
      (id) => id.toString() !== myUserId
    );
    tweet.save();
    return res.status(204);
  } catch (err) {
    res.status(409).json("Some server error occured");
  }
};

export const addTweetIsViewed = async (req, res) => {
  try {
    const { myUserId, tweetId } = req.body;
    const myUser = await User.findById(myUserId);
    const tweet = await Tweet.findById(tweetId);

    if (!myUser || !tweet)
      return res.status(404).json("One of users wasn't found");
    if (tweet.views.some((id) => id.toString() === myUserId))
      return res.status(304).json("Tweet has been already viewed");
    tweet.views.push(myUserId);
    tweet.save();
    return res.status(204);
  } catch (err) {
    res.status(409).json("Some server error occured");
  }
};

export const sendReply = async (req, res) => {
  try {
    const { tweetId, senderId, reply, recipientId } = req.body;
    const tweet = await Tweet.findById(tweetId);
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);
    console.log(recipient);
    if (!sender || !recipient) {
      return res.status(404).json(`User wasn't found`);
    }
    if (!tweet) {
      console.log('tweet');
      res.status(404).json("Tweet wasn't found");
    }
    if (!reply) {
      console.log('reply');
      res.status(404).json("No reply ");
    }
    const replyTweet = await Tweet.create({
      userId: senderId,
      images: [],
      description: reply,
      whoCanReply: "everyone",
      audience: "everyone",
      createdAt: new Date(),
    });

    tweet.replies.push(replyTweet._id);
    await tweet.save();
    sender.replies.push({ reply: replyTweet._id, toWhom: recipientId });
    sender.save();
    res.status(204);
  } catch {
    res.status(409).json("Some server inner error occured");
  }
};


export const getTweetReplies = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      res.status(404).json(`Tweet wasn't found`);
    }
    const repliesPromises = tweet.replies.map((reply) => Tweet.findById(reply));
    const replies = await Promise.all(repliesPromises);
    if (replies.length === 0) {
      return res.status(304).json(null);
    }
    const replyUsersPromise = replies.map((reply) =>
      User.findById(reply.userId)
    );
    const replyUsers = await Promise.all(replyUsersPromise);
    const data = replies.map((reply) => {
      const user = replyUsers.find(
        (user) => user._id.toString() === reply.userId.toString()
      );
      if (user) {
        return { reply, user };
      }
    });

    res.status(200).json(data);
  } catch {
    res.status(409).json("some server error occured");
  }
}

export const getAllUserReplies = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (user.tweets.length === 0) {
      return res.status(404).json(null);
    }
    const repliesPromises = user.replies.map(async (reply) => {
      const replyTweet = await Tweet.findById(reply.reply).exec();
      const toWhomUser = await User.findById(reply.toWhom).exec();
    
      return { replyTweet, toWhomUser };
    });
    const replies = await Promise.all(repliesPromises);
    if (!replies) {
      return res.status(304).json(null);
    }
    const data = replies.map((reply) => {
      const {replyTweet, toWhomUser} = reply;
      const userName = toWhomUser.userName;
      return {replyTweet, userName};
    })

    res.status(200).json(data); 

  } catch (err) {
    res.status(409).json("some server error occured");
  }
}