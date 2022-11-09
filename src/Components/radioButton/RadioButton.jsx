import React from "react";

const RadioButton = ({ name, value, onClick }) => {
  return (
    <div className="SRadio" style={{ display: "flex", fontSize: "20px" }}>
      <input type="radio" name={name} onClick={() => onClick(value)} />
      {value}
    </div>
  );
};

export default RadioButton;
