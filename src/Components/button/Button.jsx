import React from "react";
import Button from "@mui/material/Button";

const SimpleButton = ({
  value,
  type,
  disabled,
  id,
  onClick,
  color,
  endIcon,
  Variant,
  style,
  startIcon,
  size,
  sx,
  key,
}) => {
  return (
    <>
      <Button
        style={style}
        variant={Variant}
        type={type}
        disabled={disabled}
        id={id}
        onClick={onClick}
        color={color}
        endIcon={endIcon}
        startIcon={startIcon}
        size={size}
        sx={sx}
        key={key}
      >
        {value}
      </Button>
    </>
  );
};

export default SimpleButton;
