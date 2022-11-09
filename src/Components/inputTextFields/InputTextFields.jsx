import React from "react";
import TextField from "@mui/material/TextField";
import "../menu/Menu.css";

const InputTextFields = ({ name, onChange, className, Lable, size }) => {
  return (
    <div className="menu-main">
      <TextField
        name={name}
        onChange={onChange}
        className={className}
        label={Lable}
        size={size}
      />
    </div>
  );
};

export default InputTextFields;
