import { useEffect, useState } from "react";
import FormButton from "../../Buttons/FormButton";
import {useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { setLogin } from "../../../state/auth";
import { UserType } from "../../../interfaces/models";
export default function LoginForm() {
  const [initDisabledButton, setInitDisabledButton] = useState(true);
  const [invalidPassword, setInvalidPassword] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter valid email address")
      .required("Required field"),
    password: Yup.string()
      .required("Required field")
      .min(8, "Password contains at least 8 characters"),
  });

  const onSubmit = async function (values: {
    email: string;
    password: string;
  }) {
    const { email, password } = values;
    const body = JSON.stringify({ email, password });

    const res = await fetch(`http://localhost:3000/auth/login`, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
    });

    const {status} = res;

    if (status === 404) {
      const {message} = await res.json() as {message: string};
      formik.setFieldError('email', message)
    }
    if (status === 401) {
      const {message} = await res.json() as {message: string};
      setInvalidPassword(prevValue => prevValue +1);
      formik.setFieldError('password', message)

    }
    if (status === 200) {
      const {user, token} = await res.json() as {user: UserType, token: string}
      console.log(token);
      dispatch(setLogin({token, user}))
      navigate(`/home`);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });



 

  useEffect(() => {
    if (Object.keys(formik.touched).length !== 0) {
      setInitDisabledButton(false);
    }
  }, [formik.touched])

  return (
    <form className="w-[90%]" onSubmit={formik.handleSubmit}>
      <div className="mt-[2rem]">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="px-[1rem] py-[1.5rem] text-2xl bg-black w-full outline-none font-normal border-2 rounded-2xl"
          style={{
            borderColor:
              formik.errors.email && formik.touched.email
                ? "#e31414"
                : "rgb(55, 65, 81)",
          }}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="mt-[1rem] text-lg">{formik.errors.email}</div>
        )}
      </div>
      <div className="mt-[2rem]">
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="px-[1rem] py-[1.5rem] text-2xl bg-black w-full  outline-none font-normal border-2 rounded-2xl"
          style={{
            borderColor:
              formik.errors.password && formik.touched.password
                ? "#e31414"
                : "rgb(55 65 81)",
          }}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="mt-[1rem] text-lg">{formik.errors.password}</div>
        )}
      </div>
        <FormButton content="Login" disabled={initDisabledButton || Object.keys(formik.errors).length > 0} />
          {invalidPassword === 3 && <p className="text-center mt-[2rem] text-xl" onClick={() => navigate('/restore-password')}>Forget password? Click here</p>}
    </form>
  );
}
