import React from "react";
import { Select as SelectAntd } from "antd";

const Select = ({
  placeholder,
  onChange,
  onSearch,
  value,
  name,
  options,
  error,
  ...other
}) => {
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <>
      <SelectAntd
        style={{
          width: "100%",
        }}
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={(data) => {
          onChange(convertToDefEventPara(name, data));
        }}
        value={value}
        onSearch={onSearch}
        name={name}
        {...(error && { status: "error" })}
        {...other}
      >
        {options &&
          options.map((item) => {
            return (
              <SelectAntd.Option key={item._id} value={item._id}>
                {item.name}
              </SelectAntd.Option>
            );
          })}
      </SelectAntd>
      <span style={{ color: "red", display: "block" }}>{error}</span>
    </>
  );
};

export default Select;
