import React, { useState } from "react";
import { Select, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import "./Menu.css";
const Menues = ({
  menuData,
  onChange,
  Value,
  name,
  disabled,
  variant,
  size,
  Lable,
  id,
  className,
  defaultValue,
}) => {
  return (
    <div className="menu-main">
      <FormControl className={className} size={size}>
        <InputLabel>{Lable}</InputLabel>
        <Select
          id={id}
          onChange={onChange}
          name={name}
          label={Lable}
          disabled={disabled}
          variant={variant}
          value={Value}
          defaultValue={defaultValue}
        >
          {menuData?.map((ele, i) => {
            return (
              <MenuItem value={ele?.Value} key={i}>
                {ele?.Value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Menues;
