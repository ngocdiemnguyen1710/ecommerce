import React from "react";

const Button = ({ title, onClick }) => {
  return (
    <div className="d-grid gap-2">
      <button className="btn btn-submit" type="submit" onClick={onClick}>
        {title}
      </button>
    </div>
  );
};

export default Button;
