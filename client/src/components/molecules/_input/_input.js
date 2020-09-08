import React from "react";
import { Typography } from "@material-ui/core";

import InputField from "../../atoms/_input-field/_input-field";

const Input = ({ label, onChange, value }) => {
  return (
    <div id="input">
      <Typography variant="h6">{label}</Typography>
      <InputField value={value} onChange={onChange} test={label}></InputField>
    </div>
  );
};

export default Input;
