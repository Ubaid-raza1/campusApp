import React, { useState } from "react";
import InputTextFields from "../../Components/inputTextFields/InputTextFields";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import SchoolIcon from "@mui/icons-material/School";
import Swal from "sweetalert2";
import LoadingButtons from "../../Components/loadingButton/LoadingButtons";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const [loading, setLoading] = useState(false);

  const signupHanlder = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in

        const userSig = userCredential.user;
        if (userSig.uid) setLoading(true);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        Swal.fire("Sorry!", errorCode, "warning");
        setLoading(false);
      });
    setLoading(true);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Required")
        .max(30, "Must be 30 Characters or Less"),
      password: Yup.string()
        .required("Required")
        .matches(/^\S/, "Not Allowed White Space Please Type Characters")
        .min(6, "Password in Must be 6 Characters or Grether"),
    }),

    onSubmit: signupHanlder,
  });
  return (
    <div className="main-div">
      <div className="form">
        <form className="CS_Form" onSubmit={formik.handleSubmit}>
          <div className="main-icon">
            <SchoolIcon
              style={{
                fontSize: "50px",
                color: "#1565c0",
                marginRight: "10px",
              }}
            />
            <span style={{ fontSize: "20px" }}>Campus App</span>
          </div>
          <InputTextFields
            variant="filled"
            Lable="Email Address"
            className={"input"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
            type="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <InputTextFields
            variant="filled"
            Lable="Password"
            className={"input"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <div className="form-btn">
            <LoadingButtons
              loading={loading}
              type="submit"
              id={"btn-form"}
              variant="contained"
              value="SignIn"
              disabled={
                !formik.values.email.trim() || !formik.values.password.trim()
              }
            />
          </div>
          <div>
            Do You Want To Create Account?
            <Link to="/signup" id="form_Link">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
