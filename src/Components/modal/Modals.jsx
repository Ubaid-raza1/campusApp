import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Modals = ({
  onChange,
  open,
  update,
  cancel,
  InputTextFields,
  Menues,
  SimpleButton,
  Cancel,
  DesTable,
  user,
}) => {
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

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {InputTextFields ? (
            <>
              <InputTextFields
                className={"menu"}
                onChange={onChange}
                name="jobCateogeory"
                Lable="Job Cateogeory"
                size="small"
              />

              <Menues
                value="Education"
                menuData={InputSelect2}
                onChange={onChange}
                name="education"
              />
              <Menues
                value="Experiance"
                menuData={InputSelect}
                onChange={onChange}
                name="experiance"
              />
              <div className="modal-btn">
                <SimpleButton value="Update" color="success" onClick={update} />
                <SimpleButton value="Cancel" color="error" onClick={cancel} />
              </div>
            </>
          ) : (
            <>
               <DesTable user={user} /> 
              <SimpleButton onClick={Cancel} value="Cancel" color="error" />
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Modals;
