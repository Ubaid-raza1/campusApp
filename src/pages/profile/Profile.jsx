import React, { useState } from "react";
import avatar from "../../image/avatar2.jpg";
import loader from "../../image/ellipsis.gif";
import "./Profile.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useSelector } from "react-redux";
import { storage } from "../../firebaseConfig/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { database } from "../../firebaseConfig/Firebase";
import { ref as Ref, update } from "firebase/database";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SimpleButton from "../../Components/button/Button";
import ProfileModal from "../../Components/modal/ProfleModal";
import InputTextFields from "../../Components/inputTextFields/InputTextFields";
import Menu from "../../Components/menu/Menu";
import Swal from "sweetalert2";
import ProfileDetail from "../../Components/profileDetail/ProfileDetail";

const className = {
  modalMain: "profileMain",
};
const Profile = () => {
  const [open, setOpen] = React.useState(false);
  const [imagePreview, setImagePreview] = React.useState(false);
  const [imageLoader, setImageLoader] = useState(false);
  const [imageFile, setUploadImage] = useState(false);
  const state = useSelector((state) => state);
  const user = state?.user;

  const refrence = Ref(database, "Accounts/" + state?.uid);

  const fileUploaderHandler = (e) => {
    const file = e.target.files[0];
    if (file?.type?.startsWith("image")) {
      setImagePreview(e.target.files[0]);
      setUploadImage(URL.createObjectURL(e.target.files[0]));
    } else {
      Swal.fire("Sorry!", "Please Select Image", "warning");
    }
  };

  const profile = imagePreview
    ? imageFile
    : imageLoader
    ? loader
    : user?.fileUrl
    ? user?.fileUrl
    : avatar;

  const submithandler = (event) => {
    event.preventDefault();

    const storageRef = ref(storage, `images/${state?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, imagePreview);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (snapshot) {
          setImagePreview(false);
          setImageLoader(true);
        }
      },
      (error) => {
        alert(error);
        setImagePreview(false);
        setImageLoader(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          update(refrence, {
            fileUrl: downloadURL,
          });
          setImageLoader(false);
        });
      }
    );
    setImagePreview(false);
    setImageLoader(false);
  };

  const Cancel = () => setImagePreview(false);
  const Edit = () => setOpen(true);
  const cancel = () => setOpen(false);
  const profileEditHandler = (data) => {
    update(refrence, {
      name: data?.name,
      experiance: data?.experiance,
    });
    setOpen(false);
  };
  return (
    <div
      className="profilePage"
      style={{ display: !!user?.block && !!user?.approved ? "flex" : "block" }}
    >
      {!!user?.block && !!user.approved ? (
        <>
          <div className="ubaid">
            <div className="profileHeader">
              <b>Profile</b>
            </div>
            <div className="profile-main">
              <form className="profile-form" onSubmit={submithandler}>
                <div className="avatar-img">
                  <img
                    src={profile}
                    alt="profile"
                    id="avatar"
                    sx={{ fontSize: 50 }}
                  />

                  {!imagePreview ? (
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
                        onChange={fileUploaderHandler}
                        accept="image/*"
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
              <div className="profile-data">
                <ProfileDetail value="Name" proDetai={user?.name} />
                <ProfileDetail value="Category" proDetai={user?.role} />

                {user?.role === "Student" && (
                  <ProfileDetail
                    value="Experiance"
                    proDetai={user?.experiance}
                  />
                )}
                <ProfileDetail value="Email" proDetai={user?.email} />
              </div>
              <div className="edit">
                <SimpleButton
                  startIcon={<EditIcon />}
                  value="Profile Edit"
                  color="success"
                  Variant="outlined"
                  onClick={Edit}
                />
              </div>
              <ProfileModal
                open={open}
                profile={user}
                Cancel={cancel}
                Input={InputTextFields}
                Menu={Menu}
                profileEditHandler={profileEditHandler}
                SimpleButton={SimpleButton}
                title="Profile Edit"
                className={className}
              />
            </div>
          </div>
        </>
      ) : !!user?.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">You are Block Please Contact Admin!</h1>
      )}
    </div>
  );
};

export default Profile;
