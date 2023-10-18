import Header from "./Header";
import Trends from "../../Widgets/Trends";
import useResponsive from "../../../hooks/useResponsive";
export default function Explore() {
  const width = useResponsive();

  return (
    <div className="min-h-[100vh] w-full border-x-[1px] border-zinc-700">
      {width >= 1400 && <Header />}

      <Trends />
    </div>
  );
}
