import React from "react";
import { Input } from "antd";
const { TextArea } = Input;

const TextAreaInput = ({ name, value, rows, placeholder, onChange }) => {
  return (
    <TextArea
      rows={rows}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default TextAreaInput;
