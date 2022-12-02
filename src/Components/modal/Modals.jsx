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
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Modals = ({ open, SimpleButton, Cancel, DesTable, user, data }) => {
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {data ? (
            <div>
              <SimpleButton onClick={Cancel} value="X" color="error" />
              {data?.map((item) => {
                return (
                  <div>
                    <div>
                      <span>
                        <b>Company Name:</b>{" "}
                      </span>
                      <span>{item.companyName}</span>
                    </div>
                    <div>
                      <span>
                        <b>Job Category:</b>{" "}
                      </span>
                      <span>{item.jobCategory}</span>
                    </div>
                    <div>
                      <span>
                        <b>Required Education:</b>{" "}
                      </span>
                      <span>{item.education}</span>
                    </div>
                    <div>
                      <span>
                        <b>Required Experiance:</b>{" "}
                      </span>
                      <span>{item.experiance}</span>
                    </div>
                    <div>
                      <span>
                        <b>Address:</b>{" "}
                      </span>
                      <span>{item.address}</span>
                    </div>
                  </div>
                );
              })}
            </div>
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
