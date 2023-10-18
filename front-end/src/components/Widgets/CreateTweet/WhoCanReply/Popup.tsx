/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Option from "./PopupOption";
import { FiUserCheck } from "react-icons/fi";
import { FaAt, FaGlobeEurope } from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import {useEffect} from 'react';
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
}

export default function Popup(props: Props) {
  const { whoCanReply } = useSelector((state: ReduxState) => state.ui);

  useEffect(() => {
    const handleShowPopup = (e:MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.who-can-reply-popup')) {
        props.setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleShowPopup);
  });


  return (
    <motion.div
      className="who-can-reply-popup absolute left-[-8.4rem] top-[3rem] bg-black shadow w-[32rem] h-fit rounded-3xl z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: props.showPopup ? 1 : 0 }}
      style={{pointerEvents: props.showPopup ? 'auto' : 'none'}}
      transition={{ duration: 0.4 }}
    >
      <div className="mt-[1.5rem] ml-[1.5rem]">
        <h3 className="text-2xl font-semibold">Who can reply?</h3>
        <p className="text-2xl text-zinc-500">
          Choose who can reply to this Tweet.
        </p>
        <p className="text-2xl text-zinc-500">
          Anyone mentioned can always reply.
        </p>
      </div>
      <div className="mt-[1rem]">
        <Option
          Icon={FaGlobeEurope}
          descr="Everyone"
          checkmarkIsVisible={whoCanReply === "everyone" ? true : false}
          whoCanReply='everyone'
          setShowPopup={props.setShowPopup}
        />
        <Option
          Icon={FiUserCheck}
          descr="People you follow"
          checkmarkIsVisible={whoCanReply === "following" ? true : false}
          whoCanReply='following'
          setShowPopup={props.setShowPopup}
        />
      </div>
    </motion.div>
  );
}
