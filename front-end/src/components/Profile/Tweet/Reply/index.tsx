import TweetBtn from "../../../Buttons/TweetButton";
import { Circle } from "rc-progress";
import { useState } from "react";
import { Link } from "react-router-dom";
import useResponsive from "../../../../hooks/useResponsive";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
export default function Reply() {
  const [reply, setReply] = useState("");
  const width = useResponsive();
  const {user} = useSelector((state: ReduxState) => state.auth);
  return (
    <div className="pb-[2rem] border-b-[1px] px-[1rem] border-b-zinc-700 mt-[1rem] sm:max-w-full box-border">
      <form className="flex items-start sm:gap-0 gap-[1rem] flex-wrap">
        <div className="flex justify-start flex-[1]">
          <Link to="/user" className="w-[4rem] h-[4rem] inline-block">
            <img
              src={`http://localhost:3000/${user!.profileImg}`}
              alt="User's avatar"
              className="rounded-full h-full w-full object-cover"
            />
          </Link>
        </div>
        <textarea
          className="flex-[6] md:flex-[9] text-white bg-transparent py-[1rem] text-3xl outline-none font-medium max-w-full"
          placeholder="What is happening?!"
          rows={width >= 576 ? 1 : 3}
          maxLength={200}
          value={reply}
          onChange={(e) => setReply(e.currentTarget.value)}
        />
      </form>
      <div className="flex mt-[3rem] justify-end items-center gap-[1.3rem]">
        <Circle
          trailWidth={8}
          trailColor="rgb(63 63 70)"
          strokeColor="rgb(168 85 247)"
          strokeWidth={8}
          percent={reply.length / 2}
          className="w-[2.5rem] h-[2.5rem]"
        />

        <TweetBtn disabled={reply.length === 0 ? true : false} text="Reply" />
      </div>
    </div>
  );
}
