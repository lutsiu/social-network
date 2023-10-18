import { FaFeatherAlt, FaPlus } from "react-icons/fa";

interface Props {
  setShowPopup: (show: true) => void
}

export default function CreateTweetButton(props: Props) {
  return (
    <button className="fixed bottom-[7rem] right-[3rem] bg-purple-500 w-[6rem] h-[6rem] rounded-full hover:bg-purple-700 duration-300" onClick={() => props.setShowPopup(true)}>
      <div className="relative">
        <FaPlus className="absolute top-[-1.3rem] left-[1.5rem]" />

        <FaFeatherAlt
          className="absolute text-3xl left-[50%] top-[50%] "
          style={{ transform: "translate(-50%, -50%)" }}
        />
      </div>
    </button>
  );
}
