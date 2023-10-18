import { useDispatch, useSelector } from "react-redux";
import { setShowSidebarMenu } from "../../../state/ui";
import SearchBar from "../../Widgets/SearchBar";
import { ReduxState } from "../../../interfaces/redux";
export default function HomeHeader() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: ReduxState) => state.auth);
  return (
    <>
      <header
        className="fixed w-full h-[5rem] py-[0.5rem] z-20 flex gap-[4rem] "
        style={{ background: `rgba(0,0,0,0.89)` }}
      >
        <div className="flex-[1]">
          <div
            className="w-[3.7rem] h-[3.7rem] absolute lg:left-[6rem] md:left-0 sm:left-[2rem] left-[2rem] top-[50%] cursor-pointer"
            style={{ transform: "translateY(-50%)" }}
            onClick={() => dispatch(setShowSidebarMenu())}
          >
            <img
              src={`http://localhost:3000/${user!.profileImg}`}
              alt="User's avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex-[13] flex justify-center ">
          <div className="lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%]">
            <SearchBar />
          </div>
        </div>
      </header>
    </>
  );
}
