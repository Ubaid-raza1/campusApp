import React, { useState } from "react";
import { useSelector } from "react-redux";
import Cards from "../../Components/card/Card";
import "./Student.css";
import noJob from "../../image/noJobs.webp";
import { ref, update } from "firebase/database";
import { database } from "../../firebaseConfig/Firebase";
import Swal from "sweetalert2";
import Loader from "../../Components/loader/Loader";

import DetailsModal from "../../Components/modal/DetailsModal";

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
    (item) => item?.experiance === state?.user?.experiance
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
    const data = myData?.filter((item) => item?.id?.includes(id));
    setOpen(true);
    setUserData(data);
  };
  const Cancel = () => setOpen(false);

  return (
    <div className="student-main">
      {state.user.uid ? (
        !!state?.user?.block && !!state?.user?.approved ? (
          <>
            {!myData?.length ? (
              state?.jobPostLoading && state?.user?.uid? (
                <Loader />
              ) : (
                <div className="noJobSection">
                  <h2 style={{ fontSize: "34px" }}>No Jobs!</h2>
                  <img src={noJob} alt="noJob" className="NoJobImg" />
                </div>
              )
            ) : (
              <div className="card">
                <Cards cardData={myData} apply={apply} Detail={Detail} />
              </div>
            )}
          </>
        ) : !!state?.user?.block ? (
          <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
        ) : (
          <h1 id="approved">You are Block Please Contact Admin!</h1>
        )
      ) : (
        <Loader />
      )}
      <DetailsModal
        open={open}
        studentData={userData}
        Cancel={Cancel}
        className={className}
        title="Job Detail"
      />
    </div>
  );
};

export default StudentHome;
