import { TweetType } from "../../../../../interfaces/models";

export interface Props {
  share: {
    showSharePopup: boolean,
    setShowSharePopup: (show: boolean) => void,
  },
  reply: {
    showReplyPopup: boolean,
    setShowReplyPopup: (show: boolean) => void,
  },
  like: {
    likes: number,
    liked: boolean,
    setLiked: () => void,
  },
  retweet: {
    retweets: number,
    retweeted: boolean,
    setRetweeted: () => void,
  },
  bookmark: {
    bookmarks: number,
    bookmarked: boolean,
    setBookmarked: () => void,
  },
  tweet: TweetType
}