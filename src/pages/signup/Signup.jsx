import React, { useEffect, useState } from "react";
import Button from "../../Components/button/Button";
import InputFields from "../../Components/inputFields/InputFields";
import RadioButton from "../../Components/radioButton/RadioButton";
import "./Signup.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { database } from "../../firebase/Firebase";
import { ref, set } from "firebase/database";
import Menues from "../../Components/menu/Menu";

const Signup = () => {
  const InputSelect = [
    { Lable: "Fresher", Value: "fresher" },
    { Lable: "Junior", Value: "junior" },
    { Lable: "Senior", Value: "senior" },
  ];

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const auth = getAuth();
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [formData, setFormData] = useState({});

  const SigFrmInp = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));
  };

  const RadioBtn = (value) => {
    console.log(value);
    setValue(value);
    setDisabled(false);
    setFormData({ ...formData, role: value, approved: false });
  };

  const StudentHandler = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        //     // Signed in
        const uid = userCredential.user.uid;
        await set(ref(database, `Accounts/` + uid), {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          approved: formData.approved,
          uid: uid,
          experiance: value === "Company" ? "" : formData.experiance,
        })
          .then((res) => {
            console.log(res);
            alert("Success");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        console.log(errorMessage);
        const errorMessage = error.message;
        //   // ..
      });

    dispatch({ type: "accounts", payload: formData });

    console.log(formData);
  };

  return (
    <div className="main-div">
      <div className="form">
        <form className="CS_Form" onSubmit={StudentHandler}>
          <h3 className="head-1">CamPus App Form</h3>
          {value.toLowerCase() === "company" ? (
            <>
              <InputFields
                disabled={disabled}
                lable="Company Name"
                className={"input"}
                value={formData.name}
                onChange={(e) => SigFrmInp(e)}
                name="name"
              />
              <InputFields
                disabled={disabled}
                lable="Email Address"
                className={"input"}
                value={formData.email}
                onChange={(e) => SigFrmInp(e)}
                name="email"
              />
              <InputFields
                disabled={disabled}
                lable="Password"
                className={"input"}
                value={formData.password}
                onChange={(e) => SigFrmInp(e)}
                name="password"
              />
            </>
          ) : (
            <>
              <InputFields
                disabled={disabled}
                lable="Student  Name"
                className={"input"}
                value={formData.name}
                onChange={(e) => SigFrmInp(e)}
                name="name"
              />

              <InputFields
                disabled={disabled}
                lable="Email Address"
                className={"input"}
                value={formData.email}
                onChange={(e) => SigFrmInp(e)}
                name="email"
              />
              <InputFields
                disabled={disabled}
                lable="Password"
                className={"input"}
                value={formData.password}
                name="password"
                onChange={(e) => SigFrmInp(e)}
              />
              <Menues
                disabled={disabled}
                // className={"input"}
                onChange={(e) => SigFrmInp(e)}
                name="experiance"
                menuData={InputSelect}
                value="Experiance"
              />
            </>
          )}
          <>
            <p className="RadioH">Select</p>
            <div className="radioDiv">
              <RadioButton name="radio" value="Student" onClick={RadioBtn} />
              <RadioButton name="radio" value="Company" onClick={RadioBtn} />
            </div>
          </>
          <div className="form-btn">
            <Button value="Signup" type="submit" disabled={disabled} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
