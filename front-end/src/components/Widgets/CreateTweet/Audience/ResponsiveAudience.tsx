import { BiSolidChevronDown } from "react-icons/bi";
import Popup from "./Popup";
import {  ReduxState } from "../../../../interfaces/redux";
import {useSelector} from 'react-redux'
import {useState, useEffect} from 'react';
import useResponsive from "../../../../hooks/useResponsive";

interface Props {
  setShowPopup: (show: boolean) => void
}

export default function AudienceResponsive(props: Props) {  

  const {audience} = useSelector((state: ReduxState) => state.ui);

  useEffect(() => {
    const handleShowPopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const popup = target.closest('.audience-popup');
      if (!popup) {
        props.setShowPopup(false);
      }
    }
    
    document.addEventListener('mousedown', handleShowPopup);

  }, []);
  const width = useResponsive();
  return (
    <div className="relative">
      <div
        className="audienceSelector flex items-center gap-[0.2rem] px-[1rem] py-[0.2rem] rounded-[4rem] border-[1px] w-fit cursor-pointer duration-200 hover:bg-zinc-900"
        style={{
          borderColor:
            audience === "everyone" ? "rgb(168 85 247)" : "rgb(34 197 94)",
          color: audience === "everyone" ? "rgb(168 85 247)" : "rgb(34 197 94)",
        }}
        onClick={() => props.setShowPopup(true)}
      >
        <span className="text-xl font-semibold">
          {audience === "everyone" ? "Everyone" : "Your circle"}
        </span>
        <BiSolidChevronDown className="text-2xl" />
      </div>
      
    </div>
  );
}
