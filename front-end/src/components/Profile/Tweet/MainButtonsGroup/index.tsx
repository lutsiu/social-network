import { FaRegComment, FaRetweet } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { FiShare } from "react-icons/fi";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { GoBookmarkFill, GoBookmark } from "react-icons/go";
import { Props } from "./interface";
import SharePopupResponsive from "../../../Popups/Tweet/Share/Responsive";
import SharePopup from "../../../Popups/Tweet/Share";
import styles from "./style.module.scss";
import useResponsive from "../../../../hooks/useResponsive";
import {createPortal} from 'react-dom'
export default function MainButtonsGroup(props: Props) {
  const { reply, like, retweet, bookmark } = props;

  const width = useResponsive();
  return (
    <div className="flex justify-between sm:px-[4rem] mt-[1rem] pb-[1rem]  border-b-[1px] border-b-zinc-700 flex-wrap">
      <div
        className={`${styles.option} p-[0.7rem] rounded-full duration-300 flex items-center hover:text-purple-500 cursor-pointer`}
        onClick={(e) => {
          reply.setShowReplyPopup(true);
        }}
      >
        <FaRegComment className="text-4xl text-zinc-400" />
      </div>
      <div
        className={`${styles.option} ${
          retweet.isRetweeted ? "text-green-500" : "text-zinc-400"
        } p-[0.7rem] rounded-full duration-300 flex items-center hover:text-green-500 cursor-pointer`}
        onClick={(e) => {
          retweet.setRetweeted();
        }}
      >
        <FaRetweet className="text-4xl" />
      </div>
      <div
        className={`${styles.option} ${
          like.isLiked ? "text-pink-600" : "text-zinc-400"
        } p-[0.7rem] rounded-full duration-300 flex items-center hover:text-pink-600 cursor-pointer`}
        onClick={(e) => {
          like.setLiked();
        }}
      >
        {like.isLiked ? (
          <BsFillSuitHeartFill className="text-4xl" />
        ) : (
          <BiHeart className="text-4xl" />
        )}
      </div>
      <div
        className={`${styles.option} ${
          bookmark.isBookmarked ? "text-purple-500" : "text-zinc-400"
        } p-[0.7rem] rounded-full duration-300 flex items-center hover:text-purple-500 cursor-pointer`}
        onClick={(e) => {
          bookmark.setBookmarked();
        }}
      >
        {bookmark.isBookmarked ? (
          <GoBookmarkFill className="text-4xl" />
        ) : (
          <GoBookmark className="text-4xl" />
        )}
      </div>
     
    </div>
  );
}
