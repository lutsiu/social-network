
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { setWhoCanReply } from "../../../../state/ui";
import { FiUserCheck } from "react-icons/fi";
import { FaAt, FaGlobeEurope } from "react-icons/fa";
import Option from "./option";
import Popup from "./Popup";
import { AiFillLock } from "react-icons/ai";
import useResponsive from "../../../../hooks/useResponsive";

interface Props {
  setShowPopup: (show: boolean) => void;
}
export default function WhoCanReplyresponsive(props: Props) {

  const width = useResponsive();
  const dispatch = useDispatch();
  const { whoCanReply, audience } = useSelector(
    (state: ReduxState) => state.ui
  );

  let content = (
    <Option
      Icon={FaGlobeEurope}
      descr="Everyone can reply"
      setShowPopup={props.setShowPopup}
    />
  );

  if (whoCanReply === "following" && audience !== "circle") {
    content = (
      <Option
        Icon={FiUserCheck}
        descr="People you follow"
        setShowPopup={props.setShowPopup}
      />
    );
  }

  if (audience === "circle") {
    content = (
      <Option
        Icon={AiFillLock}
        descr="Only your Lutsiu.app circle can reply"
        setShowPopup={props.setShowPopup}
        isLocked={true}
      />
    );
  }

  return (
    <div className="mt-[1rem] relative">
      <div className="inline-block">{content}</div>
    </div>
  );
}
