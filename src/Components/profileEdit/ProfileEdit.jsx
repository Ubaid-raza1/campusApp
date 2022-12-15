import React from "react";

const ProfileEdit = ({ value, profileForm }) => {
  return (
    <div className="profile">
      <div className="profileEditText">{value}:</div>
      <div className="profileEditInput">{profileForm}</div>
    </div>
  );
};

export default ProfileEdit;
