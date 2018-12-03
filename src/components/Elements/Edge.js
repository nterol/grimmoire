import React from "react";

import { shape } from "prop-types";

const Edge = ({ links: { path: linkPath } }) => {
  // console.log("IN LINK", links);
  return <path className="link" stroke="red" d={linkPath} />;
};

Edge.propTypes = {
  links: shape().isRequired
};

export default Edge;
