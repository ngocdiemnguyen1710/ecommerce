import React from "react";

const ButtonAction = ({ title, onClick, icon, className }) => {
  return (
    <div
      className={`btn-action ${
        title === "Submit" ||
        title === "Update" ||
        title === "Load more" ||
        title === "More Detail"
          ? "btn-action--submit"
          : title === "Edit"
          ? "btn-action--edit"
          : "btn-action--delete"
      } ${className}`}
    >
      <button className="btn" type="submit" onClick={onClick}>
        <span className="icon">{icon}</span>
        {title}
      </button>
    </div>
  );
};

export default ButtonAction;
