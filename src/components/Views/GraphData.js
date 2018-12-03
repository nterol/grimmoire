import React, { Component } from "react";
import * as d3 from "d3";
import { number } from "prop-types";
import G from "./data/mentions.json";

import Node from "../Elements/Node";
import Edge from "../Elements/Edge";

import "./styles/graph.css";

class GraphData extends Component {
  state = {
    nodes: [...G.nodes],
    links: [...G.links]
  };

  componentDidMount() {
    this.graphBuilder();
  }

  componentWillUnmount() {
    this.forceUpdate.stop();
  }

  positionNode = d => {
    const { width, height } = this.props;
    let { x, y } = d;
    if (x < 0) x = 0;
    if (x > width) x = width;
    if (y < 0) y = 0;
    if (y > height) y = height;
    return {
      ...d,
      x,
      y
    };
  };

  positionLinks = d => {
    const {
      source: { x: sourceX, y: sourceY },
      target: { x: targetX, y: targetY }
    } = d;
    const midPointX = (sourceX + targetX) / 2;
    const midPointY = (sourceY - targetY) / 2;
    const dx = targetX - sourceX;
    const dy = targetY - sourceY;
    const normalize = Math.sqrt(dx * dx + dy * dy);
    const offSetX = midPointX + 30 * (dy / normalize);
    const offSetY = midPointY + 30 * (dx / normalize);
    return {
      ...d,
      path: `M${sourceX},${sourceY}S${offSetX},${offSetY} ${targetX},${targetY}`
    };
  };

  graphBuilder() {
    const { nodes, links } = this.state;
    const { forceStrength, linkDistance, width, height } = this.props;

    this.physic = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink()
          .id(d => {
            return d.id;
          })
          .strength(forceStrength)
      )
      .force("charge", d3.forceManyBody().strength(linkDistance))
      .force("collide", d3.forceCollide().radius(12))
      .force("center", d3.forceCenter(width / 2, height / 2));

    this.physic.nodes(nodes).on("tick", () =>
      this.setState(prevState => ({
        nodes: nodes.map(this.positionNode),
        links: links.map(this.positionLinks)
      }))
    );
    this.physic.force("link").links(links);
  }

  handleMouseOver = ({ target: { id } }) => {
    console.log("Mouse over", id);
  };

  handleMouseOut = e => {
    console.log("MOuse Out", e);
  };

  /* UTILS */
  linkedByIndex = () => {};
  isConnected = (a, b) => this.linkedByIndex();

  render() {
    const { nodes, links } = this.state;
    const { width, height } = this.props;

    return (
      <svg width={width} height={height} style={{ border: "2px solid black" }}>
        <g transform="transform(50, 50)">
          {nodes.map((node, nodeIndex) => (
            <Node
              key={nodeIndex}
              nodes={node}
              onHover={this.handleMouseOver}
              onOut={this.handleMouseOut}
            />
          ))}
          {links.map((link, linkIndex) => (
            <Edge key={linkIndex} links={link} />
          ))}
        </g>
      </svg>
    );
  }
}

GraphData.defaultProps = {
  width: 1000,
  height: 1000,
  linkDistance: -1000,
  forceStrength: 0.055
};

GraphData.propTypes = {
  forceStrength: number,
  linkDistance: number,
  width: number,
  height: number
};

export default GraphData;
