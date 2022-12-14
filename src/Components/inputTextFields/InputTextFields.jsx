import React from "react";
import TextField from "@mui/material/TextField";
import "../menu/Menu.css";

const InputTextFields = ({
  name,
  onChange,
  className,
  Lable,
  size,
  variant,
  type,
  rows,
  onBlur,
  multiline,
  value,
  defaultValue
}) => {
  return (
    <div className="menu-main">
      <TextField
        onChange={onChange}
        className={className}
        label={Lable}
        InputProps={{ name, id:name }}
        size={size}
        variant={variant}
        value={value}
        type={type}
        rows={rows}
        onBlur={onBlur}
        multiline={multiline}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default InputTextFields;
