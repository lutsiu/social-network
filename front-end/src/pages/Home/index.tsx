import Home from "../../components/Profile/Home";
import useResponsive from "../../hooks/useResponsive";
import HomeHeader from "../../components/ResponsiveDesign/Headers/HomeHeader";
import { useLoaderData } from "react-router-dom";
export default function Profile() {
  const width = useResponsive();
  return (
    <div className="2xl:w-[40%] w-full">
      <Home />
    </div>
  );
}
