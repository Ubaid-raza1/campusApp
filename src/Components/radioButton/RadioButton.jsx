import { color } from "@mui/system";
import React from "react";

const RadioButton = ({ name, value, onClick }) => {
  return (
    <div
      className="SRadio"
      style={{
        display: "flex",
        fontSize: "16px",
        margin: "4px 0px",
        alignItems: "center",
      }}
    >
      <input
        type="radio"
        name={name}
        onClick={() => onClick(value)}
        style={{
          marginRight: "6px",
          height: "18px",
          width: "18px",
        }}
      />
      {value}
    </div>
  );
};

export default RadioButton;
