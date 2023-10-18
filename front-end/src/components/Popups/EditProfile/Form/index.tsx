/* eslint-disable @typescript-eslint/no-misused-promises */
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useCallback, useState } from "react";
import PhotoUpload from "./PhotoUpload";
import { red, purple, lightGray, darkGray } from "../../../../utils/colors";
import { UserType } from "../../../../interfaces/models";
import { useDispatch, useSelector } from "react-redux";
import { ReduxState } from "../../../../interfaces/redux";
import { setChangeProfile } from "../../../../state/auth";
import { useNavigate, useLocation } from "react-router-dom";
const Form = React.memo((props: { setCloseForm: (show: boolean) => void }) => {
  const user = useSelector((state: ReduxState) => state.auth.user) as UserType;
  const [showImage, setShowImage] = useState(user.profileImg);
  const [image, setImage] = useState<null | Blob>(null);
  const [disableButton, setDisableButton] = useState(false);
  const [fullNameColor, setFullNameColor] = useState(darkGray);
  const [fullNameLabelColor, setFullNameLabelColor] = useState(lightGray);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    fullName: user.fullName,
    bio: user?.bio || "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(2, "User name must be at least 2 characters long")
      .max(25, "User name must be maximum 25 characters long")
      .required("User name must be at least 2 characters long"),
    bio: Yup.string().notRequired(),
  });

  // eslint-disable-next-line @typescript-eslint/require-await
  const onSubmit = async function (values: { fullName: string; bio: string }) {
    try {
      const formData = new FormData();

      image && formData.append("profileImg", image);
      formData.append("fullName", values.fullName);
      formData.append("bio", values.bio);
      

      if (image) {
        const res = await fetch(
          `http://localhost:3000/edit-profile-with-image/${user._id}`,
          {
            method: "PATCH",
            body: formData,
          }
        );

        const imageAsFile = image as File;
        if (res.status === 204) {
          dispatch(
            setChangeProfile({
              fullName: values.fullName,
              bio: values.bio,
              profileImg: `public/${imageAsFile.name}`,
            })
          );
          props.setCloseForm(false);
          navigate(`${location.pathname}`);
        }
      } else {
        console.log('done');
        const res = await fetch(
          `http://localhost:3000/edit-profile-without-image/${user._id}`,
          {
            method: "PATCH",
            body: formData,
          }
        );
        if (res.status === 204) {
          dispatch(
            setChangeProfile({
              fullName: values.fullName,
              bio: values.bio,
            })
          );
          props.setCloseForm(false);
          navigate(`${location.pathname}`);
        }
      }
    } catch {
      console.log("some error occured");
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const handleInputFocus = async function (fieldName: string): Promise<void> {
    await formik.setFieldTouched(fieldName, true, false);
  };
  const handleInputBlur = async function (fieldName: string): Promise<void> {
    await formik.setFieldTouched(fieldName, false, false);
  };

  useEffect(() => {
    if (formik.errors.fullName) {
      setFullNameColor(red);
      setFullNameLabelColor(red);
    }
    if (!formik.touched.fullName && !formik.errors.fullName) {
      setFullNameColor(darkGray);
      setFullNameLabelColor(lightGray);
    }
    if (formik.touched.fullName && !formik.errors.fullName) {
      setFullNameColor(purple);
      setFullNameLabelColor(purple);
    }
  }, [formik]);

  useEffect(() => {
    if (formik.errors.fullName) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  }, [formik]);

  return (
    <form
      className="mx-auto lg:w-[42%] md:w-[60%] sm:w-[80%]  sm:mt-[4rem] bg-black rounded-3xl py-[1rem] pb-[5rem]"
      onSubmit={formik.handleSubmit}
    >
      <div className="w-full flex items-center px-[1rem]">
        <div className="flex-[1] flex justify-start">
          <div className="edit-popup-close-icon p-[1rem] rounded-full hover:bg-zinc-900 cursor-pointer duration-300">
            <AiOutlineClose className="text-3xl" />
          </div>
        </div>
        <h2 className="flex-[7] text-4xl font-semibold">Edit profile</h2>
        <div className="flex-[2]  flex justify-end">
          <button
            type="submit"
            className="text-black text-2xl font-semibold rounded-[7rem] py-[0.7rem] px-[2rem] duration-300"
            disabled={disableButton}
            style={{
              backgroundColor: disableButton ? 'darkGray' : lightGray,
            }}
          >
            Save
          </button>
        </div>
      </div>
      <div className="px-[1.5rem] mt-[8rem]">
        <PhotoUpload
          img={{ image, setImage }}
          showImg={{ img: showImage, setImage: setShowImage }}
        />
        <div className="mt-[2rem]">
          <div className="relative">
            <label
              htmlFor="fullName"
              className="mb-[0.4rem] inline-block text-2xl"
              style={{
                color: fullNameLabelColor,
              }}
            >
              Name
            </label>
            <span
              className="absolute right-[1rem] top-[3rem] text-zinc-400 text-xl"
              style={{
                opacity:
                  formik.touched.fullName || formik.errors.fullName ? "1" : "0",
              }}
            >
              {`${formik.values.fullName.length} / 25`}
            </span>
            <input
              type="text"
              name="fullName"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onFocus={() => handleInputFocus("fullName")}
              onBlur={() => handleInputBlur("fullName")}
              maxLength={25}
              className="w-full bg-black h-[6rem] p-[1rem]  text-3xl outline-[1] outline-none border-[1px]  rounded-lg"
              placeholder={formik.touched.fullName ? "" : "Name"}
              style={{
                borderColor: fullNameColor,
              }}
            />
            {formik.errors.fullName && (
              <div className="mt-[1rem] text-xl font-medium text-red-600">
                {formik.errors.fullName}
              </div>
            )}
          </div>
          <div className="relative mt-[2.7rem]">
            <label
              htmlFor="fullName"
              className="mb-[0.4rem] inline-block text-2xl"
              style={{
                color: formik.touched.bio ? purple : lightGray,
              }}
            >
              Bio
            </label>
            <span
              className="absolute right-[1rem] top-[3rem] text-zinc-400 text-xl"
              style={{
                opacity: formik.touched.bio ? "1" : "0",
              }}
            >{`${formik.values.bio.length} / 150`}</span>
            <textarea
              name="bio"
              value={formik.values.bio}
              onChange={formik.handleChange}
              onFocus={() => handleInputFocus("bio")}
              onBlur={() => handleInputBlur("bio")}
              maxLength={150}
              className="w-full bg-black h-[15rem] p-[1rem] pt-[3rem] text-3xl outline-[1] outline-none border-[1px] border-zinc-700 rounded-lg"
              placeholder={formik.touched.bio ? "" : "Bio"}
              style={{
                borderColor: formik.touched.bio ? purple : "",
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
});

export default Form;
