import SeachBar from "../../Widgets/SearchBar";
import Trends from "../../Widgets/Trends";
import WhoToFollow from "../../Widgets/WhoToFollow";

interface Props {
  searchBar?: boolean;
  trends?: boolean;
  whoToFollow?: boolean;
}

export default function RightMenu(props: Props) {
  return (
    <div className="2xl:w-[32%] lg:w-[40%] bg-gray-950 min-h-[100vh] 2xl:py-[1rem]">
      <div className="w-[75%]">
        {props.searchBar && <SeachBar />}
        {props.trends && <Trends />}
        {props.whoToFollow && <WhoToFollow />}
      </div>
    </div>
  );
}
