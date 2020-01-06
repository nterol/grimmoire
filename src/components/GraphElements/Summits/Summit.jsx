import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { select } from 'd3';

function Summit({ summit }) {
  const summitRef = useRef(null);
  const [d3Summit, setD3Summit] = useState(null);

  useEffect(() => {
    if (summitRef.current) setD3Summit(select(summitRef.current).datum(summit));
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

export default Summit;
