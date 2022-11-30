import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

const LoadingButtons = ({ loading, type, id, variant, disabled, value }) => {
  return (
    <Box sx={{ "& > button": { m: 1 } }}>
      <LoadingButton
        id={id}
        variant={variant}
        disabled={disabled}
        type={type}
        size="small"
        loading={loading}
      >
        {value}
      </LoadingButton>
    </Box>
  );
};

export default LoadingButtons;
