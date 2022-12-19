import React from "react";
const ProfileDetail = ({proDetai,value}) => {
  return (
    <div className="profileData">
      <div className="profileIconText">
        <b>{value}:</b>
      </div>
      <div className="profileText">{proDetai}</div>
    </div>
  );
};

export default ProfileDetail;
