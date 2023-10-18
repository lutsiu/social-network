import { useEffect, useState } from "react";
import FormButton from "../../Buttons/FormButton";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
interface Props {
  changeStep: () => void;
  setUserId: (userId: string) => void;
}

export default function SignupForm(props: Props) {
  const [initDisabled, setInitDisabled] = useState(true);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, `Name must contain at least 2 characters`)
      .max(40, `That is too long. 40 characters is maximum`)
      .required("Required field"),
    email: Yup.string()
      .email("Enter valid email address")
      .required("Required field"),
    password: Yup.string()
      .min(
        8,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long"
      )
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long"
      )
      .required("Required field"),
    confirmedPassword: 
      Yup.string().oneOf([Yup.ref('password')], "Passwords don't match")
      .required("Required field"),
  });

  const onSubmit = async function (
    values: {
      name: string;
      email: string;
      password: string;
      confirmedPassword: string
    },
    formikHelpers: FormikHelpers<{
      name: string;
      email: string;
      password: string;
      confirmedPassword: string
    }>
  ) {
    try {
      const { name, email, password } = values;

      const body = JSON.stringify({ name, email, password });
      const res = await fetch("http://localhost:3000/auth/signup/step-1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });

      const { status } = res;

 

      if (status === 200) {
        const {userId} = await res.json() as {userId: string};
        props.setUserId(userId);
        formikHelpers.resetForm();
        props.changeStep();
      } else {
        const { message } = (await res.json()) as { message: string };
        formik.setErrors({ email: message });
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  // turn off the initial disability of button if one of inputs is touched

  useEffect(() => {
    if (Object.keys(formik.touched).length !== 0) {
      setInitDisabled(false);
    }
  }, [formik.touched]);

  return (
    <form method="POST" className="w-[90%]" onSubmit={formik.handleSubmit}>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="px-[1rem] py-[1.5rem] text-2xl bg-black w-full  outline-none font-normal border-2 rounded-2xl"
          style={{
            borderColor:
              formik.touched.name && formik.errors.name
                ? "#e31414"
                : "rgb(55 65 81)",
          }}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="mt-[1rem] text-lg">{formik.errors.name}</div>
        )}
      </div>
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
      <div className="mt-[2rem]">
        <input
          type="password"
          name="confirmedPassword"
          placeholder="Confirm password"
          value={formik.values.confirmedPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="px-[1rem] py-[1.5rem] text-2xl bg-black w-full  outline-none font-normal border-2 rounded-2xl"
          style={{
            borderColor:
              formik.errors.confirmedPassword && formik.touched.confirmedPassword
                ? "#e31414"
                : "rgb(55 65 81)",
          }}
        />
        {formik.touched.confirmedPassword && formik.errors.confirmedPassword && (
          <div className="mt-[1rem] text-lg">{formik.errors.confirmedPassword}</div>
        )}
      </div>
      <FormButton
        content="Create account"
        disabled={initDisabled || Object.keys(formik.errors).length > 0}
      />
    </form>
  );
}
