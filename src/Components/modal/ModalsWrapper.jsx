import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Modals.css";
import CloseBtnText from "../closeBtnText/CloseBtnText";

const ModalWrapper = ({
  open,
  Cancel,
  className,
  title,
  children
}) => {
  
  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ minHeight: "500px" }}
      >
        <Box className={className?.modalMain}>
          <CloseBtnText value={title} cancel={Cancel} />
          {children}
        </Box>
      </Modal>
    </>
  );
};

export default ModalWrapper;
