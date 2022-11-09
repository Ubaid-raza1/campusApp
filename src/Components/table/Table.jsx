import React, { useState } from "react";
import "./Table.css";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SimpleButton from "../button/Button";
import Menues from "../menu/Menu";
import { ref, update, remove } from "firebase/database";
import { useSelector } from "react-redux";
import { database } from "../../firebase/Firebase";
import InputFields from "../inputFields/InputFields";
import InputTextFields from "../inputTextFields/InputTextFields";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Table = ({ data, arr }) => {
  const state = useSelector((state) => state);

  const InputSelect = [
    { Lable: "Fresher", Value: "fresher" },
    { Lable: "Junior", Value: "junior" },
    { Lable: "Senior", Value: "senior" },
  ];
  const InputSelect2 = [
    { Lable: "Matric", Value: "matric" },
    { Lable: "Intermediat", Value: "intermediat" },
    { Lable: "Graduation", Value: "graduation" },
    { Lable: "Masters", Value: "masters" },
  ];
  
  
  const [open, setOpen] = React.useState(false);
  const [id, setId] = useState();
  const [modalData, setModalData] = useState({});

  const Cancel = () => setOpen(false);


  const UpdateData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setModalData((values) => ({ ...values, [name]: value }));
  };

  const Delete = (delId) => {
    remove(ref(database, "CompanyPostJob/" + delId));
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

  return (
    <div className="table-main">
      <table className="table">
        <thead>
          <tr>
            <th id="table-th">No</th>
            <th id="table-th">Job Cateogeory</th>
            <th id="table-th">Education</th>
            <th id="table-th">Experiance</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((ele,i) => {
            return (
              <>
                <tr>
                  <td id="table-td">{i + 1}</td>
                  <td id="table-td">{ele.jobCateogeory}</td>
                  <td id="table-td">{ele.education}</td>
                  <td id="table-td">{ele.experiance}</td>
                  <td>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => Delete(ele.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                  <td>
                    <IconButton
                      aria-label="delete"
                      color="success"
                      onClick={() => Edit(ele, ele.id)}
                    >
                      <BorderColorIcon />
                    </IconButton>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <InputTextFields
            className={"menu"}
            onChange={(e) => UpdateData(e)}
            name="jobCateogeory"
            Lable="Job Cateogeory"
            size="small"
          />

          <Menues
            value="Education"
            menuData={InputSelect2}
            onChange={(e) => UpdateData(e)}
            name="education"
          />
          <Menues
            value="Experiance"
            menuData={InputSelect}
            onChange={(e) => UpdateData(e)}
            name="experiance"
          />
          <div className="modal-btn">
            <SimpleButton value="Update" color="success" onClick={Update} />
            <SimpleButton value="Cancel" color="error" onClick={Cancel} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Table;
