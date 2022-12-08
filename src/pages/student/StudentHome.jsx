import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../../Components/card/Card";
import "./Student.css";
import noJob from "../../image/noJobs.webp";
import { ref, update } from "firebase/database";
import { database } from "../../firebase/Firebase";
import Swal from "sweetalert2";
import SimpleButton from "../../Components/button/Button";
import Modals from "../../Components/modal/Modals";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ExplicitIcon from "@mui/icons-material/Explicit";
import SchoolIcon from "@mui/icons-material/School";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const className = {
  modalMain: "mainModal",
};

const StudentHome = () => {
  const state = useSelector((state) => state);
  const student = Object.values(state?.companyJobPost);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState();

  const postJob = student.filter((ele) => {
    return ele.studentId ? !ele.studentId.includes(state.uid) : [];
  });

  const myData = postJob?.filter(
    (item) => item?.experiance == state?.user?.experiance
  );
  console.log(state);
  const apply = (id, data) => {
    const postListRef = ref(database, "CompanyPostJob/" + id);
    Swal.fire({
      title: "Are you sure you want to apply this Posted Job?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Sure",
      confirmButtonColor: "#1565c0",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Applied!",
          update(postListRef, {
            studentId: [state.uid, ...(data ? data : [])],
          }),
          "success"
        );
      }
    });
  };
  const Detail = (id) => {
    setOpen(true);
    const data = myData?.filter((item) => item?.id?.includes(id));
    setUserData(data);
  };
  const Cancel = () => setOpen(false);
  console.log("Loader=====>", state.loading);
  return (
    <>
    {state.loading?<>Loading.....</>:
    <div className="student-main">
      {!!state?.user?.block && !!state?.user?.approved ? (
        <>
          {!myData?.length ? (
            <div className="noJobSection">
              <h2 style={{ fontSize: "34px" }}>No Jobs!</h2>
              <img src={noJob} alt="noJob" className="NoJobImg" />
            </div>
          ) : (
            <div className="card">
              <Cards
                cardData={myData}
                apply={apply}
                SimpleButton={SimpleButton}
                Detail={Detail}
              />
            </div>
          )}
        </>
      ) : !!state?.user?.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">You are Block Please Contact Admin!</h1>
      )}
      <Modals
        open={open}
        data={userData}
        Cancel={Cancel}
        SimpleButton={SimpleButton}
        className={className}
        CloseIcon={CloseIcon}
        PersonIcon={PersonIcon}
        WorkIcon={WorkIcon}
        LocationOnIcon={LocationOnIcon}
        ExplicitIcon={ExplicitIcon}
        SchoolIcon={SchoolIcon}
      />
    </div>
    }
    </>
  );
};

export default StudentHome;
