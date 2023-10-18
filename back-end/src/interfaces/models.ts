export interface UserType {
  _id: string;
  fullName: string;
  userName: string;
  bio: string;
  email: string;
  password: string;
  profileImg: string;
  followers: { _id: string }[];
  following: string[];
  confirmationCode?: number;
  verifiedUser: boolean;
  joiningDate: string;
  tweets: string[];
  likedTweets: string[];
  retweetedTweets: string[];
  replies: string[];
  bookmarkedTweets: string[];
  circleOfPeople: string[];
}

enum audienceOption {
  EVERYONE = "everyone",
  CIRCLE = "circle",
}
enum whoCanReply {
  EVERYONE = "everyone",
  FOLLOWING = "following",
}

export interface TweetType {
  _id: string;
  userId: string;
  description: string;
  images: string[];
  likes: string[];
  retweets: string[];
  bookmares: string[];
  views: number;
  replies: string[];
  createdAt: Date;
  audience: audienceOption;
  whoCanReply: whoCanReply;
}
