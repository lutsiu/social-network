import styles from "./styles.module.scss";
import { IoCloseOutline } from "react-icons/io5";
import React, { Dispatch, SetStateAction } from "react";
interface Props {
  images: Blob[] | null;
  setImages: Dispatch<SetStateAction<Blob[] | null>>;
}

const PhotoPreview = React.memo((props: Props) => {
  const { images } = props;
  let columnStyle = "";
  let imgStyle = "";
  const display = images ? styles.shown : styles.hidden;
  if (images && images.length === 1) {
    columnStyle = styles.oneCol;
    imgStyle = styles.oneImg;
  }
  if (images && images.length === 2) {
    columnStyle = styles.twoCol;
    imgStyle = styles.twoImg;
  }
  if (images && images.length === 3) {
    columnStyle = styles.threeCol;
    imgStyle = styles.threeImg;
  }
  if (images && images.length === 4) {
    columnStyle = styles.fourCol;
    imgStyle = styles.fourImg;
  }

  const handleDeleteImage = (i: number) => {
    if (props.setImages) {
      const filteredImages = images!.filter((img, ind) => ind !== i);
      props.setImages(filteredImages);
    }
  };

  const imgNormalDiv =  `h-full w-full object-cover rounded-3xl ${imgStyle} relative`
  const threeImgDiv = `col-span-1 row-span-2 h-full w-full rounded-3xl relative`;

  return (
    <div className={`${display} ${columnStyle}`}>
      {images &&
        images.map((img, i) => {
          return (
            <div className={images.length === 3 && i === 0 ? threeImgDiv : imgNormalDiv}>
              <div
                className="absolute right-[0.3rem] top-[0.3rem] bg-zinc-900 p-[0.5rem] rounded-full duration-300 hover:bg-zinc-700 cursor-pointer"
                onClick={() => {
                  handleDeleteImage(i);
                }}
              >
                <IoCloseOutline className="text-4xl rounded-full" />
              </div>
              <img
                key={URL.createObjectURL(img)}
                src={URL.createObjectURL(img)}
                className={`min-h-full w-full object-cover rounded-3xl ${imgStyle}`}
              />
            </div>
          );
        })}
    </div>
  );
});
export default PhotoPreview;
