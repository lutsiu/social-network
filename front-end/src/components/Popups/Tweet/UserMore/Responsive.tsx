/* eslint-disable @typescript-eslint/no-floating-promises */
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";
import { TbPlaylistAdd } from "react-icons/tb";
import { IoVolumeMuteOutline, IoFlagOutline } from "react-icons/io5";
import { BiBlock, BiCodeAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserType } from "../../../../interfaces/models";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateTweets } from "../../../../state/auth";
import {ImBin} from 'react-icons/im'
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  user: UserType;
  tweetId: string;
}

export default function UserMorePopupResponsive(props: Props) {
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
      className="shadow popup-tweet-more fixed  bg-black w-full bottom-0 rounded-3xl"
    >
      <li
        className="popup-tweet-more-li-follow flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] text-red-500"
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
        <span>Add/remove @TENCHARACTER from List</span>
      </li>
      <li
        className="flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] text-zinc-500"
        title="Didn't implemented"
      >
        <IoVolumeMuteOutline className="text-3xl" />
        <span>Mute @TENCHARACTERS</span>
      </li>
      <li
        className="flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] text-zinc-500"
        title="Didn't implemented"
      >
        <BiBlock className="text-3xl" />
        <span>Block @TENCHARACTERS</span>
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
