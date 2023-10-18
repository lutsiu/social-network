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
export default function WhoCanReply() {
  const [showPopup, setShowPopup] = useState(false);
  const width = useResponsive();
  const dispatch = useDispatch();
  const { whoCanReply, audience } = useSelector(
    (state: ReduxState) => state.ui
  );

  let content = (
    <Option
      Icon={FaGlobeEurope}
      descr="Everyone can reply"
      setShowPopup={setShowPopup}
    />
  );

  if (whoCanReply === "following" && audience !== "circle") {
    content = (
      <Option
        Icon={FiUserCheck}
        descr="People you follow"
        setShowPopup={setShowPopup}
      />
    );
  }

  if (audience === "circle") {
    content = (
      <Option
        Icon={AiFillLock}
        descr="Only your Lutsiu.app circle can reply"
        setShowPopup={setShowPopup}
        isLocked={true}
      />
    );
  }

  return (
    <div className="mt-[1rem] relative">
      <div className="inline-block">{content}</div>

      <Popup showPopup={showPopup} setShowPopup={setShowPopup} />
    </div>
  );
}
