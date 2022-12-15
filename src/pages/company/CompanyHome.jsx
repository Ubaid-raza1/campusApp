import React, { useState } from "react";
import { useSelector } from "react-redux";
import AppsSharpIcon from "@mui/icons-material/AppsSharp";
import MuiTable from "../../Components/muitable/MuiTable";
import notAvailable from "../../image/notAvailable.jpg";
import TableModal from "../../Components/modal/TableModal";

const className = {
  modalMain: "CompanyModal",
};

const CompanyHome = () => {
  const [user, setUser] = useState();

  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);

  const companyApplied = Object.values(state?.companyJobPost);

  const postJob = companyApplied.filter((ele) => {
    return ele?.companyId === state?.uid && ele?.studentId;
  });

  const array = Object.values(state?.accounts)

  const Check = (arr) => {
    setOpen(true);
    const check = array?.filter((ele, i) => arr?.includes(ele?.uid));
    setUser(check);
  };

  const Cancel = () => setOpen(false);

  return (
    <div>
      {!!state?.user?.block && !!state?.user?.approved ? (
        postJob?.length === 0 ? (
          <div className="notAvailable">
            <span style={{ fontSize: "30px" }}>Student Applieds Job</span>
            <img src={notAvailable} alt="" />
          </div>
        ) : (
          <MuiTable
            data={postJob}
            AppsSharpIcon={AppsSharpIcon}
            Check={Check}
          />
        )
      ) : !!state?.user?.block ? (
        <h1 id="approved">Your Request is panding Please Contact Admin!</h1>
      ) : (
        <h1 id="approved">You are Block Please Contact Admin!</h1>
      )}
      <TableModal
        open={open}
        Cancel={Cancel}
        users={user}
        className={className}
        title="Student Applied Check"
      />
    </div>
  );
};

export default CompanyHome;
