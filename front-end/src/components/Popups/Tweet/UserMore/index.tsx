/* eslint-disable @typescript-eslint/no-floating-promises */
import { ImBin } from "react-icons/im";
import { TbPlaylistAdd } from "react-icons/tb";
import { IoVolumeMuteOutline, IoFlagOutline } from "react-icons/io5";
import { BiBlock, BiCodeAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserType } from "../../../../interfaces/models";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTweets } from "../../../../state/auth";
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  user: UserType;
  tweetId: string;
}

export default function More(props: Props) {
  const { user, tweetId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const handleDeleteTweet = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const body = JSON.stringify({ tweetId, myUserId: user._id });
    dispatch(updateTweets({ tweetId }));
    fetch(`http://localhost:3000/tweet/delete-tweet`, {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
      body,
    });
    props.setShowPopup(false);
    if (location.pathname !== '/home') {
      navigate(`/home`);
    }
  };

  useEffect(() => {
    const handleClosePopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(".popup-tweet-more") &&
        !target.closest(".popup-tweet-more-li-follow")
      ) {
        return;
      } else {
        props.setShowPopup(false);
      }
    };

    document.addEventListener("click", handleClosePopup);

    return () => {
      document.removeEventListener("click", handleClosePopup);
    };
  }, [props]);

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: props.showPopup ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{ pointerEvents: props.showPopup ? "auto" : "none" }}
      className="shadow popup-tweet-more absolute top-[1rem] right-0 bg-black w-[32rem] rounded-3xl z-20"
    >
      <li
        className="popup-tweet-more-li-follow flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] cursor-pointer text-red-500"
        onClick={handleDeleteTweet}
      >
        <ImBin className="text-3xl" />
        <span>Delete tweet</span>
      </li>
      <li
        className="flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] text-zinc-500"
        title="Didn't implemented"
      >
        <TbPlaylistAdd className="text-3xl" />
        <span>Add/remove @{user.userName} from List</span>
      </li>
      <li
        className="flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] text-zinc-500"
        title="Didn't implemented"
      >
        <IoVolumeMuteOutline className="text-3xl" />
        <span>Mute @{user.userName}</span>
      </li>
      <li
        className="flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] text-zinc-500"
        title="Didn't implemented"
      >
        <BiBlock className="text-3xl" />
        <span>Block @{user.userName}</span>
      </li>
      <li
        className="flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] text-zinc-500"
        title="Didn't implemented"
      >
        <BiCodeAlt className="text-3xl" />
        <span>Embed Tweet</span>
      </li>
      <li
        className="flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] text-zinc-500"
        title="Didn't implemented"
      >
        <IoFlagOutline className="text-3xl" />
        <span>Report Tweet</span>
      </li>
    </motion.ul>
  );
}
