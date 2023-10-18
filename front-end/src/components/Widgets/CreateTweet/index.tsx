/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from "react-router-dom";
import Audience from "./Audience";
import TextArea from "./Textarea";
import WhoCanReply from "./WhoCanReply";
import { GoFileMedia } from "react-icons/go";
import { BiSolidFileGif, BiPoll, BiSolidSmile } from "react-icons/bi";
import { ReduxState } from "../../../interfaces/redux";
import { useSelector, useDispatch } from "react-redux";
import TweetBtn from "../../Buttons/TweetButton";
import PhotoPreview from "./PhotoPreview";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ErrorPopup from "../../Errors/ErrorPopup";
import { createPortal } from "react-dom";
import { Circle } from "rc-progress";
import { setAudience, setWhoCanReply, setTweet } from "../../../state/ui";
import { updateTweets } from "../../../state/auth";
export default function CreateTweet(props: {
  setShowPopup?: (show: boolean) => void;
}) {
  const { user } = useSelector((state: ReduxState) => state.auth);
  const { tweet, whoCanReply, audience } = useSelector(
    (state: ReduxState) => state.ui
  );
  const [images, setImages] = useState<null | Blob[]>(null);
  const [imagesAreUploaded, setImagesAreUploaded] = useState(false);
  const [imagesAreRejected, setImagesAreRejected] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();

  const onDrop = useCallback(
    (acceptedFile: Blob[]) => {
      const uploadedImages = acceptedFile;
      if (!images) {
        return setImages(uploadedImages);
      }
      if (images.length + uploadedImages.length <= 4) {
        setImages((prev) => {
          return [...(prev || []), ...uploadedImages];
        });
      } else {
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    },
    [images]
  );

  async function handleSubmitCreateTweet(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    if (!tweet) return
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", tweet);
      formData.append("whoCanReply", whoCanReply);
      formData.append("audience", audience);
      formData.append("userId", user!._id);
      images?.forEach((img, i) => {
        formData.append(`image`, img);
      });
 
      const res = await fetch(`http://localhost:3000/tweet/add-tweet`, {
        method: "POST",
        body: formData,
      });

      if (res.status === 200) {
        dispatch(setAudience("everyone"));
        dispatch(setWhoCanReply("everyone"));
        const tweetId = await res.json() as string;
        dispatch(setTweet(''));
        dispatch(updateTweets({tweetId}));
        setImages(null);
        if (props.setShowPopup) {
          props.setShowPopup(false);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const {
    getRootProps,
    getInputProps,

    fileRejections,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
    maxFiles: 4,
  });

  useEffect(() => {
    if (fileRejections.length > 0) {
      console.log("REJECTED", fileRejections);
      setImagesAreRejected(true);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [fileRejections, acceptedFiles]);

  return (
    <>
      <div className="w-full h-fit flex px-[1.5rem] py-[1rem] border-b-[1px] border-zinc-700">
        <div className=" basis-[10%] pt-[0.5rem]">
          <Link to="some-user" className="w-[4rem] h-[4rem] inline-block">
            <img
              src={`http://localhost:3000/${user!.profileImg}`}
              alt="users avatar"
              className="w-full h-full object-cover  rounded-full"
            />
          </Link>
        </div>
        <div className="basis-[90%]">
          <form onSubmit={handleSubmitCreateTweet}>
            <Audience />
            <div>
              <TextArea />
              <PhotoPreview images={images} setImages={setImages} />
            </div>
            <WhoCanReply />
            <div className="mt-[2rem] py-[1.6rem] border-t-[0.5px] border-zinc-700 pl-[1rem] flex items-center gap-[3rem]">
              <div className="flex gap-[2rem] text-3xl text-purple-900 flex-[8] items-center">
                <div className="flex gap-[2rem] text-3xl text-purple-900 flex-[6] ">
                  <div {...getRootProps({})}>
                    <GoFileMedia
                      className="cursor-pointer text-purple-500"
                      title="Media"
                    />
                    <input {...getInputProps()} />
                  </div>
                  <BiSolidFileGif title="Didn't implemented" />
                  <BiPoll title="Didn't implemented" />
                  <BiSolidSmile title="Didn't implemented" />
                </div>
                {tweet && <div className="flex-[1] h-[3rem] flex justify-between items-center">
                  <Circle
                    trailWidth={8}
                    trailColor="rgb(63 63 70)"
                    strokeColor="rgb(168 85 247)"
                    strokeWidth={8}
                    percent={tweet.length}
                    className="w-[50%] h-[2rem]"
                  />
                  <div className="h-full w-[1px] bg-zinc-500"></div>
                </div>}
              </div>
              {tweet && <div className="flex-[1]">
                <TweetBtn
                  disabled={tweet.length === 0 ? true : false}
                  text="Tweet"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                />
              </div>}
            </div>
          </form>
        </div>
      </div>

      {showError &&
        createPortal(
          <ErrorPopup message="Please choose up to 4 images" />,
          document.getElementById("overlay") as HTMLElement
        )}
    </>
  );
}
