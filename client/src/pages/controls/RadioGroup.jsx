import React from "react";
import { Radio } from "antd";

const RadioGroup = ({ label, name, value, onChange, items }) => {
  return (
    <>
      <label className="form-label d-block">{label}</label>
      <Radio.Group onChange={onChange} value={value} name={name}>
        {items.map((item) => {
          return (
            <Radio value={item.array ? item.array : item.id} key={item.id}>
              {item.name}
            </Radio>
          );
        })}
      </Radio.Group>
    </>
  );
};

export default RadioGroup;
