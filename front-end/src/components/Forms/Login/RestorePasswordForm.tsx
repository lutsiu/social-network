import FormButton from "../../Buttons/FormButton";
import {useState} from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
export default function RestorePassword() {

  const [emailIsSent, setEmailIsSent] = useState(false);

  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
  });

  const onSubmit = async function (values: { email: string }) {
    try {
      
      const { email } = values;

      const body = JSON.stringify({ email });
      const res = await fetch("http://localhost:3000/auth/restore-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const {status} = res;

      if (status === 404 || status === 409) {
        const {message} = await res.json() as {message: string};
        formik.setFieldError('email', message);
      }

      if (status === 204) {
        setEmailIsSent(true);
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

  return (
    <form className="w-[90%]" onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="px-[1rem] py-[1.5rem] text-2xl bg-black w-full  outline-none font-normal border-2 rounded-2xl"
          style={{
            borderColor:
              formik.touched.email && formik.errors.email
                ? "#e31414"
                : "rgb(55 65 81)",
          }}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="mt-[1rem] text-lg">{formik.errors.email}</div>
        )}
      </div>
      {emailIsSent && <p className="text-center mt-[2rem] text-xl">Check your email, we sent you further instructions</p>}
      <FormButton disabled={false} content="Confirm code" />
    </form>
  );
}
