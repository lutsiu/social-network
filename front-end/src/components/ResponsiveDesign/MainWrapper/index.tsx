import { useState } from "react";
import { Outlet } from "react-router-dom";
import RightMenu from "../../Profile/RightMenu";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../interfaces/redux";
import { createPortal } from "react-dom";
import SidebarMenu from "../SidebarMenu";
import CreateTweetButton from "../../Buttons/CreateTweet";
import CreateTweetPopup from "../../Popups/CreateTweet";
import BottomMenu from "../BottomMenu";
import useResponsive from "../../../hooks/useResponsive";
import CreateTweetResponsive from "../../Widgets/CreateTweet/Responsive";
interface Props {
  trends?: boolean;
  whoToFollow?: boolean;
  children: React.ReactNode;
}
export default function MainWrapper(props: Props) {
  const { showSidebarMenu } = useSelector((state: ReduxState) => state.ui);
  const [showCreateTweet, setShowCreateTweet] = useState(false);
  const width = useResponsive();
  return (
    <>
      {!showSidebarMenu && !showCreateTweet && props.children}
      {showSidebarMenu &&
        createPortal(
          <SidebarMenu />,
          document.getElementById("overlay") as HTMLElement
        )}
      {showCreateTweet && width >= 576 && 
        createPortal(
          <CreateTweetPopup setShowPopup={setShowCreateTweet} />,
          document.getElementById("overlay") as HTMLElement
        )}
      {showCreateTweet && width < 576 && 
        createPortal(
          <CreateTweetResponsive setShowPopup={setShowCreateTweet} />,
          document.getElementById("overlay") as HTMLElement
        )}
      {!showSidebarMenu &&
        !showCreateTweet &&
        createPortal(
          <BottomMenu />,
          document.getElementById("overlay") as HTMLElement
        )}
      <div className="h-full flex relative lg:justify-between sm:justify-center pt-[5rem]">
        <div className="lg:w-[60%] lg:pr-[2rem] lg:pl-[6rem] md:w-[90%] sm:w-full w-full">
          <Outlet />
        </div>

        {width >=992 && <RightMenu trends={props.trends} whoToFollow={props.whoToFollow} />}

        <CreateTweetButton setShowPopup={setShowCreateTweet} />
      </div>
    </>
  );
}
