import React from "react";

const InputFile = ({
  photoName,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });
  return (
    <>
      <label className="btn btn-outline-secondary col-md-12">
        {photoName ? photoName : "Upload photo"}
        <input
          hidden
          accept="images/*"
          type="file"
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
          onChange={(e) => {
            onChange(convertToDefEventPara(name, e.target.files[0]));
          }}
          required
        />
      </label>

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

export default InputFile;
