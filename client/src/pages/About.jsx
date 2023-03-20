import React from "react";
import aboutUs from "../images/about.png";

const About = () => {
  return (
    <>
      <div className="contact">
        <div className="row">
          <div className="col-md-6">
            <div className="p-3">
              <img src={aboutUs} alt="img" className="contact-img" />
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus,
              delectus laborum ratione facilis cumque fugit? Labore sit
              asperiores culpa velit libero ducimus, expedita, ratione in
              laborum eligendi neque tenetur ut architecto commodi nostrum unde
              delectus eos inventore odio quam deserunt rem.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
