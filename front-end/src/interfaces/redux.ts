import { UserType, TweetType,  } from "./models";

export interface ReduxState {
  auth: InitialStateAuth;
  ui: InitialStateUI;
}

// AUTH INTERFACES

export interface InitialStateAuth {
  user: null | UserType;
  token: null | string;
  posts: [] | TweetType[];
}

export interface ActionWithChanges {
  payload: {
    fullName: string;
    bio?: string;
    profileImg?: string;
  };
}

export interface ActionWithUser {
  payload: {
    user: UserType;
    token: string;
  };
  type: string;
}

export interface ActionWithFollowing {
  payload: {
    followingProfileId: string;
  };
  type: string;
}
export interface ActionWithTweetId {
  payload: {
    tweetId: string
  },
  type: string
}


// UI interfaces

export interface InitialStateUI {
  audience: "everyone" | "circle";
  whoCanReply: "everyone" | "following" | "mentioned";
  tweet: string | undefined;
  showSidebarMenu: boolean;
}
export interface ActionWithAudience {
  payload: "everyone" | "circle";
  type: string;
}
export interface ActionWithWhoCanReply {
  payload: "everyone" | "following" | "mentioned";
  type: string;
}
