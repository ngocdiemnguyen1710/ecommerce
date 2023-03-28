import React from "react";
import { Checkbox } from "antd";

const CheckboxFilter = ({ onChange, checked, title, value }) => {
  return (
    <Checkbox onChange={onChange} checked={checked} value={value}>
      {title}
    </Checkbox>
  );
};

export default CheckboxFilter;
