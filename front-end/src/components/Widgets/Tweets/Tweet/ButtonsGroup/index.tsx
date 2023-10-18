import styles from '../styles.module.scss';
import { FaRegComment, FaRetweet } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import { AiOutlineBarChart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { BsFillSuitHeartFill } from "react-icons/bs";
import SharePopup from "../../../../Popups/Tweet/Share";
import { Props } from './interface';
import useResponsive from '../../../../../hooks/useResponsive';
import {createPortal} from 'react-dom';
import SharePopupResponsive from '../../../../Popups/Tweet/Share/Responsive';
export default function ButtonsGroup(props: Props) {
  const {share, reply, like, retweet, bookmark, tweet} = props;
  const width = useResponsive();
  return (
    <div className="flex justify-between py-[1rem]  text-zinc-400 text-xl flex-wrap">
      <div
        className={`${styles.option} flex items-center pr-[0.1rem] duration-300 hover:text-purple-500 cursor-pointer relative`}
        onClick={(e) => {
          e.preventDefault();
          reply.setShowReplyPopup(true);
        }}
      >
        <div className="p-[0.7rem] rounded-full duration-300">
          <FaRegComment className="text-3xl" />
        </div>
        <span>{tweet.replies.length}</span>
      </div>
      <div
        className={`${styles.option} ${
          retweet.retweeted ? "text-green-500" : "text-zinc-400"
        } flex items-center pr-[0.1rem] duration-300 hover:text-green-500 cursor-pointer`}
        onClick={(e) => {
          e.preventDefault();
          retweet.setRetweeted();
        }}
      >
        <div className="p-[0.7rem] rounded-full duration-300">
          <FaRetweet className="text-3xl" />
        </div>
        <span>{retweet.retweets}</span>
      </div>
      <div
        className={`${styles.option} ${
          like.liked ? "text-pink-600" : "text-zinc-400"
        } flex items-center pr-[0.1rem] duration-300 hover:text-pink-500 cursor-pointer`}
        onClick={(e) => {
          e.preventDefault();
          like.setLiked();
        }}
      >
        <div className="p-[0.7rem] rounded-full duration-300">
          {like.liked ? (
            <BsFillSuitHeartFill className="text-3xl" />
          ) : (
            <BiHeart className="text-3xl" />
          )}
        </div>
        <span>{like.likes}</span>
      </div>
      <div
        className={`${styles.option} flex items-center pr-[0.1rem] duration-300 hover:text-purple-500 cursor-pointer`}
        onClick={(e) => e.preventDefault()}
      >
        <div className="p-[0.7rem] rounded-full duration-300">
          <AiOutlineBarChart className="text-3xl" />
        </div>
        <span>{tweet.views.length}</span>
      </div>
      <div
        className={`${styles.option} pr-[0.1rem] duration-300 hover:text-purple-500 cursor-pointer relative`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          share.setShowSharePopup(true);
        }}
      >
        <div className="p-[0.7rem] rounded-full duration-300">
          <FiShare className="text-3xl" />
        </div>
        {width > 576 && <SharePopup
          showPopup={share.showSharePopup}
          setShowPopup={share.setShowSharePopup}
          bookmarked={bookmark.bookmarked}
          setBookmarked={bookmark.setBookmarked}
        />}
      </div>
      {width < 576 && createPortal(<SharePopupResponsive
          showPopup={share.showSharePopup}
          setShowPopup={share.setShowSharePopup}
          bookmarked={bookmark.bookmarked}
          setBookmarked={bookmark.setBookmarked}
        />, document.getElementById('overlay') as HTMLElement)}
    </div>
  );
}
