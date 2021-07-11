import React from "react";

const Feature = ({ feature, desc, imgSrc }) => {
  return (
    <div className="feature">
      <div className="desc-feature">
        <h3>{feature}</h3>
        <p>{desc}</p>
      </div>
      <img src={imgSrc} alt="" className="feature-img" />
    </div>
  );
};

export default Feature;
