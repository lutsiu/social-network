/* eslint-disable @typescript-eslint/no-floating-promises */
import { AiOutlineClose } from "react-icons/ai";
import { FormEvent, useEffect, useState } from "react";
import Recipient from "./Recipient";
import Sender from "./Sender";
import { Circle } from "rc-progress";
import TweetBtn from "../../../Buttons/TweetButton";
import { TweetType, UserType } from "../../../../interfaces/models";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  user: UserType;
  tweet: TweetType;
}

export default function Reply(props: Props) {
  const [reply, setReply] = useState("");
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  const { user, tweet } = props;
  const handleBodyScroll = (enableScrolling: boolean) => {
    if (enableScrolling) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    if (props.showPopup) {
      handleBodyScroll(false);
    } else {
      handleBodyScroll(true);
    }
    return () => {
      handleBodyScroll(true);
    };
  }, [props]);
  useEffect(() => {
    const handleShowPopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("reply-popup-overlay") ||
        target.closest(".close-reply-popup")
      ) {
        props.setShowPopup(false);
      }
    };

    document.addEventListener("click", handleShowPopup);
  }, [props]);

  const onSendReply = () => {
    try {
      const body = JSON.stringify({
        tweetId: tweet._id,
        senderId: myUser?._id,
        recipientId: user._id,
        reply
      });
      fetch(`http://localhost:3000/tweet/send-reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      setReply("");
      props.setShowPopup(false);
    } catch (err) {
      console.log("Some error occured");
    }
  };

  return (
    <div
      className="reply-popup-overlay w-full h-full z-[200] fixed right-0 top-0 left-0 bottom-0 bg-gray-600 "
      style={{ background: "rgba(75, 85, 99, 0.5)" }}
      onClick={(e) => e.preventDefault()}
    >
      <div
        className="bg-black mx-auto sm:mt-[3.8rem] lg:w-[40%] md:w-[60%] sm:w-[80%] sm:h-fit h-full z-[100] rounded-3xl p-[1rem] relative pr-[2rem]"
        onSubmit={onSendReply}
      >
        <div className="close-reply-popup rounded-full p-[0.9rem] w-fit hover:bg-zinc-900 duration-300 cursor-pointer">
          <AiOutlineClose className="text-3xl" />
        </div>
        <Recipient tweet={props.tweet} user={props.user} />
        <Sender reply={reply} setReply={setReply} />
        <div className="flex mt-[7rem] justify-end items-center gap-[1.3rem]">
          <Circle
            trailWidth={8}
            trailColor="rgb(63 63 70)"
            strokeColor="rgb(168 85 247)"
            strokeWidth={8}
            percent={reply.length / 2}
            className="w-[2.5rem] h-[2.5rem]"
          />
          <div onClick={onSendReply}>
            <TweetBtn
              disabled={reply.length === 0 ? true : false}
              text="Reply"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
