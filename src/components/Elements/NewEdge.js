import React from "react";

const Edge = ({ selected, positionEdge, edgeData }) => {
  // console.log("IN LINK", links);
  const mouseDownHandler = () => console.log("mouseDown");
  return (
    <g>
      <path
        id={edgeData.id}
        className={`edge ${selected}`}
        d={positionEdge}
        onMouseDown={mouseDownHandler}
      />
      {/*<rect x="60" y="50" height="10" width="100" rx="5" ry="5" />*/}
    </g>
  );
};

export default Edge;
