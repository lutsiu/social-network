import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { UserType } from "../../../interfaces/models";

interface Props {
  handleShowPopup?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,

}
export default function ThreeDots(props: Props) {
  return (
    <div
      className="w-[3rem] h-[3rem] flex items-center justify-center duration-300 rounded-full trend-hover cursor-pointer"
      onClick={props.handleShowPopup}
    >
      <HiOutlineDotsHorizontal className="text-3xl text-zinc-400" />
    </div>
  );
}
