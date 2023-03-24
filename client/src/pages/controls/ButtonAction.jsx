import React from "react";

const ButtonAction = ({ title, onClick, icon }) => {
  return (
    <div
      className={`btn-action ${
        title === "Submit" || title === "Update"
          ? "btn-action--submit"
          : title === "Edit"
          ? "btn-action--edit"
          : "btn-action--delete"
      }`}
    >
      <button className="btn" type="submit" onClick={onClick}>
        <span className="icon">{icon}</span>
        {title}
      </button>
    </div>
  );
};

export default ButtonAction;
