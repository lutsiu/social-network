import { useState, useRef, useEffect } from "react";
import {
  BiSolidHomeHeart,
  BiMessageRoundedDots,
  BiSolidUser,
  BiBell,
} from "react-icons/bi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CiCircleMore } from "react-icons/ci";
import { LuVerified } from "react-icons/lu";
import { BsCardChecklist } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import { createPortal } from "react-dom";
import CreateTweetPopup from "../../Popups/CreateTweet";
import { setLogout } from "../../../state/auth";
export default function LeftMenu() {
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [showCreateTweet, setShowCreateTweet] = useState(false);
  const navigate = useNavigate();
  const showPopup = () => {
    setShowLogoutPopup((prevValue) => !prevValue);
  };
  const { user } = useSelector((state: ReduxState) => state.auth);
  const dispatch = useDispatch();
  const popupRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    const handleClickOutsidePopup = (e: MouseEvent) => {
      if (
        popupRef.current === e.target ||
        popupRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setShowLogoutPopup(false);
    };

    document.addEventListener("mousedown", handleClickOutsidePopup);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsidePopup);
    };
  }, []);

  const handleLogout = () => {
    dispatch(setLogout())
    localStorage.removeItem("persist:root");
    navigate("/");
  };

  return (
    <>
      <header className="py-[2rem] bg-gray-950 relative w-[25%] h-[100vh]">
        <div className="w-[60%] h-full absolute right-0">
          <div className="mx-auto w-full relative h-full">
            <Link to="/home" className="text-3xl font-bold">
              Lutsiu.App
            </Link>
            <ul className="mt-[2.5rem] flex flex-col gap-[1.3rem]">
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem] cursor-pointer">
                <Link
                  to="/home"
                  className="flex items-center gap-[1.5rem] w-full h-full"
                >
                  <BiSolidHomeHeart className="text-5xl" />
                  <span className="text-3xl font-semibold">Home</span>
                </Link>
              </li>
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem] cursor-pointer">
                <Link
                  to="/explore"
                  className="flex items-center gap-[1.5rem] w-full h-full"
                >
                  <HiOutlineMagnifyingGlass className="text-5xl" />
                  <span className="text-3xl font-semibold">Explore</span>
                </Link>
              </li>
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem]  text-zinc-500">
                <div className="flex items-center gap-[1.5rem] w-full h-full">
                  <BiBell className="text-5xl" />
                  <span className="text-3xl font-semibold">Notifications</span>
                </div>
              </li>
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem]  text-zinc-500">
                <div className="flex items-center gap-[1.5rem] w-full h-full">
                  <BiMessageRoundedDots className="text-5xl" />
                  <span className="text-3xl font-semibold">Messages</span>
                </div>
              </li>
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem]  text-zinc-500">
                <div className="flex items-center gap-[1.5rem] w-full h-full">
                  <BsCardChecklist className="text-5xl" />
                  <span className="text-3xl font-semibold">Lists</span>
                </div>
              </li>
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem]  text-zinc-500">
                <div className="flex items-center gap-[1.5rem] w-full h-full">
                  <FiUsers className="text-5xl" />
                  <span className="text-3xl font-semibold">Communities</span>
                </div>
              </li>
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem] text-zinc-500">
                <div className="flex items-center gap-[1.5rem] w-full h-full">
                  <LuVerified className="text-5xl" />
                  <span className="text-3xl font-semibold">Verify</span>
                </div>
              </li>
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem] cursor-pointer">
                <Link
                  to={`/${user?.userName as string}`}
                  className="flex items-center gap-[1.5rem] w-full h-full"
                >
                  <BiSolidUser className="text-5xl" />
                  <span className="text-3xl font-semibold">Profile</span>
                </Link>
              </li>
              <li className="duration-300 hover:bg-gray-800 rounded-3xl py-[0.5rem] px-[0.4rem]  text-zinc-500">
                <div className="flex items-center gap-[1.5rem] w-full h-full">
                  <CiCircleMore className="text-5xl" />
                  <span className="text-3xl font-semibold">More</span>
                </div>
              </li>
            </ul>
            <p
              className="bg-purple-600 p-[1.5rem] w-[90%] rounded-[4rem] text-2xl font-semibold text-center mt-[2rem] duration-300 hover:bg-purple-700 cursor-pointer"
              onClick={() => {
                setShowCreateTweet(true);
              }}
            >
              Create new tweet
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showLogoutPopup ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              onClick={handleLogout}
              className="  bottom-[12rem] bg-black border-[1px] border-gray-600 w-full pl-[1.5rem] py-[2rem] h-[4rem] flex items-center rounded-2xl hover:bg-zinc-900 cursor-pointer"
            >
              <button type="submit" className="text-2xl font-semibold">
                Log out @UserName
              </button>
            </motion.div>

            <div
              className="w-full bottom-[3rem] rounded-[4rem]"
              onClick={showPopup}
            >
              <div className="w-full bg-zinc-90 px-[0.7rem] rounded-[4rem] py-[0.8rem] flex items-center h-[6rem] relative  duration-300 hover:bg-zinc-800 cursor-pointer">
                <div className="h-[4rem] w-[4rem]">
                  <img
                    src={`http://localhost:3000/${user!.profileImg}`}
                    alt="user image"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="h-[4rem] ml-[0.8rem]">
                  <p className="text-xl font-semibold">{user?.fullName}</p>
                  <p className="mt-[0.3rem] text-xl text-gray-400">
                    @{user?.userName}
                  </p>
                </div>
                <div className="absolute right-[1rem] text-4xl">
                  <HiOutlineDotsHorizontal />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {showCreateTweet &&
        createPortal(
          <CreateTweetPopup setShowPopup={setShowCreateTweet} />,
          document.getElementById("overlay") as HTMLElement
        )}
    </>
  );
}
