import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setShowSidebarMenu } from "../../../state/ui";
import { ReduxState } from "../../../interfaces/redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FollowingGroup from "../../Widgets/FollowingGroup";
import Links from "./Links";
import styles from './styles.module.scss';
import useFollow from "../../../hooks/useFollow";
export default function SidebarMenu() {
  const dispatch = useDispatch();
  const { showSidebarMenu } = useSelector((state: ReduxState) => state.ui);
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  const {following, followers} = useFollow(myUser!);
  return (
    <div
      className="overlay-sidebar-menu  fixed top-0 bottom-0 right-0 left-0 bg-gray-800 "
      style={{ backgroundColor: `rgba(31, 41, 55, 0.7)` }}
      onClick={(e) => {
        e.currentTarget.classList.contains("overlay-sidebar-menu")
          ? dispatch(setShowSidebarMenu())
          : "";
      }}
    >
      <motion.div
        className="h-full bg-black lg:w-[40%] sm:w-[60%] w-[75%]"
        initial={{ x: -1000 }}
        animate={{ x: showSidebarMenu ? 0 : -1000 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col  pt-[1.5rem] pl-[2rem] pr-[1rem]">
          <Link
            to={`/${myUser!.userName}`}
            className={`${styles.avatar} inline-block w-[4.7rem] h-[4.7rem] cursor-pointer`}
            onClick={() => dispatch(setShowSidebarMenu())}
          >
            <img
              src={`http://localhost:3000/${myUser!.profileImg}`}
              alt="User's avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </Link>
           <Link to={`/${myUser!.userName}`} className="lg:text-3xl text-2xl font-semibold mt-[0.5rem] hover:underline">
            {myUser?.fullName}
          </Link>
          <Link to={`/${myUser!.userName}`} className="lg:text-2xl text-2xl text-zinc-500">
            @{myUser?.userName}
          </Link>
          <div className="mt-[1rem]">
            <FollowingGroup followers={followers} following={following} />
          </div>
        </div>
        <Links />
      </motion.div>
    </div>
  );
}
