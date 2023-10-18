/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link, useLocation } from "react-router-dom";
import FollowButton from "../../Buttons/FollowButton";
import { useState, useRef, useEffect } from "react";
import Popup from "../../Popups/Profile";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import { UserType } from "../../../interfaces/models";
import useFollow from "../../../hooks/useFollow";
import CreateTweetPopup from "../../Popups/CreateTweet";
interface Props {
  user: UserType;
}

export default function Profile(props: Props) {
  const { user } = props;
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  const {
    followers: initialFollowers,
    following: initialFollowing,
    handleFollowAccount,
  } = useFollow(user);
  const location = useLocation();
  const [isFollowing, setIsFollowing] = useState(
    myUser!.following.some((id) => id === user._id)
  );
  const [followers, setFollowers] = useState(initialFollowers);
  const [following, setFollowing] = useState(initialFollowing);

  const popupTimeoutRef = useRef<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const handleMouseEnter = () => {
    clearTimeout(popupTimeoutRef.current as number);
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    popupTimeoutRef.current = setTimeout(() => {
      setShowPopup(false);
    }, 300);
  };
  useEffect(() => {
    async function getUpdatedInfo() {
      try {
        const res = await fetch(
          `http://localhost:3000/profile/${myUser!.userName}`
        );
        const myUserData = (await res.json()) as UserType;
        setIsFollowing(myUserData.following.some((id) => id === user._id));
      } catch {
        console.log("error");
      }
    }
    void getUpdatedInfo();
  }, [myUser, user]);
  return (
    <li className="relative">
      <Link
        to="/user-id"
        onClick={(e) => {
          /* const target = e.target as HTMLElement;
        if (target.classList.contains('follow-button')) { */
          e.preventDefault();
          /*  } */
        }}
      >
        <div className="w-full bg-zinc-900 px-[0.7rem] py-[0.8rem] flex items-center h-[6rem]  duration-300 cursor-pointer hover:bg-zinc-800 pl-[1.7rem] relative">
          <div className="h-[4rem] w-[4rem]">
            <img
              src={`http://localhost:3000/${user.profileImg}`}
              alt="user avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div className="h-[4rem] ml-[0.8rem]">
            <Link
              to="/user-id"
              className="text-2xl font-semibold hover:underline"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {user.fullName}
            </Link>
            <p className="mt-[0.3rem] text-xl text-gray-400">{user.userName}</p>
          </div>
          <div className="absolute right-[1.5rem]">
            <FollowButton
              userData={user}
              handleFollowAccount={handleFollowAccount}
              isFollowing={isFollowing}
            />
          </div>
        </div>
      </Link>
      <Popup
        setShowPopup={setShowPopup}
        showPopup={showPopup}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        left={1}
        top={location.pathname !== '/explore'? -20.5 : 5}
        user={user}
      />
    </li>
  );
}
