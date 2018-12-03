import React from "react";

const NewNode = ({ x = 0, y = 0 }) => (
  <g transform={`translate (${x}, ${y})`}>
    <circle>
      <rect>
        <text dx="12" dy="20" className="twitter-holder">
          Node
        </text>
      </rect>
    </circle>
  </g>
);

export default NewNode;
