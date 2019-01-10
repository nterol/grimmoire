import React from "react";
import { shape, func } from "prop-types";

const Node = ({
  nodes: { twitter, name, id, colour, party, x = 0, y = 0 },
  onHover,
  onOut
}) => {
  const imgLoader = () => {
    console.log("loaded");
  };
  return (
    <g transform={`translate(${x > 0 ? x - 75 : 0}, ${y})`}>
      <rect
        id={id}
        className="node"
        rx="10"
        ry="10"
        width="150"
        height="75"
        onMouseOver={onHover}
        onMouseOut={onOut}
        onBlur={() => console.log("On Blur")}
        onFocus={() => console.log("On Focus")}
        fill={colour}
        // stroke={selected ? "green" : "alicewhite"}
      />
      <text dx="12" dy="20" className="twitter-holder">
        {twitter}
      </text>
      <text dx="12" dy="40" className="name-holder">
        {name}
      </text>
      <text dx="12" dy="60" className="party-holder">
        {party}
      </text>
      <image
        onLoad={imgLoader}
        height="25"
        width="25"
        x="100"
        className="picture-holder"
        xlinkHref="https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png"
      />
    </g>
  );
};

Node.propTypes = {
  nodes: shape({}).isRequired,
  onHover: func.isRequired,
  onOut: func.isRequired
};

// Node.propTypes = {
//   color: string.isRequired,
//   selected: bool.isRequired
// };

export default Node;
