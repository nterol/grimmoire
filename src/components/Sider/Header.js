import React from "react";

import ProfilePic from "../../assets";

const Header = ({ id }) => {
  return (
    <div className="section" style={{ height: "40vh", width: "100%" }}>
      <div
        className="img-container"
        style={{
          backgroundImage: `url(${ProfilePic[id]})`
        }}
      >
        <img className="profile-pic" src={ProfilePic[id]} />
      </div>
    </div>
  );
};

export default Header;
