import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExplicitIcon from "@mui/icons-material/Explicit";
import SchoolIcon from "@mui/icons-material/School";
import JobDetail from "../jobDetail/JobDetail";
import ModalWrapper from "./ModalsWrapper";

const DetailsModal = ({ studentData, open, Cancel, title, className }) => {
  return (
    <ModalWrapper
      title={title}
      open={open}
      Cancel={Cancel}
      className={className}
    >
      {studentData?.map((item) => {
        return (
          <div className="jobDetail">
            <JobDetail
              Icon={PersonIcon}
              value="Company Name"
              jobDetail={item?.companyName}
            />
            <JobDetail
              Icon={WorkIcon}
              value="Job Category"
              jobDetail={item?.jobCategory}
            />
            <JobDetail
              Icon={ExplicitIcon}
              value="Required Experiance"
              jobDetail={item?.experiance}
            />
            <JobDetail
              Icon={SchoolIcon}
              value="Required Education"
              jobDetail={item?.education}
            />
            <JobDetail
              Icon={LocationOnIcon}
              value="Address"
              jobDetail={item?.address}
            />
          </div>
        );
      })}
    </ModalWrapper>
  );
};

export default DetailsModal;
