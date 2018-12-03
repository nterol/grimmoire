import React from "react";

export const EndArrow = () => (
  <defs>
    <marker
      id="end-arrow"
      viewBox="0 -5 10 10"
      refX="6"
      markerWidth="3"
      markerHeight="3"
      orient="auto"
    >
      <path d="M0,-5L10,0L0,5" fill="#000" />
    </marker>
  </defs>
);

export const StartArrow = () => (
  <defs>
    <marker
      id="start-arrow"
      viewBox="0 -5 10 10"
      refX="4"
      markerWidth="3"
      markerHeight="3"
      orient="auto"
    >
      <path d="M10,-5L0,0L10,5" fill="#000" />
    </marker>
  </defs>
);
