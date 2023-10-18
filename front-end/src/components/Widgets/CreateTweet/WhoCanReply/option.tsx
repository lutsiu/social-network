import { IconType } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
interface Props {
  Icon: IconType;
  descr: string;
  setShowPopup: (show: boolean) => void;
  isLocked?: boolean;
}

export default function Option(props: Props) {
  return (
    <div
      className="flex items-center"
      style={{
        color: props.isLocked ? "rgb(107 33 168)" : "rgb(168 85 247)",
        cursor: props.isLocked ? "default" : "pointer",
      }}
      onClick={() => {
        if (props.isLocked) {
          return
        } 
        props.setShowPopup(true);
      }}
    >
      <props.Icon className="text-2xl" />
      <span className="ml-[0.5rem] text-xl font-semibold">{props.descr}</span>
    </div>
  );
}
