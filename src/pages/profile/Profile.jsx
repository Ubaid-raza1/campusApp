import React, { useEffect } from "react";
import avatar from "../../image/avatar2.jpg";
import loader from "../../image/ellipsis.gif";
import "./Profile.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
import { useState } from "react";
import { storage } from "../../firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database } from "../../firebase/Firebase";
import { ref as Ref, update } from "firebase/database";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Profile = () => {
  const [file, setFile] = React.useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [progresspercent, setProgresspercent] = useState(0);
  const state = useSelector((state) => state);
  const user = state?.user;

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
        setFile(false);
        setImageLoader(true);
      },
      (error) => {
        alert(error);
        setFile(false);
        setImageLoader(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          update(Ref(database, "Accounts/" + state?.uid), {
            fileUrl: downloadURL,
          });
          setImageLoader(false);
        });
      }
    );
    setFile(false);
    setImageLoader(false);
  };

  const Cancel = () => setFile(false);

  return (
    <div className="profilePage">
      {!!user?.block && !!user.approved ? (
        <div className="ubaid">
          <div className="profile-main">
            <form className="profile-form" onSubmit={submithandler}>
              <div className="profileHeader">
                <b>Profile</b>
              </div>
              <div className="avatar-img">
                <img
                  src={
                    imageLoader
                      ? loader
                      : user?.fileUrl
                      ? user?.fileUrl
                      : avatar
                  }
                  alt=""
                  id="avatar"
                  sx={{ fontSize: 50 }}
                />

                {!file ? (
                  <>
                    <label className="icon-avatar" for="file-input">
                      <CameraAltIcon
                        className="icon-camera"
                        sx={{ color: "white" }}
                        type="file"
                      />
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </>
                ) : (
                  <div className="icon-avatar">
                    <IconButton type="submit">
                      <DoneIcon sx={{ color: "white" }} />
                    </IconButton>
                    <IconButton onClick={Cancel}>
                      <CloseIcon sx={{ color: "white" }} />
                    </IconButton>
                  </div>
                )}
              </div>
            </form>
          </div>
          <div className="mainProfileData">
            <div className="profileHead">
              <b>Profile</b>
            </div>

            <div className="profile-data">
              <div className="profileData">
                <span className="profileIcon">
                  <PersonIcon />
                </span>
                <div className="profileIconText">
                  <b>Name:</b>
                </div>
                <div className="profileText">{user?.name}</div>
              </div>
              <div className="profileData">
                <span className="profileIcon">
                  <EmojiEmotionsIcon />
                </span>
                <div className="profileIconText">
                  <b>Category:</b>
                </div>
                <div className="profileText">{user?.role}</div>
              </div>
              {user?.role === "Student" && (
                <div className="profileData">
                  <span className="profileIcon">
                    <RecentActorsIcon />
                  </span>
                  <div className="profileIconText">
                    <b>Experiance:</b>
                  </div>
                  <div className="profileText">{user?.experiance}</div>
                </div>
              )}
              <div className="profileData">
                <span className="profileIcon">
                  <EmailIcon />
                </span>
                <div className="profileIconText">
                  <b>Email:</b>
                </div>
                <div className="profileText">{user?.email}</div>
              </div>
            </div>
          </div>
        </div>
      ) : !!user?.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">You are Block Please Contact Admin!</h1>
      )}
    </div>
  );
};

export default Profile;
