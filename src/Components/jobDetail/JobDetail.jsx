import React from "react";

const JobDetail = ({ value, Icon, jobDetail }) => {
  return (
    <div className="underText">
      <span className="underIcon">
        <Icon />
      </span>
      <div className="underTowText">
        <div className="underIcon">
          <b>{value}:</b>
        </div>
        <div>{jobDetail}</div>
      </div>
    </div>
  );
};

export default JobDetail;
