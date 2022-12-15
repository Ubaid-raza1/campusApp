import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const CloseBtnText = ({ value, cancel }) => {
  
  return (
    <div className="closeBtn">
      <div className="modalheader">{value}</div>
      <div>
        <CloseIcon onClick={cancel} />
      </div>
    </div>
  );
};

export default CloseBtnText;
