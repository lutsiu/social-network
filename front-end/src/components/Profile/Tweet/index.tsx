/* eslint-disable @typescript-eslint/no-floating-promises */

import Header from "./Header";
import { Link } from "react-router-dom";
import ProfilePopup from "../../Popups/Profile";
import MorePopup from "../../Popups/Tweet/More";
import UserMorePopup from "../../Popups/Tweet/UserMore";
import ThreeDots from "../../Widgets/ThreeDots";
import Photos from "../../Widgets/Tweets/Tweet/Photos";
import { useState, useRef, useEffect } from "react";
import DateBar from "./DateBar";
import InfoBar from "./InfoBar";
import MainButtonsGroup from "./MainButtonsGroup";
import Tweet from "../../Widgets/Tweets/Tweet";
import useResponsive from "../../../hooks/useResponsive";
import MorePopupResponsive from "../../Popups/Tweet/More/Responsive";
import { createPortal } from "react-dom";
import ReplyPopup from "../../Popups/Tweet/Reply";
import { useLoaderData } from "react-router-dom";
import { TweetType, UserType, ReplyType } from "../../../interfaces/models";
import { ReduxState } from "../../../interfaces/redux";
import { useSelector } from "react-redux";
import useLike from "../../../hooks/useLike";
import useRetweet from "../../../hooks/useRetweet";
import useBookmark from "../../../hooks/useBookmark";
import UserMorePopupResponsive from "../../Popups/Tweet/UserMore/Responsive";
export default function MainTweet() {
  const [showPopupMore, setShowPopupMore] = useState(false);
  const [showReplyPopup, setShowReplyPopup] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const popupTimeoutRef = useRef<any>(null)

  const myUser = useSelector((state: ReduxState) => state.auth.user);

  const { user, tweet, replies } = useLoaderData() as {
    tweet: TweetType;
    user: UserType;
    replies: undefined | ReplyType[];
  };

  const { likes, isLiked, handleLikeTweet } = useLike(tweet);
  const { isRetweeted, retweets, handleRetweetTweet } = useRetweet(tweet);
  const { isBookmarked, bookmarks, handleBookmarkTweet } = useBookmark(tweet);

  const handleMouseEnter = () => {
    clearTimeout(popupTimeoutRef.current as number);
    setShowProfilePopup(true);
  };

  const handleMouseLeave = () => {
    popupTimeoutRef.current = setTimeout(() => {
      setShowProfilePopup(false);
    }, 300);
  };
  const width = useResponsive();

  const tweetImages =
    tweet.images.length === 0
      ? null
      : tweet.images.map((img) => {
          return `http://localhost:3000/${img}`;
        });

  useEffect(() => {
    function handleSetIsViewed() {
      const body = JSON.stringify({
        myUserId: myUser!._id,
        tweetId: tweet._id,
      });
      fetch(`http://localhost:3000/tweet/add-tweet-is-viewed`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body,
      });
    }
    handleSetIsViewed();
  }, []);

  return (
    <div className="min-h-[100vh] w-full border-x-[1px] border-zinc-700 max-w-full">
      {width >= 1400 && <Header />}
      <main className="relative">
        <div className=" sm:p-[1.5rem] p-[1rem] relative">
          <div className="flex sm:gap-[0] gap-[1rem]">
            <div className="flex-[1]">
              <Link
                to={`/${user.userName}`}
                className="w-[4rem] h-[4rem] block "
              >
                <img
                  src={`http://localhost:3000/${user.profileImg}`}
                  alt="User's avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </Link>
            </div>
            <div className="flex-[9] relative">
              <div className="flex items-start">
                <div className="flex flex-col items-start flex-[6] relative">
                  <Link
                    to={`/${user.userName}`}
                    className="text-2xl font-bold hover:underline"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {user.fullName}
                  </Link>
                  {width >= 576 && (
                    <ProfilePopup
                      handleMouseEnter={handleMouseEnter}
                      handleMouseLeave={handleMouseLeave}
                      showPopup={showProfilePopup}
                      setShowPopup={setShowProfilePopup}
                      left={-20}
                      top={3}
                      user={user}
                    />
                  )}
                  <div className="flex items-start gap-[0.5rem] text-zinc-500">
                    <Link to="/username" className="text-2xl  font-medium">
                      @{user.userName}
                    </Link>
                  </div>
                </div>
                <div className="flex-[4] flex justify-end absolute right-0 top-[0.5rem]">
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
            </div>
          </div>
          <div className="mt-[2rem]">
            <p className="text-2xl leading-[2.4rem]">{tweet.description}</p>
            <div className="mt-[1.5rem]">
              {tweetImages && <Photos gap={0.2} images={tweetImages} />}
            </div>
            <DateBar views={tweet.views.length} createdAt={tweet.createdAt} />
            <InfoBar retweets={retweets} likes={likes} bookmarks={bookmarks} />
            <MainButtonsGroup
              reply={{ showReplyPopup, setShowReplyPopup }}
              like={{ isLiked, setLiked: handleLikeTweet }}
              retweet={{ isRetweeted, setRetweeted: handleRetweetTweet }}
              bookmark={{ isBookmarked, setBookmarked: handleBookmarkTweet }}
            />
          </div>
        </div>
        {/* Reply and comments section */}
        <div>
          <ul>
            {replies &&
              replies.map((reply, i) => {
                return <Tweet key={i} tweet={reply.reply} user={reply.user} />;
              })}
          </ul>
        </div>
      </main>
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
    </div>
  );
}
