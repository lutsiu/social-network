import styles from '../../../CreateTweet/PhotoPreview/styles.module.scss';
import React from "react";
interface Props {
  images: string[] | null;
  gap: number
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


  const imgNormalDiv =  `h-full w-full object-cover rounded-3xl ${imgStyle} relative`
  const threeImgDiv = `col-span-1 row-span-2 h-full w-full rounded-3xl relative`;

  return (
    <div className={`${display} ${columnStyle}`}  style={{gap: `${props.gap}rem`}}>
      {images &&
        images.map((img, i) => {
          return (
            <div  key={i} className={images.length === 3 && i === 0 ? threeImgDiv : imgNormalDiv}>
              <img
                key={img}
                src={img}
                className={`min-h-full w-full object-cover rounded-3xl ${imgStyle}`}
              />
            </div>
          );
        })}
    </div>
  );
});
export default PhotoPreview;
