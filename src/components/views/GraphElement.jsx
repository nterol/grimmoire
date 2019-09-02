import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import { Link } from "react-router-dom";

export const Edges = ({ edges }) =>
  edges.map(edge => <Edge key={edge.id} edge={edge} />);

function Edge({ edge }) {
  const [d3Edge, setD3Edge] = useState(null);

  const edgeRef = useRef(null);

  useEffect(() => {
    if (edgeRef.current) setD3Edge(d3.select(edgeRef.current).datum(edge));
  }, [edge]);

  const {
    id,
    source: { x: x1, y: y1 },
    target: { x: x2, y: y2 }
  } = edge;

  return (
    <line
      id={id}
      ref={edgeRef}
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      fill="black"
      stroke="black"
      strokeWidth="6"
      // strokeDasharray="4"
      // strokeLinecap="round"
      className="link"
    />
  );
}

export const Summits = ({ summits }) =>
  summits.map(summit => <Summit key={summit.id} summit={summit} />);

function Summit({ summit }) {
  const summitRef = useRef(null);
  const [d3Summit, setD3Summit] = useState(null);

  useEffect(() => {
    if (summitRef.current)
      setD3Summit(d3.select(summitRef.current).datum(summit));
  }, [summit]);

  const { id, title, x = 0, y = 0 } = summit;

  return (
    <g
      className="node"
      ref={summitRef}
      transform={`translate(${x > 0 ? x : 0}, ${y})`}
    >
      <Link to={`/summit/${id}`}>
        <circle r="40" stroke="black"></circle>
      </Link>
      <text
        id={id}
        dx="0"
        dy="0"
        fontWeight="600"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="10px"
        fontFamily="Futura"
        fill="white"
      >
        {title}
      </text>
    </g>
  );
}
