import { useEffect, useState } from "react";
import Form from "./Form";
interface Props {
  showPopup: boolean;
  setShowPopup: (show: boolean) => void;

}

export default function EditProfilePopup(props: Props) {

  const handleBodyScroll = (enableScrolling: boolean) => {
    if (enableScrolling) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    if (props.showPopup) {
      handleBodyScroll(false);
    } else {
      handleBodyScroll(true);
    }
    return () => {
      handleBodyScroll(true);
    };
  }, [props]);

  useEffect(() => {
    const handleShowPopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains("edit-popup-overlay")  || target.closest(".edit-popup-close-icon")) {
        props.setShowPopup(false);
      }
    };

    document.addEventListener("click", handleShowPopup);
  }, [props]);

  return (
    <div
      className="edit-popup-overlay w-full h-full z-[200] fixed right-0 top-0 left-0 bottom-0 bg-gray-600 overflow-x-auto"
      style={{ background: "rgba(75, 85, 99, 0.5)" }}
      /* onClick={(e) => e.preventDefault()} */
    >
      <Form setCloseForm={props.setShowPopup} />
    </div>
  );
}
