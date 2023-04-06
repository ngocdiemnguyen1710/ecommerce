import React from "react";

const Input = ({
  label,
  name,
  value,
  type,
  onChange,
  placeholder,
  error,
  className,
  ...other
}) => {
  return (
    <>
      {label && <label className="form-label">{label}</label>}
      <input
        type={type}
        className={`form-control ${className} ${
          error == null
            ? "no-valid"
            : error === "Look Good!"
            ? "valid-border"
            : "invalid-border"
        }`}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        {...other}
      />

      {error && (
        <div
          className={
            error !== "Look Good!" ? "invalid-feedback" : "valid-feedback"
          }
        >
          {error}
        </div>
      )}
    </>
  );
};

export default Input;
