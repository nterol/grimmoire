import React, { Component } from "react";
import { number, arrayOf, shape } from "prop-types";
import * as d3 from "d3";

class GraphJSX extends Component {
  state = {
    nodes: this.props.nodes,
    links: this.props.links
  };

  componentDidMount() {
    const { nodes, links } = this.state;
    const { forceStrength, linkDistance, width, height } = this.props;
    this.force = d3
      .forceSimulation(nodes)
      .force("charge", d3.forceManyBody().strength(forceStrength))
      .force(
        "link",
        d3
          .forceLink()
          .distance(linkDistance)
          .links(links)
      )
      .force("x", d3.forceX(width / 2))
      .force("y", d3.forceY(height / 2));
    //   .force(
    //     "link",
    //     d3
    //       .forceLink()
    //       .id(({ id }) => id)
    //       .strength(forceStrength)
    //   )
    //   .force("charge", d3.forceManyBody().strength(forceStrength))
    //   .force("collide", d3.forceCollide().radius(12))
    //   .force("center", d3.forceCenter(width / 2, height / 2));

    this.force.on("tick", () => this.setState({ links, nodes }));
  }

  componentWillUnmount() {
    this.force.stop();
  }

  render() {
    const { nodes, links } = this.state;
    const { width, height } = this.props;
    return (
      <svg width={width} height={height} style={{ border: "2px solid blue" }}>
        {links.map(
          ({ source: { x: x1, y: y1 }, target: { x: x2, y: y2 } }, index) => (
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              key={`line-${index}`}
              stroke="black"
            />
          )
        )}
        {nodes.map(({ x, y, r }, i) => (
          <circle r={r} cx={x} cy={y} fill="red" key={i} />
        ))}
      </svg>
    );
  }
}

GraphJSX.defaultProps = {
  width: 1000,
  height: 1000,
  linkDistance: 100,
  forceStrength: -90
};

GraphJSX.propTypes = {
  width: number,
  height: number,
  linkDistance: number,
  forceStrength: number,
  nodes: arrayOf(
    shape({
      x: number.isRequired,
      y: number.isRequired,
      r: number.isRequired
    }).isRequired
  ).isRequired,
  links: arrayOf(
    shape({ target: number.isRequired, source: number.isRequired }).isRequired
  ).isRequired
};

export default GraphJSX;
