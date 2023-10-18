import { Link } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { LuVerified } from "react-icons/lu";
import { BsCardChecklist, BsBookmark } from "react-icons/bs";
import { HiUsers } from "react-icons/hi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
export default function Links() {
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  return (
    <div>
      <ul className="mt-[1rem] flex flex-col ">
        <li className="duration-300 hover:bg-zinc-900  py-[1.8rem] px-[0.4rem] cursor-pointer pl-[2rem] ">
          <Link
            to={`/${myUser!.userName}`}
            className="flex items-center gap-[1.5rem] w-full h-full"
          >
            <BiSolidUser className="text-5xl" />
            <span className="text-3xl font-semibold">Profile</span>
          </Link>
        </li>
        <li className="duration-300 hover:bg-zinc-900  py-[1.8rem] px-[0.4rem]  text-zinc-500 pl-[2rem] ">
          <div className="flex items-center gap-[1.5rem] w-full h-full">
            <LuVerified className="text-5xl" />
            <span className="text-3xl font-semibold">Purple</span>
          </div>
        </li>
        <li className="duration-300 hover:bg-zinc-900  py-[1.8rem] px-[0.4rem]  text-zinc-500 pl-[2rem] ">
          <div className="flex items-center gap-[1.5rem] w-full h-full">
            <BsCardChecklist className="text-5xl" />
            <span className="text-3xl font-semibold">Lists</span>
          </div>
        </li>
        <li className="duration-300 hover:bg-zinc-900  py-[1.8rem] px-[0.4rem] cursor-pointer pl-[2rem] text-zinc-500">
          <div
            className="flex items-center gap-[1.5rem] w-full h-full"
          >
            <BsBookmark className="text-5xl" />
            <span className="text-3xl font-semibold">Bookmarks</span>
          </div>
        </li>
        <li className="duration-300 hover:bg-zinc-900  py-[1.8rem] px-[0.4rem]  text-zinc-500 pl-[2rem] ">
          <div className="flex items-center gap-[1.5rem] w-full h-full">
            <HiUsers className="text-5xl" />
            <span className="text-3xl font-semibold">Communities</span>
          </div>
        </li>
        <li className="duration-300 hover:bg-zinc-900  py-[1.8rem] px-[0.4rem]  text-zinc-500 pl-[2rem] ">
          <div className="flex items-center gap-[1.5rem] w-full h-full">
            <LiaMoneyBillWaveSolid className="text-5xl" />
            <span className="text-3xl font-semibold">Monetization</span>
          </div>
        </li>
      </ul>
    </div>
  );
}
