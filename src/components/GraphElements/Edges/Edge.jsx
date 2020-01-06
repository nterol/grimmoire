import React, { useState, useEffect, useRef } from 'react';
import { select } from 'd3';

function Edge({ edge }) {
  const [d3Edge, setD3Edge] = useState(null);

  const edgeRef = useRef(null);

  useEffect(() => {
    if (edgeRef.current) setD3Edge(select(edgeRef.current).datum(edge));
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

export default Edge;
