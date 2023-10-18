import { useDispatch, useSelector } from "react-redux";
import { setShowSidebarMenu } from "../../../state/ui";
import { ReduxState } from "../../../interfaces/redux";
export default function HomeHeader() {
  const dispatch = useDispatch();
  const myUser = useSelector((state: ReduxState) => state.auth.user);
  return (
    <>
      <header
        className="fixed lg:w-full md:w-[90%]  w-full left-[50%] h-[5rem] py-[0.5rem] z-20 flex"
        style={{ background: `rgba(0,0,0,0.89)` , transform: 'translateX(-50%)'}}
      >
        <div className="flex-[1]">
          <div
            className="w-[3.7rem] h-[3.7rem] absolute lg:left-[6rem] md:left-0 sm:left-[2rem] left-[2rem] top-[50%] cursor-pointer"
            style={{ transform: "translateY(-50%)" }}
            onClick={() => dispatch(setShowSidebarMenu())}
          >
            <img
              src={`http://localhost:3000/${myUser!.profileImg}`}
              alt="User's avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <h1
          className="text-center text-3xl absolute left-[50%] top-[50%]"
          style={{ transform: "translate(-50%, -50%)" }}
        >
          Lutsiu.App
        </h1>
      </header>
    </>
  );
}
