import React from "react";
import DesTable from "../desTable/DesTable";
import ModalWrapper from "./ModalsWrapper";

const TableModal = ({ users, title, open, Cancel, className }) => {
  return (
    <ModalWrapper
      title={title}
      open={open}
      Cancel={Cancel}
      className={className}
    >
      <DesTable user={users} />
    </ModalWrapper>
  );
};

export default TableModal;
