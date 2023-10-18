export interface Props {

  reply: {
    showReplyPopup: boolean,
    setShowReplyPopup: (show: boolean) => void,
  },
  like: {
    isLiked: boolean,
    setLiked: () => void,
  },
  retweet: {
    isRetweeted: boolean,
    setRetweeted: () => void,
  },
  bookmark: {
    isBookmarked: boolean,
    setBookmarked: () => void,
  }
}