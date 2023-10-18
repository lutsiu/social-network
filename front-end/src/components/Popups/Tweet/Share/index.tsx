import { BiCopy } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import { BsFillBookmarkPlusFill, BsBookmarkDashFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { useEffect } from "react";
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;
  bookmarked: boolean;
  setBookmarked: () => void;
}

export default function Share(props: Props) {

  const handleBookmark = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    props.setBookmarked();
    props.setShowPopup(false);
  };

  useEffect(() => {
    const handleClosePopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(".popup-tweet-share") &&
        !target.closest(".popup-tweet-share-li-bookmark")
      ) {
        return;
      } else {
        props.setShowPopup(false);
      }
    };

    document.addEventListener("click", handleClosePopup);

    return () => {
      document.removeEventListener("click", handleClosePopup);
    };
  }, [props]);

  

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: props.showPopup ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      style={{ pointerEvents: props.showPopup ? "auto" : "none" }}
      className="shadow popup-tweet-share absolute top-0 right-0 bg-black w-[25rem] rounded-3xl text-zinc-100 z-20"
    >
      <li className="flex font-bold text-2xl gap-[1.3rem] items-center p-[1.2rem] cursor-pointer">
        <BiCopy className="text-3xl" />
        <span>Copy link to Tweet</span>
      </li>
      <li className="flex font-bold text-2xl gap-[1.3rem] items-center p-[1.2rem] ">
        <AiOutlineMail className="text-3xl" />
        <span>Send via Direct Message</span>
      </li>
      <li className="flex font-bold text-2xl gap-[1.3rem] items-center p-[1.2rem] popup-tweet-share-li-bookmark" onClick={handleBookmark}>
        {props.bookmarked && (
          <>
            <BsBookmarkDashFill className="text-3xl" />
            <span>Remove Tweet from Bookmarks</span>
          </>
        )}
        {!props.bookmarked && (
          <>
            <BsFillBookmarkPlusFill className="text-3xl" />
            <span>Bookmark</span>
          </>
        )}
      </li>
    </motion.ul>
  );
}
