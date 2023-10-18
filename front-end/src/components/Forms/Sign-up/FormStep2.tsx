import { FormEvent, useEffect, useState } from "react";
import FormButton from "../../Buttons/FormButton";
import { useFormik } from "formik";
import * as Yup from "yup";
interface Props {
  changeStep: () => void;
  userId: string;
}

export default function SubmitEmailForm(props: Props) {
  const [initDisabled, setInitDisabled] = useState(true);
  const [errorClick, setErrorClick] = useState(0);
  const [sendCodeAgain, setSendCodeAgain] = useState(false);
  const [showThatCodeWasResend, setShowThatCodeWasResend] = useState(false);
  const [showThatEmailIsVerified, setShowThatEmailIsVerified] = useState(false);
  const { userId } = props;

  // FORMIK DATA
  const initialValues = {
    confirmationCode: "",
  };
  const validationSchema = Yup.object({
    confirmationCode: Yup.string()
      .length(6, "Code is 6 characters long")
      .required("Required field"),
  });

  const onSubmit = async function (values: { confirmationCode: string }) {
    try {
      const body = JSON.stringify({
        confirmationCode: +values.confirmationCode,
        userId,
      });

      const res = await fetch("http://localhost:3000/auth/signup/step-2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const { status } = res;

      if (status === 400) {
        setErrorClick((prevValue) => prevValue + 1);
        const { message } = (await res.json()) as { message: string };
        formik.setErrors({ confirmationCode: message });
      }
      if (status === 200) {
        setShowThatEmailIsVerified(true);
        setTimeout(() => {
          props.changeStep();
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // RESEND CODE, IF USER ENTERED WRONG CODE 3 TIMES
  const handleSendCodeAgain = async function (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    console.log("click");
    e.preventDefault();
    try {
      const body = JSON.stringify({ userId });
      const res = await fetch("http://localhost:3000/auth/signup/resend-code", {
        method: "PATCH",
        body,
        headers: { "Content-Type": "application/json" },
      });

      if (res.status === 204) {
        setErrorClick(0);
        setSendCodeAgain(false);
        setShowThatCodeWasResend(true);
        setTimeout(() => {
          setShowThatCodeWasResend(false);
        }, 3000);
      }
      if (res.status === 400) {
        const { message } = (await res.json()) as { message: string };
        formik.setErrors({ confirmationCode: message });
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(showThatEmailIsVerified);

  // function to check whether input is 6 characters long, and if it is, button disability is turned off
  useEffect(() => {
    if (formik.values.confirmationCode.trim().length === 6) {
      setInitDisabled(false);
    }
  }, [formik.values.confirmationCode]);

  // function to delete data from DB if user close window or reloads page
  useEffect(() => {
    if (showThatEmailIsVerified) {
      return;
    }
    const deleteUserData = async function (
      e: BeforeUnloadEvent
    ): Promise<void> {
      e.preventDefault();
      e.returnValue = "";
      try {
        await fetch(`http://localhost:3000/auth/signup/delete-data/${userId}`, {
          method: "DELETE",
        });
      } catch (err) {
        ("");
      }
    };
    if (!showThatEmailIsVerified) {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      window.addEventListener("beforeunload", deleteUserData);
    }
    
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      window.removeEventListener("beforeunload", deleteUserData);
    };
  }, [userId, showThatEmailIsVerified]);

  // show form to send code again if user reached errors limit
  useEffect(() => {
    if (errorClick === 3) {
      setSendCodeAgain(true);
    }
  }, [errorClick]);

  return (
    <>
      <form method="POST" className="w-[90%]" onSubmit={formik.handleSubmit}>
        <div>
          <input
            type="text"
            name="confirmationCode"
            placeholder="Confirm code"
            value={formik.values.confirmationCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="px-[1rem] py-[1.5rem] text-2xl bg-black w-full  outline-none font-normal border-2 rounded-2xl"
            style={{
              borderColor:
                formik.touched.confirmationCode &&
                formik.errors.confirmationCode
                  ? "#e31414"
                  : "rgb(55 65 81)",
            }}
          />
          {formik.touched.confirmationCode &&
            formik.errors.confirmationCode && (
              <div className="mt-[1rem] text-lg">
                {formik.errors.confirmationCode}
              </div>
            )}
        </div>
        {showThatCodeWasResend && (
          <p className="mt-[1.5rem] text-xl ">
            We send your code again on your email
          </p>
        )}
        {showThatEmailIsVerified && (
          <p className="mt-[1.5rem] text-xl ">
            Your email is verified! You will be redirected soon...
          </p>
        )}
        <FormButton
          disabled={
            initDisabled ||
            formik.values.confirmationCode.trim().length !== 6 ||
            sendCodeAgain
          }
          content="Confirm code"
        />
      </form>
      {sendCodeAgain && (
        <form
          method="PATCH"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSendCodeAgain}
          className="mt-[2rem] text-xl"
        >
          <button type="submit" className=" text-emerald-500 font-bold">
            Click here in order to send code again
          </button>
        </form>
      )}
    </>
  );
}
