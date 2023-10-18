/* eslint-disable @typescript-eslint/no-floating-promises */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import FollowButton from "../../Buttons/FollowButton";
import { Link } from "react-router-dom";
import { UserType } from "../../../interfaces/models";
import { ReduxState } from "../../../interfaces/redux";
import { useSelector } from "react-redux";
import useFollow from "../../../hooks/useFollow";
interface Props {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  left: number;
  top: number;
  user: UserType;
}

export default function Popup(props: Props) {
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  const { user } = props;

  const {
    followers: initialFollowers,
    following: initialFollowing,
    handleFollowAccount,
  } = useFollow(user);

  const [isFollowing, setIsFollowing] = useState(
    myUser!.following.some((id) => id === user._id)
  );
  const [followers, setFollowers] = useState(initialFollowers);
  const [following, setFollowing] = useState(initialFollowing);
  useEffect(() => {
    async function getUpdatedInfo() {
      try {
        const res = await fetch(
          `http://localhost:3000/profile/${myUser!.userName}`
        );
        const myUserData = (await res.json()) as UserType;
        setIsFollowing(myUserData.following.some((id) => id === user._id));
        const anotherRes = await fetch(
          `http://localhost:3000/profile/${user.userName}`
        );
        const userData = (await anotherRes.json()) as UserType;
        setFollowers(userData.followers.length);
        setFollowing(userData.following.length);
      } catch {
        console.log("error");
      }
    }
    getUpdatedInfo();
  }, [myUser, user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: props.showPopup ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{
        pointerEvents: props.showPopup ? "auto" : "none",
        left: `${props.left}rem`,
        top: `${props.top}rem`,
      }}
      onMouseEnter={props.handleMouseEnter}
      onMouseLeave={props.handleMouseLeave}
      className="shadow profile-popup absolute h-fit w-[30rem] bg-black rounded-3xl z-20 p-[1.4rem]"
      onClick={(e) => e.preventDefault()}
    >
      <div className="flex justify-between items-start">
        <Link to={`/${user.userName}`} className="h-[6rem] w-[6rem] block">
          <img
            src={`http://localhost:3000/${user.profileImg}`}
            alt="user image"
            className="w-full h-full rounded-full object-cover"
          />
        </Link>
        {myUser?._id !== user._id && (
          <FollowButton
            userData={user}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            handleFollowAccount={handleFollowAccount}
            isFollowing={isFollowing}
          />
        )}
      </div>
      <div className="mt-[0.7rem]">
        <Link to={`/${user.userName}`} className="text-2xl font-semibold block">
          {user.fullName}
        </Link>
        <Link
          to={`/${user.userName}`}
          className="text-xl font-thin text-gray-400 block"
        >
          @{user.userName}
        </Link>
      </div>
      <div className="mt-[1.4rem] text-xl font-medium">{user.bio}</div>
      <div className="mt-[1.4rem] flex gap-[2rem]">
        <div>
          <span className="text-xl font-bold text-white">{following}</span>
          <span className="text-xl font-extralight text-gray-400 ml-[0.5rem]">
            Following
          </span>
        </div>
        <div>
          <span className="text-xl font-bold text-white">{followers}</span>
          <span className="text-xl font-extralight text-gray-400 ml-[0.5rem]">
            Followers
          </span>
        </div>
      </div>
    </motion.div>
  );
}
