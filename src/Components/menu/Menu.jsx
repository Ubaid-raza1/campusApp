import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import "./Menu.css";
const Menues = ({ menuData, onChange, value, name, disabled }) => {
  return (
    <div className="menu-main">
      <FormControl className="menu" size="small">
        <InputLabel id="demo-simple-select-helper-label">{value}</InputLabel>
        <Select
          onChange={onChange}
          name={name}
          label={value}
          disabled={disabled}
        >
          {menuData?.map((ele, i) => {
            return (
              <MenuItem value={ele.Value} key={i}>
                {ele.Value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Menues;
