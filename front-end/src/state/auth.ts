import { createSlice } from "@reduxjs/toolkit";
import {
  InitialStateAuth,
  ActionWithUser,
  ActionWithChanges,
  ActionWithFollowing,
  ActionWithTweetId,
} from "../interfaces/redux";
import { UserType } from "../interfaces/models";

const initialState: InitialStateAuth = {
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: ActionWithUser) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUserData: (state, action: { payload: UserType }) => {
      state.user = action.payload;
    },
    setChangeProfile: (state, action: ActionWithChanges) => {
      const { payload } = action;
      if (state.user) {
        state.user.fullName = payload.fullName;
        if (payload.bio) {
          state.user.bio = payload.bio;
        }
        if (payload.profileImg) {
          state.user.profileImg = payload.profileImg;
        }
      }
    },
    follow: (state, action: ActionWithFollowing) => {
      if (!state.user) return;
      const { followingProfileId } = action.payload;
      const index = state.user.following.findIndex(
        (id) => id === followingProfileId
      );
      if (index === -1) {
        state.user.following.push(followingProfileId as never);
      }
    },
    unfollow: (state, action: ActionWithFollowing) => {
      if (!state.user) return;
      const { followingProfileId } = action.payload;
      const index = state.user.following.findIndex(
        (id) => id === followingProfileId
      );
      if (index !== -1) {
        state.user.following = state.user.following.filter(
          (id) => id !== followingProfileId
        );
      }
    },
    likeTweet: (state, action: ActionWithTweetId) => {
      if (!state.user) return;
      const { tweetId } = action.payload;
      const isLiked = state.user.likedTweets.some((id) => id === tweetId);
      if (!isLiked) {
        state.user.likedTweets.push(tweetId);
      } else {
        state.user.likedTweets = state.user.likedTweets.filter(
          (id) => id !== tweetId
        );
      }
    },
    retweetTweet: (state, action: ActionWithTweetId) => {
      if (!state.user) return;
      const { tweetId } = action.payload;
      const isRetweeted = state.user.retweetedTweets.some(
        (id) => id === tweetId
      );
      if (!isRetweeted) {
        state.user.retweetedTweets.push(tweetId);
      } else {
        state.user.retweetedTweets = state.user.retweetedTweets.filter(
          (id) => id !== tweetId
        );
      }
    },
    bookmarkTweet: (state, action: ActionWithTweetId) => {
      if (!state.user) return;
      const { tweetId } = action.payload;
      const isBookmarked = state.user.bookmarkedTweets.some(
        (id) => id === tweetId
      );
      if (!isBookmarked) {
        state.user.bookmarkedTweets.push(tweetId);
      } else {
        state.user.bookmarkedTweets = state.user.bookmarkedTweets.filter(
          (id) => id !== tweetId
        );
      }
    },
    updateTweets: (state, action: ActionWithTweetId) => {
      const { tweetId } = action.payload;
      const tweetWasPosted = state.user?.tweets.some(
        (tweet) => tweet === tweetId
      );
      if (tweetWasPosted && state.user?.tweets) {
        state.user.tweets = state.user.tweets.filter(
          (tweet) => tweet !== tweetId
        );
      }
      if (!tweetWasPosted) {
        state.user?.tweets.push(tweetId);
      }
    },
  },
});

export const {
  setLogin,
  setLogout,
  setChangeProfile,
  updateTweets,
  updateUserData,
  follow,
  unfollow,
  likeTweet,
  retweetTweet,
  bookmarkTweet,
} = authSlice.actions;
export default authSlice.reducer;
