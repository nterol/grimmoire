import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import useResize from "../../hooks/useResize";

import { Summits, Edges } from "../GraphElement";
import FORCE from "../../engine/force";

const Container = styled.div`
  border: 1px solid;
  height: 100vh;
`;

const SVG = styled.svg`
  position: relative;
  background-color: #fff;
`;

function GraphView({ graph }) {
  const gContainer = useRef(null);
  const canva = useRef(null);

  const { width, height } = useResize(gContainer);

  const { summits, edges } = graph;

  const customEdges = edges.map(edge => ({
    ...edge,
    source: edge.source.id,
    target: edge.target.id
  }));

  useEffect(() => {
    FORCE.setHeight(height);
    FORCE.setWidth(width);
    FORCE.initForce(summits, customEdges);
    FORCE.tickRef(gContainer.current);
    FORCE.drag();
  }, [customEdges, edges, height, summits, width]);

  return (
    <Container ref={gContainer}>
      <SVG
        ref={canva}
        preserveAspectRatio="xMidYMid meet"
        width={width}
        height={height}
      >
        <Edges edges={customEdges} />
        <Summits summits={summits} />
      </SVG>
    </Container>
  );
}

export default GraphView;
