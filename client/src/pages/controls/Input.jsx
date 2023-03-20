import React from "react";

const Input = ({ label, name, value, type, onChange, placeholder, error }) => {
  return (
    <>
      <label className="form-label">{label}</label>
      <input
        type={type}
        className={`form-control ${
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
        required
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
