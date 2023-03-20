import React from "react";
import contactImg from "../images/contact.png";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <div className="contact">
      <div className="row">
        <div className="col-md-6">
          <div className="p-3">
            <img src={contactImg} alt="img" className="contact-img" />
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3">
            <div className="contact-btn text-center">
              <h3 className="m-0">Contact Us</h3>
            </div>
            <p className="mt-2 text-justify">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            </p>
            <p className="mt-3">
              <AiOutlineMail />: ndecommerce@gmail.com
            </p>
            <p className="mt-3">
              <FiPhoneCall />: +84 002233444
            </p>
            <p className="mt-3">
              <BiSupport />: 10000078888
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
