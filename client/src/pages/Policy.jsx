import React from "react";
import aboutUs from "../images/about.png";

const Policy = () => {
  return (
    <div className="contact">
      <div className="row">
        <div className="col-md-6">
          <div className="p-3">
            <img src={aboutUs} alt="img" className="contact-img" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3">
            <p className="mt-3">Lorem ipsum dolor</p>
            <p className="mt-3">Lorem ipsum dolor</p>
            <p className="mt-3">Lorem ipsum dolor</p>
            <p className="mt-3">Lorem ipsum dolor</p>
            <p className="mt-3">Lorem ipsum dolor</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
