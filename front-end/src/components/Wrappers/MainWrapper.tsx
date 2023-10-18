import LeftMenu from "../Profile/LeftMenu";
import HomeRightMenu from "../Profile/RightMenu";
import { Outlet } from "react-router-dom";
interface Props {
  searchBar: boolean;
  trends: boolean;
  whoToFollow: boolean;
}

export default function MainWrapper(props: Props) {


  return (
    <div className="h-full flex relative justify-between">
      <LeftMenu />

      <Outlet />

      <HomeRightMenu
        searchBar={props.searchBar}
        trends={props.trends}
        whoToFollow={props.whoToFollow}
      />
    </div>
  );
}
