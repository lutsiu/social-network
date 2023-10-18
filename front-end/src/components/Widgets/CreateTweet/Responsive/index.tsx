/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link } from "react-router-dom";
import TextArea from "../Textarea";
import { GoFileMedia } from "react-icons/go";
import { BiSolidFileGif, BiPoll, BiSolidSmile } from "react-icons/bi";
import { ReduxState } from "../../../../interfaces/redux";
import { useDispatch, useSelector } from "react-redux";
import TweetBtn from "../../../Buttons/TweetButton";
import PhotoPreview from "../PhotoPreview";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import ErrorPopup from "../../../Errors/ErrorPopup";
import { Circle } from "rc-progress";
import { BsArrowLeft } from "react-icons/bs";
import AudienceResponsive from "../Audience/ResponsiveAudience";
import AudiencePopupResponsive from "../Audience/ResponsivePopup";
import WhoCanReplyResponsivePopup from "../WhoCanReply/ResponsivePopup";
import WhoCanReplyResponsive from "../WhoCanReply/ResponsiveIndex";
import { setAudience, setWhoCanReply, setTweet } from "../../../../state/ui";
import { updateTweets } from "../../../../state/auth";
export default function CreateTweetResponsive(props: {
  setShowPopup: (show: boolean) => void;
}) {
  const { tweet, whoCanReply, audience } = useSelector((state: ReduxState) => state.ui);
  const {user} = useSelector((state:ReduxState) => state.auth);
  const dispatch = useDispatch();
  const [images, setImages] = useState<null | Blob[]>(null);
  const [imagesAreUploaded, setImagesAreUploaded] = useState(false);
  const [imagesAreRejected, setImagesAreRejected] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showAudiencePopup, setShowAudiencePopup] = useState(false);
  const [showWhoCanReplyPopup, setShowWhoCanReplyPopup] = useState(false);

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

  async function handleSubmitCreateTweet(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
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
      <form className="fixed top-0 right-0 bottom-0 left-0 bg-black flex flex-col px-[1.5rem] py-[1rem] border-b-[1px] border-zinc-700 overflow-y-auto" onSubmit={handleSubmitCreateTweet}>
        <div className="relative h-full">
          <div className="w-full flex justify-between items-center h-fit">
            <BsArrowLeft
              className="text-4xl"
              onClick={() => props.setShowPopup(false)}
            />
            <div>
              <TweetBtn
                disabled={tweet.length === 0 ? true : false}
                text="Tweet"
              />
            </div>
          </div>
          <div className="pt-[0.5rem] mr-[2rem] flex gap-[2rem]">
            <Link to="some-user" className="w-[4rem] h-[4rem] inline-block">
              <img
                src={`http://localhost:3000/${user!.profileImg}`}
                alt="users avatar"
                className="w-full h-full object-cover  rounded-full"
              />
            </Link>
            <AudienceResponsive setShowPopup={setShowAudiencePopup} />
          </div>
          <div className="basis-[90%]">
            <div>
              <div>
                <TextArea />
                <PhotoPreview images={images} setImages={setImages} />
              </div>
              <div className="mt-[2rem]">
                <WhoCanReplyResponsive setShowPopup={setShowWhoCanReplyPopup} />
              </div>
              <div className="mt-[2rem] py-[1.6rem] border-t-[0.5px] border-zinc-700 pl-[1rem] flex items-center gap-[3rem]">
                <div className="flex gap-[2rem] text-3xl text-purple-900 flex-[8] items-center">
                  <div className="flex flex-wrap gap-[2rem] text-3xl text-purple-900 flex-[6] ">
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
                  <div className="flex-[1] h-[3rem] flex justify-between items-center">
                    <Circle
                      trailWidth={8}
                      trailColor="rgb(63 63 70)"
                      strokeColor="rgb(168 85 247)"
                      strokeWidth={8}
                      percent={tweet.length}
                      className="min-w-[50%] h-[2rem]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showError && <ErrorPopup message="Please choose up to 4 images" />}
          {(
            <AudiencePopupResponsive
              showPopup={showAudiencePopup}
              setShowPopup={setShowAudiencePopup}
            />
          )}
          {(
            <WhoCanReplyResponsivePopup
              showPopup={showWhoCanReplyPopup}
              setShowPopup={setShowWhoCanReplyPopup}
            />
          )}
        </div>
      </form>
    </>
  );
}
