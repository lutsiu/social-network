/* eslint-disable @typescript-eslint/no-floating-promises */
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";
import { TbPlaylistAdd } from "react-icons/tb";
import { IoVolumeMuteOutline, IoFlagOutline } from "react-icons/io5";
import { BiBlock, BiCodeAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserType } from "../../../../interfaces/models";
import { ReduxState } from "../../../../interfaces/redux";
import useFollow from "../../../../hooks/useFollow";
import { useSelector } from "react-redux";
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  user: UserType
}

export default function MorePopupResponsive(props: Props) {
  const myUser = useSelector((state:ReduxState) => state.auth.user);

  const {user} = props;

  const {handleFollowAccount} = useFollow(user);

  const [isFollowing, setIsFollowing] = useState(myUser!.following.some(id => id=== user._id));

  useEffect(() => {
    
    async function getUpdatedInfo() {
      try {
        const res = await fetch(
          `http://localhost:3000/profile/${myUser!.userName}`
        );
        const myUserData = await res.json() as UserType;
        setIsFollowing(myUserData.following.some(id => id === user._id))
   
      } catch {
        console.log('error');
      }
    }
    getUpdatedInfo();
  }, [myUser, user]);

  const handleFollow = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFollowAccount()
    props.setShowPopup(false);
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
        className="popup-tweet-more-li-follow flex font-bold text-xl gap-[1rem] items-center p-[1.2rem] cursor-pointer"
        onClick={handleFollow}
      >
        {isFollowing && (
          <>
            <RiUserUnfollowLine className="text-3xl" />
            <span>Unfollow {user.userName}</span>
          </>
        )}
        {!isFollowing && (
          <>
            <RiUserFollowLine className="text-3xl" />
            <span>Follow @{user.userName}</span>
          </>
        )}
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
