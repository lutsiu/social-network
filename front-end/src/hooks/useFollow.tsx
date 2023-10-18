/* eslint-disable @typescript-eslint/no-floating-promises */
import { useState, } from "react";
import { UserType } from "../interfaces/models";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../interfaces/redux";
import { follow, unfollow } from "../state/auth";
export default function useFollow(userData: UserType) {
  const { user } = useSelector((state: ReduxState) => state.auth);

  const dispatch = useDispatch();

  const [isFollowing, setIsFollowing] = useState(
    user!.following.some((id) => id === userData._id)
  );
  
  const [following, setFollowing] = useState(userData.following.length);
  const [followers, setFollowers] = useState(userData.followers.length);
  
  const handleFollowAccount = async () => {
    const body = JSON.stringify({
      userId: user!._id,
      followingUserId: userData._id,
    });
    if (!isFollowing) {
      setIsFollowing((prev) => !prev);
      dispatch(follow({ followingProfileId: userData._id }));
      setFollowers((prev) => prev + 1);
      await fetch(`http://localhost:3000/follows/add-following`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body,
      });
    }
    if (isFollowing) {
      setIsFollowing((prev) => !prev);
      setFollowers((prev) => prev - 1);
      dispatch(unfollow({ followingProfileId: userData._id }));
      await fetch(`http://localhost:3000/follows/delete-following`, {
        headers: { "Content-Type": "application/json" },
        method: "PATCH",
        body,
      });
    }
  };

  return {isFollowing, followers, following, handleFollowAccount}
}
