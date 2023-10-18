import ThreeDots from "../../ThreeDots";
import Photos from "./Photos";
import MorePopup from "../../../Popups/Tweet/More";
import UserMorePopup from "../../../Popups/Tweet/UserMore";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import ReplyPopup from "../../../Popups/Tweet/Reply";
import { Link } from "react-router-dom";
import ProfilePopup from "../../../Popups/Profile";
import ButtonsGroup from "./ButtonsGroup";
import useResponsive from "../../../../hooks/useResponsive";
import MorePopupResponsive from "../../../Popups/Tweet/More/Responsive";
import { TweetType, UserType } from "../../../../interfaces/models";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import useLike from "../../../../hooks/useLike";
import useRetweet from "../../../../hooks/useRetweet";
import useBookmark from "../../../../hooks/useBookmark";
import UserMorePopupResponsive from "../../../Popups/Tweet/UserMore/Responsive";
export default function Tweet(props: {
  tweet: TweetType;
  user: UserType;
  toWhom?: string;
}) {
  const { tweet, user } = props;
  const { likes, isLiked, handleLikeTweet } = useLike(tweet);
  const { isRetweeted, retweets, handleRetweetTweet } = useRetweet(tweet);
  const { isBookmarked, bookmarks, handleBookmarkTweet } = useBookmark(tweet);
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const popupTimeoutRef = useRef<any>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const handleMouseEnter = () => {
    clearTimeout(popupTimeoutRef.current as number);
    setShowProfilePopup(true);
  };

  const handleMouseLeave = () => {
    popupTimeoutRef.current = setTimeout(() => {
      setShowProfilePopup(false);
    }, 400);
  };

  const anyPopupsShown = showPopupMore || showReplyPopup || showSharePopup;

  const width = useResponsive();

  const currentDate = new Date();
  const tweetDate = new Date(tweet.createdAt);
  const hoursGap =
    Math.abs(currentDate.getTime() - tweetDate.getTime()) / 1000 / 60 / 60;
  let time;

  if (hoursGap > 24) {
    const days = Math.floor(hoursGap / 24);
    time = `${days}d`;
  }

  if (hoursGap < 24 && hoursGap >= 1) {
    time = `${Math.floor(hoursGap)}h`;
  }
  if (hoursGap < 1) {
    const minutes = Math.floor(hoursGap * 60);
    time = `${minutes}m`;
  }

  const tweetImages =
    tweet.images.length === 0
      ? null
      : tweet.images.map((img) => {
          return `http://localhost:3000/${img}`;
        });

  return (
    <div style={{ pointerEvents: anyPopupsShown ? "none" : "auto" }}>
      <Link
        to={`/${user.userName}/status/${tweet._id}`}
        className=" border-b-[1px] border-b-zinc-700 block"
      >
        <li className="flex p-[1.5rem] sm:gap-0 gap-[1.2rem]">
          <div className="flex-[1]">
            <Link to={`/${user.userName}`} className="w-[4rem] h-[4rem] block ">
              <img
                src={`http://localhost:3000/${user.profileImg}`}
                alt="User's avatar"
                className="w-full h-full object-cover rounded-full"
              />
            </Link>
          </div>
          <div className="flex-[9] relative">
            <div className="flex items-start">
              <div className="flex sm:flex-row flex-col items-start sm:items-center flex-[6] relative  ">
                <Link
                  to={`/${user.userName}`}
                  className="text-2xl font-bold hover:underline "
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {user.fullName}
                </Link>
                {width > 576 && (
                  <ProfilePopup
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    showPopup={showProfilePopup}
                    setShowPopup={setShowProfilePopup}
                    left={-20}
                    top={5}
                    user={user}
                  />
                )}
                <div className="sm:ml-[0.5rem] flex items-start gap-[0.5rem] text-zinc-500">
                  <Link
                    to={`/${user.userName}`}
                    className="text-2xl  font-medium"
                  >
                    @{user.userName}
                  </Link>
                  <span className=" text-xl font-semibold">·</span>
                  <span className="text-2xl">{time}</span>
                </div>
              </div>

              <div className="flex-[4] flex justify-end absolute right-0 top-[-1rem]">
                <div
                  className="relative"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPopupMore(true);
                  }}
                >
                  <ThreeDots />
                  {width >= 576 && user._id !== myUser?._id && (
                    <MorePopup
                      showPopup={showPopupMore}
                      setShowPopup={setShowPopupMore}
                      user={user}
                    />
                  )}
                  {width >= 576 && user._id === myUser?._id && (
                    <UserMorePopup
                      showPopup={showPopupMore}
                      setShowPopup={setShowPopupMore}
                      user={user}
                      tweetId={tweet._id}
                    />
                  )}
                </div>
              </div>
            </div>
            {props.toWhom && (
              <div className="text-2xl text-zinc-400">
                Replying to{" "}
                <Link className="text-purple-500" to={`/${props.toWhom}`}>
                  @{props.toWhom}
                </Link>
              </div>
            )}
            <p className="text-2xl mt-[0.3rem]">{tweet.description}</p>
            {tweetImages && (
              <div className="mt-[1rem]">
                <Photos gap={1.3} images={tweetImages} />
              </div>
            )}
            <ButtonsGroup
              share={{ showSharePopup, setShowSharePopup }}
              reply={{ showReplyPopup, setShowReplyPopup }}
              like={{ liked: isLiked, setLiked: handleLikeTweet, likes }}
              retweet={{
                retweeted: isRetweeted,
                setRetweeted: handleRetweetTweet,
                retweets,
              }}
              bookmark={{
                bookmarked: isBookmarked,
                setBookmarked: handleBookmarkTweet,
                bookmarks,
              }}
              tweet={tweet}
            />
          </div>
        </li>
        {showReplyPopup &&
          createPortal(
            <ReplyPopup
              showPopup={showReplyPopup}
              setShowPopup={setShowReplyPopup}
              user={user}
              tweet={tweet}
            />,
            document.getElementById("overlay") as HTMLElement
          )}
        {width < 576 &&
          user._id !== myUser?._id &&
          createPortal(
            <MorePopupResponsive
              showPopup={showPopupMore}
              setShowPopup={setShowPopupMore}
              user={user}
            />,
            document.getElementById("overlay") as HTMLElement
          )}
        {width < 576 &&
          user._id === myUser?._id &&
          createPortal(
            <UserMorePopupResponsive
              showPopup={showPopupMore}
              setShowPopup={setShowPopupMore}
              user={user}
              tweetId={tweet._id}
            />,
            document.getElementById("overlay") as HTMLElement
          )}
      </Link>
    </div>
  );
}
