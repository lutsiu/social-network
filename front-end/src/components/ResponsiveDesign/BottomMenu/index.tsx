import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { BiSolidHomeHeart, BiBell, BiMessageRoundedDots } from "react-icons/bi";
import { Link } from "react-router-dom";
export default function BottomMenu() {
  return (
    <nav className="fixed bottom-0 w-full border-t-[1px] border-t-zinc-700 bg-black">
      <ul className="w-full flex justify-between">
        <li className="duration-300 hover:bg-gray-800 px-[0.4rem] cursor-pointer flex-1 py-[1.5rem]">
          <Link
            to="/home"
            className="flex items-center justify-center gap-[1.5rem] w-full h-full"
          >
            <BiSolidHomeHeart className="text-5xl" />
          </Link>
        </li>
        <li className="duration-300 hover:bg-gray-800 px-[0.4rem] cursor-pointer flex-1 py-[1.5rem]">
          <Link
            to="/explore"
            className="flex items-center justify-center gap-[1.5rem] w-full h-full"
          >
            <HiOutlineMagnifyingGlass className="text-5xl" />
          </Link>
        </li>
        <li className="duration-300 hover:bg-gray-800 px-[0.4rem]  text-zinc-500 flex-1 py-[1.5rem]">
          <div className="flex items-center justify-center gap-[1.5rem] w-full h-full">
            <BiBell className="text-5xl" />
          </div>
        </li>
        <li className="duration-300 hover:bg-gray-800 px-[0.4rem] cursor-pointer flex-1 py-[1.5rem]">
          <Link
            to="/messages"
            className="flex items-center justify-center gap-[1.5rem] w-full h-full"
          >
            <BiMessageRoundedDots className="text-5xl" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
