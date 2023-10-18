import { IconType } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { setWhoCanReply } from "../../../../state/ui";
import {useEffect} from 'react';
import { useDispatch } from "react-redux";
interface Props {
  Icon: IconType;
  descr: string;
  checkmarkIsVisible: boolean;
  whoCanReply: "everyone" | "following" | "mentioned";
  setShowPopup: (show: boolean) => void;
}

export default function Option(props: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleChangeOption = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const option = target.closest('.who-can-reply-option') as HTMLElement;
      if (!option) return;
      const child = option?.contains(target);
      if (option || child) {
        const {whoCanReply} = option.dataset as {whoCanReply: "everyone" | "following" | "mentioned"};
        dispatch(setWhoCanReply(whoCanReply));
        props.setShowPopup(false);
      }
    };

    document.addEventListener('mousedown', handleChangeOption);
  }, [dispatch, props]);

  return (
    <div
      data-who-can-reply={props.whoCanReply}
      className="who-can-reply-option w-full px-[1.5rem]  py-[1.3rem] duration-200 hover:bg-zinc-900 mt-[0.3rem] flex items-center gap-[1rem] cursor-pointer"
    >
      <div className="w-[4rem] h-[4rem] bg-purple-500 rounded-full flex items-center justify-center">
        <props.Icon className="text-3xl" />
      </div>
      <div className="text-2xl font-semibold flex-[7]">{props.descr}</div>
      <div className="text-purple-500 flex-[1] text-3xl">
        <IoMdCheckmark style={{ opacity: props.checkmarkIsVisible ? 1 : 0 }} />
      </div>
    </div>
  );
}
