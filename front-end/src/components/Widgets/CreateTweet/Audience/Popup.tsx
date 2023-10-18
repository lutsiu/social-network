import { FaGlobeEurope } from "react-icons/fa";
import { TbUserHeart } from "react-icons/tb";
import { Link } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import {useEffect} from 'react';
import { setAudience } from "../../../../state/ui";
import { ReduxState } from "../../../../interfaces/redux";
import {useDispatch, useSelector} from 'react-redux'
import {motion} from 'framer-motion';

interface Props {
  showPopup: boolean,
  setShowPopup: (show: boolean) => void
}

export default function Audience(props: Props) {
  const dispatch = useDispatch();
  const {audience} = useSelector((state: ReduxState) => state.ui);


  useEffect(() => {
    const handleChangeOption = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const option = target.closest(".audienceOption") as HTMLElement;
      if (!option) return;
      const child = option.contains(target);
      if (option || child) {
        const { audience } = option.dataset as {
          audience: "everyone" | "circle";
        };
        audience === "everyone" ? dispatch(setAudience('everyone')) : dispatch(setAudience('circle'));
        props.setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleChangeOption);
  }, [dispatch, props]);

  return (
    <motion.div className="audience-popup z-10 absolute shadow w-[25rem] h-fit rounded-2xl top-[3rem] zleft-[-7.8rem] bg-black pt-[1.5rem]"
      initial={{opacity: 0}}
      animate={{opacity: props.showPopup ? 1 : 0}}
      transition={{duration: 0.4}}
      style={{pointerEvents: props.showPopup ? 'auto' : 'none'}}
      >
      <h3 className="text-3xl font-bold ml-[1rem]">Choose audience</h3>
      <div
        className="audienceOption  w-full px-[1.5rem]  py-[1.3rem] duration-200 hover:bg-zinc-900 mt-[0.3rem] flex items-center gap-[1rem] cursor-pointer"
        data-audience="everyone"
      >
        <div className="w-[4rem] h-[4rem] bg-purple-500 rounded-full flex items-center justify-center flex-[2]">
          <FaGlobeEurope className="text-3xl" />
        </div>
        <span className="text-2xl font-semibold flex-[7]">Everyone</span>
        <IoMdCheckmark
          className="text-purple-500 flex-[1] text-3xl"
          style={{ opacity: audience === "everyone" ? 1 : 0 }}
        />
      </div>
      <div
        className="audienceOption  w-full px-[1.5rem]  py-[1.3rem] duration-200 hover:bg-zinc-900  flex items-center gap-[1rem] cursor-pointer"
        data-audience="circle"
      >
        <div className="w-[4rem] h-[4rem] bg-green-500  rounded-full flex items-center justify-center flex-[2]">
          <TbUserHeart className="text-3xl" />
        </div>
        <div className="flex-[7]">
          <span className="text-2xl font-semibold">Your Circle</span>
          <div className="flex items-center mt-[0.3rem] gap-[0.3rem]">
            <div>
              <span className="text-2xl font-bold">{4}</span>
              <span className="text-xl font-light text-zinc-400 ml-[0.3rem]">
                People
              </span>
            </div>
            <div className="text-2xl font-medium underline duration-300 hover:bg-zinc-700 py-[0.5rem] px-[1.3rem] rounded-3xl">
              Edit
            </div>
          </div>
        </div>
        <IoMdCheckmark
          className="text-purple-500 flex-[1] text-3xl"
          style={{ opacity: audience === "circle" ? 1 : 0 }}
        />
      </div>
    </motion.div>
  );
}
