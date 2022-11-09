import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";

const InputFields = ({ lable, className, onChange, value, disabled, name }) => {
  // console.log("=======>",name);
  return (
    <>
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-with-sx"
            label={lable}
            variant="standard"
            className={className}
            onChange={onChange}
            value={value}
            disabled={disabled}
            name={name}
          />
        </Box>
      </Box>
    </>
  );
};

export default InputFields;
