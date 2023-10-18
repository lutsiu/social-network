import { useEffect, useState, useCallback } from "react";
import FormButton from "../../Buttons/FormButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";

export default function SignupForm(props: { userId: string }) {
  const [initDisabledButton, setInitDisabledButton] = useState(true);
  const [disableButton, setDisableButton] = useState(true);
  const [file, setFile] = useState<null | Blob>(null);
  const [fileName, setFileName] = useState("");
  const [fileIsUploaded, setFileIsUploaded] = useState(false);
  const [fileIsRejected, setFileIsRejected] = useState(false);
  const [signUpCompleted, setSignUpCompleted] = useState(false);

  const navigate = useNavigate();
  // DROPZONE

  const onDrop = useCallback((acceptedFile: Blob[]) => {
    const file = acceptedFile[0];

    setFileName(fileName);
    setFile(file);
  }, [fileName]);

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

  // FORMIK

  const initialValues = {
    userName: "",
    bio: "",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .min(2, "User name must be at least 2 characters long")
      .max(40, "User name must be maximum 40 characters long")
      .required(),
    bio: Yup.string().notRequired(),
  });

  const onSubmit = async function (values: { userName: string; bio: string }) {
    try {
      const formData = new FormData();
      const { userName, bio } = values;
      console.log(file);
      formData.append("userName", userName);
      formData.append("bio", bio);
      formData.append("userId", props.userId);
      formData.append("profileImg", file as Blob);
      console.log(formData);
      const res = await fetch(`http://localhost:3000/auth/signup/step-3`, {
        method: "PATCH",
        body: formData,
      });
      const { status } = res;

      if (status === 409) {
        const { message } = (await res.json()) as { message: string };
        formik.setFieldError("userName", message);
      }
      if (status === 204) {
        setSignUpCompleted(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  // use effect to set some hints for user during file uploading

  useEffect(() => {
    if (acceptedFiles.length === 1) {
      setFileIsUploaded(true);
    } else {
      setFileIsUploaded(false);
    }
    if (fileRejections.length !== 0) {
      setFileIsRejected(true);
    } else {
      setFileIsRejected(false);
    }
  }, [fileRejections, acceptedFiles]);

  // use effect to disable submission if there are some errrors

  useEffect(() => {
    if (fileIsUploaded && !formik.errors.userName) {
      setInitDisabledButton(false);
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [formik.errors.userName, fileIsUploaded]);

  return (
    <form className="w-[90%]" onSubmit={formik.handleSubmit}>
      {signUpCompleted && (
        <p className="text-xl mb-[2rem]">
          Your registration is completed. Thanks:). You will be redirected to
          login page soon...
        </p>
      )}
      <div>
        <input
          type="text"
          name="userName"
          placeholder="User name"
          className="px-[1rem] py-[1.5rem] text-2xl bg-black w-full  outline-none font-normal border-2 rounded-2xl"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          style={{
            borderColor:
              formik.touched.userName && formik.errors.userName
                ? "#e31414"
                : "rgb(55 65 81)",
          }}
        />
        {formik.touched.userName && formik.errors.userName && (
          <div className="mt-[1rem] text-lg">{formik.errors.userName}</div>
        )}
      </div>
      {/* DROP ZONE */}
      <div
        {...getRootProps({
          className:
            "mt-[2rem] h-[10rem] px-[1rem] py-[1.5rem] text-2xl bg-black w-full border-gray-700 outline-none font-normal border-2 rounded-2xl cursor-pointer",
        })}
      >
        {!isDragActive && !fileIsRejected && !fileIsUploaded && (
          <span className="text-gray-400">
            Click here or drop your profile image
          </span>
        )}
        <input
          name="profileImg"
          placeholder="Your photo"
          className=""
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          {...getInputProps()}
        />
        {isDragActive && <p className="text-gray-400">Drop image here</p>}
        {fileIsUploaded && (
          <p className="text-green-400">
            You successfully uploaded image {fileName}
          </p>
        )}
        {fileIsRejected && (
          <p className="text-pink-600">
            You can upload only 1 file of type "png", "jpeg" or "jpg"
          </p>
        )}
      </div>

      <div className="mt-[2rem]">
        <textarea
          name="bio"
          placeholder="Your bio"
          className="px-[1rem] py-[1.5rem] text-2xl bg-black w-full border-gray-700  outline-none font-normal border-2 rounded-2xl"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.bio && formik.errors.bio && (
          <div className="mt-[1rem] text-lg">{formik.errors.bio}</div>
        )}
      </div>
      <FormButton
        content="Save data"
        disabled={initDisabledButton || disableButton}
      />
    </form>
  );
}
