/* eslint-disable @typescript-eslint/no-misused-promises */
import Header from "../Header";
import { IoCalendarOutline } from "react-icons/io5";
import { Outlet, useLocation, useLoaderData } from "react-router-dom";
import RightMenu from "../../RightMenu";
import ButtonsGroup from "../ButtonsGroup";
import { useState } from "react";
import { createPortal } from "react-dom";
import EditProfilePopup from "../../../Popups/EditProfile";
import FollowingGroup from "../../../Widgets/FollowingGroup";
import useResponsive from "../../../../hooks/useResponsive";
import CreateTweetPopup from "../../../Popups/CreateTweet";
import CreateTweetButton from "../../../Buttons/CreateTweet";
import BottomMenu from "../../../ResponsiveDesign/BottomMenu";
import CreateTweetResponsive from "../../../Widgets/CreateTweet/Responsive";
import { UserType } from "../../../../interfaces/models";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import useFollow from "../../../../hooks/useFollow";
import months from "../../../../utils/months";
export default function ResponsiveWrapper() {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showCreateTweet, setShowCreateTweet] = useState(false);
  // data about user who is logged in from redux
  const { user } = useSelector((state: ReduxState) => state.auth);
  // data about user from backend about user whose page it is
  const { userData, isUserAccount } = useLoaderData() as {
    userData: UserType;
    isUserAccount: boolean;
  };
  const {followers, following, isFollowing, handleFollowAccount} = useFollow(userData);


  const location = useLocation();
  
  const width = useResponsive();

  const joinedDate = new Date(userData.joiningDate)
    .toLocaleDateString("pl")
    .split(".");
  const month = months[+joinedDate[0] + 1];
  const year = joinedDate[2];
  return (
    <>
      {!showCreateTweet && (
        <Header fullName={userData.fullName} tweets={userData.tweets} />
      )}
      <div className="h-full flex relative lg:justify-between justify-center pt-[5rem]">
        <div className="lg:w-[60%] lg:pr-[2rem] lg:pl-[6rem] md:w-[90%] w-full">
          <div className="w-full  border-x-[1px] border-zinc-700 ">
            <div>
              <div className="mt-[0.5rem] border-b-[1px] border-b-zinc-700">
                <div className="h-[22rem] bg-zinc-800"></div>
                <div className="relative">
                  <div className="absolute w-[15rem] h-[15rem] top-[-8rem] left-[1.5rem] bg-black rounded-full p-[0.4rem]">
                    <img
                      src={`http://localhost:3000/${userData.profileImg}`}
                      alt="User's avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="flex justify-end pr-[1.5rem] pt-[1.5rem]">
                    {isUserAccount && (
                      <button
                        className="bg-black border-[1px] border-zinc-600 rounded-[4rem] py-[1rem] px-[2rem] text-2xl font-semibold duration-200 hover:bg-zinc-900"
                        onClick={() => setShowEditPopup(true)}
                      >
                        Edit profile
                      </button>
                    )}
                    {!isUserAccount && (
                      <button
                        className="bg-white text-black border-[1px] border-zinc-600 rounded-[4rem] py-[1rem] px-[2rem] text-2xl font-bold duration-200 hover:bg-zinc-200"
                        onClick={handleFollowAccount}
                      >
                        {following ? "Following" : "Follow"}
                      </button>
                    )}
                  </div>
                  <div className="mt-[3rem] pl-[1.6rem]">
                    <h1 className="text-3xl font-bold">{userData.fullName}</h1>
                    <h2 className="text-2xl text-zinc-500">
                      {userData.userName}
                    </h2>
                    <p className="text-2xl mt-[1rem]">{userData.bio}</p>
                    <div className="text-2xl text-zinc-500 mt-[1.5rem] ml-[0.2rem] flex items-center gap-[0.6rem]">
                      <IoCalendarOutline className="text-zinc-400" />
                      <span>Joined Month Year</span>
                    </div>
                    <div className="mt-[1.5rem]">
                      <FollowingGroup followers={followers} following={following} />
                    </div>
                  </div>
                  <ButtonsGroup />
                </div>
              </div>
              <Outlet context={useLoaderData()} />
            </div>
          </div>
          {showEditPopup &&
            createPortal(
              <EditProfilePopup
                showPopup={showEditPopup}
                setShowPopup={setShowEditPopup}
   
              />,
              document.getElementById("overlay") as HTMLElement
            )}
        </div>

        {width >= 992 && <RightMenu trends={true} whoToFollow={true} />}
      </div>
      <CreateTweetButton setShowPopup={setShowCreateTweet} />
      {showCreateTweet &&
        width >= 576 &&
        createPortal(
          <CreateTweetPopup setShowPopup={setShowCreateTweet} />,
          document.getElementById("overlay") as HTMLElement
        )}
      {showCreateTweet &&
        width < 576 &&
        createPortal(
          <CreateTweetResponsive setShowPopup={setShowCreateTweet} />,
          document.getElementById("overlay") as HTMLElement
        )}

      {!showCreateTweet &&
        createPortal(
          <BottomMenu />,
          document.getElementById("overlay") as HTMLElement
        )}
    </>
  );
}
