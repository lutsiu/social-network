import Header from "./Header";

import { Outlet } from "react-router-dom";
import RightMenu from "../RightMenu";
import useResponsive from "../../../hooks/useResponsive";
export default function ResponsiveTweet() {

  const width = useResponsive();

  return (
    <>
      <Header />
      <div className="h-full flex relative lg:justify-between sm:justify-center pt-[5rem]">
        <div className="lg:w-[60%] lg:pr-[2rem] lg:pl-[6rem] md:w-[90%] w-full">
          <Outlet/>
        </div>
        {width >= 992 && <RightMenu trends={true} />}
      </div>
    </>
  );
}
