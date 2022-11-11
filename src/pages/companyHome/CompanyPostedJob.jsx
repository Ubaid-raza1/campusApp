import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modals from "../../Components/modal/Modals";
import Navbar from "../../Components/navbar/Navbar";
import Table from "../../Components/table/Table";
import { ref, update, remove } from "firebase/database";
import { database } from "../../firebase/Firebase";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import InputTextFields from "../../Components/inputTextFields/InputTextFields";
import Menues from "../../Components/menu/Menu";
import SimpleButton from "../../Components/button/Button";

const CompanyPostedJob = () => {
  const state = useSelector((state) => state);

  const [open, setOpen] = React.useState(false);
  const [id, setId] = React.useState();
  const [modalData, setModalData] = useState({});

  const company = [{ name: "Company", url: "Back", link: "/" }];

  const data = Object.entries(state?.companyJobPost);
  const companyUpdate = data
    ?.map((ele) => ele?.splice(1, 2))
    .flatMap((ele) => ele);

  const postJob = companyUpdate.filter((ele) => {
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
      <Navbar data={company} />
      <Table
        data={postJob}
        Delete={Delete}
        Edit={Edit}
        Cancel={Cancel}
        IconButton={IconButton}
        DeleteIcon={DeleteIcon}
        BorderColorIcon={BorderColorIcon}
      />
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
