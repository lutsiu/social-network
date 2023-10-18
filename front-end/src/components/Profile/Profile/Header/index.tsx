import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { UserType } from "../../../../interfaces/models";

interface Props {
  fullName: string;
  tweets: string[];
}

export default function Header(props: Props) {
  return (
    <nav
      className="2xl:w-[40%] fixed z-20 w-full h-[5rem] flex items-center gap-[2.4rem] 2xl:pt-[1rem] py-[1rem] pl-[1rem] lg:py-[1rem]"
      style={{ background: "rgba(0,0,0,0.8)" }}
    >
      <Link
        to="/home"
        className="p-[1rem] rounded-full inline-block hover:bg-zinc-800 duration-300"
      >
        <HiArrowLeft className="text-3xl" />
      </Link>
      <div>
        <h2 className="text-3xl font-semibold">{props.fullName}</h2>
        <h2 className="text-xl text-zinc-400 mt-[0.5rem]">{props.tweets.length} {props.tweets.length === 1 ? 'Tweet' : 'Tweets'}</h2>
      </div>
    </nav>
  );
}
