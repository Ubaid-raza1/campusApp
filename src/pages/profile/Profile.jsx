import React, { useEffect } from "react";
import avatar from "../../image/avatar2.jpg";
import "./Profile.css";
// import { useDispatch } from "react-redux";
import SimpleButton from "../../Components/button/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
import { useState } from "react";
import { storage } from "../../firebase/Firebase";
import {
  ref,
  uploadBytesResumable,
  list,
  getDownloadURL,
} from "firebase/storage";
import { database } from "../../firebase/Firebase";
import { ref as Ref, update } from "firebase/database";

const Profile = () => {
  const [file, setFile] = React.useState("");
  const [imgList, setImgList] = React.useState([]);
  const [progresspercent, setProgresspercent] = useState(0);
  // const dispatch = useDispatch();

  const state = useSelector((state) => state);
  const user = state?.user;

  const fileGet = (e) => {
    setFile(...file, e.target.files[0]);
  };

  const submithandler = (event) => {
    event.preventDefault();

    if (!file) {
      alert("Please choose a file first!");
    }

    const storageRef = ref(storage, `images/${state?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          update(Ref(database, "Accounts/" + state?.uid), {
            fileUrl: downloadURL,
          });
        });
      }
    );
  };

  return (
    <>
      <div className="profile-main">
        <form className="profile-form" onSubmit={submithandler}>
          <div className="avatar-img">
            <img
              src={user?.fileUrl ? user?.fileUrl : avatar}
              alt=""
              id="avatar"
              sx={{ fontSize: 50 }}
            />

            <label className="icon-avatar" for="file-input">
              <CameraAltIcon
                className="icon-camera"
                sx={{ color: "white" }}
                type="file"
              />
            </label>
            <input id="file-input" type="file" onChange={fileGet} />
          </div>
          <div className="profile-data">
            <h3>{user?.name}</h3>
            <h3>{user?.email}</h3>
            <h3>{user?.role}</h3>
            <h3>{user?.experiance}</h3>
          </div>
          <button type="submit">upload</button>
        </form>
      </div>
    </>
  );
};

export default Profile;
