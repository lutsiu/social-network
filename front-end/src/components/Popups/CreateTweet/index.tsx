import { useEffect } from "react";
import CreateTweet from "../../Widgets/CreateTweet";
import { IoMdClose } from "react-icons/io";
import useResponsive from "../../../hooks/useResponsive";
interface Props {
  setShowPopup: (show: boolean) => void;
}
export default function CreateTweetPopup(props: Props) {

  const width = useResponsive();

  useEffect(() => {
    const handleClosePopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.classList.contains("create-tweet-popup") ||
        target.closest(".close-create-tweet-popup")
      ) {
        
        props.setShowPopup(false);
        console.log('closed');
      }
    };
    document.addEventListener("mousedown", handleClosePopup);
  }, [props]);

  return (
    <div
      className="create-tweet-popup fixed top-0 right-0 bottom-0 left-0 overflow-y-auto"
      style={{ background: `rgba(55, 65, 81, 0.6)` }}
    >
      <div className="lg:max-w-[50%] md:w-[60%] sm:w-[80%] bg-black rounded-[2rem] mx-auto mt-[3rem] pt-[6rem] relative">
        <div className="close-create-tweet-popup absolute top-[1rem] left-[1rem] rounded-full p-[1rem] hover:bg-zinc-900 duration-300 cursor-pointer">
          <IoMdClose className="text-4xl text-zinc-300" />
        </div>
        <CreateTweet setShowPopup={props.setShowPopup} />
      </div>
    </div>
  );
}
