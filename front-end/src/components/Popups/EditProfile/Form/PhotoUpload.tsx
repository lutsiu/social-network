import React, { useEffect, useCallback } from "react";
import styles from "../styles.module.scss";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import { red, purple, lightGray, darkGray } from "../../../../utils/colors";
import { useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
interface Props {
  img: {
    image: null | Blob;
    setImage: (img: null | Blob) => void;
  };
  showImg: {
    img:  string,
    setImage: (img:string) => void 
  }
}

const PhotoUpload = React.memo((props: Props) => {
  const { img, showImg } = props;
  const profileImage = useSelector((state: ReduxState) => state.auth.user?.profileImg);

  const onDrop = useCallback(
    (acceptedImage: Blob[]) => {
      const image = acceptedImage[0];
      img.setImage(image);
    },
    [img]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    maxFiles: 1,
  });


  return (
    <div>
      <div
        {...getRootProps({
          className: "w-[12.5rem] h-[12.5rem] relative",
        })}
      >
        <img
          src={!img.image ? `http://localhost:3000/${showImg.img}`: URL.createObjectURL(img.image)}
          alt=""
          className="w-full h-full rounded-full object-cover"
          style={{ border: isDragActive ? `2px dashed ${purple}` : ""}}
        />
        <div
          className="absolute w-full h-full rounded-full bg-slate-300 top-0 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.35)" }}
        >
          <input {...getInputProps()} name="profileImg" />
          <div
            className={`${styles.imageCircle} w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center cursor-pointer duration-200`}
            title="Add photo"
          >
            <MdOutlineAddAPhoto className="text-4xl" />
          </div>
        </div>
      </div>
    </div>
  );
})

export default PhotoUpload;

