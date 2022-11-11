import React, { useState } from "react";
import InputFields from "../../Components/inputFields/InputFields";
import Button from "../../Components/button/Button";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const auth = getAuth();

  const StudentHandler = (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        // Signed in
        const userSig = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("catch", error);
        const errorMessage = error.message;
      });
  };

  return (
    <div className="main-div">
      <div className="form">
        <form className="CS_Form" onSubmit={StudentHandler}>
          <h3 className="head-1">CamPus App Form Login</h3>

          <InputFields
            lable="Email Address"
            className={"input"}
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />
          <InputFields
            lable="Password"
            className={"input"}
            value={formData.password}
            onChange={(e) =>
              setFormData({
                ...formData,
                password: e.target.value,
              })
            }
          />

          <div className="form-btn">
            <Button value="SignIn" type="submit" />
          </div>
          <div>
            <Link to="/signup">Do You Want To Create Account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
