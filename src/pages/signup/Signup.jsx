import React, { useState } from "react";
import RadioButton from "../../Components/radioButton/RadioButton";
import "./Signup.css";
import SchoolIcon from "@mui/icons-material/School";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { database } from "../../firebase/Firebase";
import { ref, set } from "firebase/database";
import Menues from "../../Components/menu/Menu";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputTextFields from "../../Components/inputTextFields/InputTextFields";
import Swal from "sweetalert2";
import LoadingButtons from "../../Components/loadingButton/LoadingButtons";

const InputSelect = [
  { Lable: "Fresher", Value: "fresher" },
  { Lable: "Junior", Value: "junior" },
  { Lable: "Senior", Value: "senior" },
];
const Signup = () => {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState();
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const signupHanlder = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userCredential) => {
        //     // Signed in
        const uid = userCredential.user.uid;
        setLoading(true);
        await set(ref(database, `Accounts/` + uid), {
          name: data.name,
          email: data.email,
          role: value,
          approved: false,
          block: true,
          uid: uid,
          experiance: value === "Company" ? "" : data.experiance,
        });

        if (uid) {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire("Sorry!", errorCode, "warning");
        setLoading(true)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        //   // ..
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      experiance: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Required")
        .max(30, "Email in Must be 40 characters or less")
        .required("Required"),
      password: Yup.string()
        .min(6, "Password in Must be 6 characters or less")
        .required("Required"),
      name: Yup.string()
        .max(20, "Name in Must be 20 characters or less")
        .required("Required"),
    }),

    onSubmit: signupHanlder,
  });
  const RadioBtn = (value) => {
    setValue(value);
    setDisabled(false);
  };

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
          <div className="under-head">
            <span>
              <ins>Register Form</ins>
            </span>
          </div>
          <InputTextFields
            Lable="Type Name"
            className={"input"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            name="name"
            variant="filled"
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}

          <InputTextFields
            variant="filled"
            Lable="Email Address"
            className={"input"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            name="email"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
          <InputTextFields
            variant="filled"
            Lable="Password"
            type="password"
            className={"input"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            name="password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}

          <div className="radio-main">
            <p className="RadioH">Select User Type?</p>
            <div className="radioDiv">
              <RadioButton name="radio" value="Student" onClick={RadioBtn} />
              <RadioButton name="radio" value="Company" onClick={RadioBtn} />
            </div>
          </div>

          {value === "Student" && (
            <div className="menuSection">
              <span id="menuHead">Select Your Experiance?</span>
              <Menues
                disabled={disabled}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values?.experiance}
                name="experiance"
                menuData={InputSelect}
                Lable="Experiance"
                variant="standard"
                size="small"
                id="menu"
              />
            </div>
          )}
          <div className="form-btn">
            <LoadingButtons 
              value="Signup"
              type="submit"
              disabled={
                !formik.values.name.trim() ||
                !formik.values.email.trim() ||
                !formik.values.password.trim() ||
                (value === "Student" && !formik?.values?.experiance) ||
                disabled
              }
              id={"btn-form"}
              variant="contained"
            />
         
          </div>
          <div>
            SignIn?
            <Link to="/" id="form_Link">
              page
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
