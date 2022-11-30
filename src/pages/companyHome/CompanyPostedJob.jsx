import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modals from "../../Components/modal/Modals";
import { ref, update, remove } from "firebase/database";
import { database } from "../../firebase/Firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import InputTextFields from "../../Components/inputTextFields/InputTextFields";
import Menues from "../../Components/menu/Menu";
import SimpleButton from "../../Components/button/Button";
import MuiTable from "../../Components/muitable/MuiTable";

const className = {
  table_main: "table-main",
  table: "table",
  table_th: "table-th",
  table_td: "table-td",
};
const table_header = [
  "No",
  "Company",
  "Job Cateogeory",
  "Education",
  "Experiance",
];

const CompanyPostedJob = () => {
  const state = useSelector((state) => state);

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const [modalData, setModalData] = useState({});

  const company = [{ name: "Company", url: "Back", link: "/" }];

  const companyPostedJob = Object.values(state?.companyJobPost);

  const postJob = companyPostedJob.filter((ele) => {
    return ele.companyId === state.uid;
  });

  const UpdateData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setModalData((values) => ({ ...values, [name]: value }));
  };

  const Edit = (data, id) => {
    setOpen(true);
    setId(id);
  };

  const Update = () => {
    const postListRef = ref(database, "CompanyPostJob/" + id);

    update(postListRef, {
      jobCateogeory: modalData.jobCateogeory,
      experiance: modalData.experiance,
      education: modalData.education,
    });
    setOpen(false);
  };

  const Delete = (delId) => {
    remove(ref(database, "CompanyPostJob/" + delId));
  };
  const Cancel = () => setOpen(false);

  return (
    <div>
      {!!state.user.block && !!state.user.approved ? (
        <MuiTable data={postJob} Delete={Delete} DeleteIcon={DeleteIcon} />
      ) : !!state?.user.block ? (
        <h1 id="approved">Sorry!</h1>
      ) : (
        <h1 id="approved">block!</h1>
      )}
      <Modals
        open={open}
        onChange={(e) => UpdateData(e)}
        update={Update}
        cancel={Cancel}
        InputTextFields={InputTextFields}
        Menues={Menues}
        SimpleButton={SimpleButton}
      />
    </div>
  );
};

export default CompanyPostedJob;
