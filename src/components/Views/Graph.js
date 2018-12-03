/* eslint-disable */
import React, { Component } from "react";
import { number, string, func, shape, arrayOf, bool } from "prop-types";
import { connect } from "react-redux";
import * as d3 from "d3";

import "./styles/basic.css";

/**
 * Find coordinates for the arrow
 *
 * @params {object} obj - params are desconstructed
 * @params {number} obj.x1 - x-coordinate of the start point
 * @params {number} obj.y1 - y-coordinate of the start point
 * @params {number} obj.x2 - x-coordinate of the end point
 * @params {number} obj.y2 - y-coordinate of the end point
 * @params {radius} obj.radius - the radius of the nodes which have to connect
 */
const drawArrow = ({ x1, y1, x2, y2, radius }) => {
  const X = Math.abs(x1 - x2);
  const Y = Math.abs(y1 - y2);
  const H = Math.sqrt(X * X + Y * Y);
  // const start_angle = Math.acos(Y / H);
  const end_angle = Math.acos(X / H);

  // const start_dx = Math.cos(start_angle) * radius * (x1 <= x2 ? 1 : -1);
  // const start_dy = Math.sin(start_angle) * radius * (y1 <= y2 ? 1 : -1);
  const end_dx = Math.cos(end_angle) * radius * (x1 <= x2 ? -1 : 1);
  const end_dy = Math.sin(end_angle) * radius * (y1 <= y2 ? -1 : 1);

  return {
    x1, // + start_dx,
    y1, //+ start_dy,
    x2: x2 + end_dx,
    y2: y2 + end_dy
  };
};

const getX = ({ x, px }) => (px ? px : x);
const getY = ({ y, py }) => (py ? py : y);
const rectX = ({ x, px }) => (px ? px - 75 : x - 75);
const rectY = ({ y, py }) => (py ? py - 37.5 : y - 37.5);

class GraphsNotions extends Component {
  /**
   * Draw a arrow link
   *
   * @params {object} obj - params are desconstructed
   * @params {object} obj.linksData - the node payload
   * @params {object} obj.svg - the svg object
   * @params {object} obj.color - the color of the arrow link
   * @params {object} obj.strokeWidth - the width of the arrow
   */

  componentWillMount() {
    const { Reset } = this.props;
    // console.log("WILL MOUNT");
    Reset();
  }

  componentDidMount() {
    // console.log("DID MOUNT");
    // this.refresh();
  }

  componentWillReceiveProps() {
    // console.log("Will receive props");
    this.clean();
  }

  componentWillUpdate() {
    // console.log("Will update");
    this.clean();
  }

  componentDidUpdate() {
    console.log("Did update");
    const {
      data: { nodes_data, links_data }
    } = this.props;
    // console.log("NODE: ", nodes_data[0]);
    // console.log("EDGE: ", links_data[0]);
    this.refresh();
  }

  clean = () => {
    console.log("Clean");
    d3.select("svg")
      .selectAll("*")
      .remove();
  };

  links = ({ linksData, color, strokeWidth, svg }) =>
    svg
      .append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(linksData)
      .enter()
      .append("line")
      .attr("marker-end", "url(#arrow)")
      .attr("stroke-width", strokeWidth)
      .attr("stroke", color);

  /**
   * Draw the head of the arrow
   *
   * @params {object} obj - params are desconstructed
   * @params {object} obj.defs - the defs object for svg
   * @params {object} obj.color - the color of the arrow
   */
  arrow = ({ defs, color }) =>
    defs
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 7)
      .attr("refY", 0)
      .attr("markerWidth", 4)
      .attr("markerHeight", 4)
      .attr("orient", "auto")
      .append("path")
      .style("fill", color)
      .attr("d", "M0,-5L10,0L0,5")
      .attr("class", "arrowHead");

  nodes = ({
    svg,
    nodesData,
    radius,
    strokeWidth,
    color,
    selectionColor,
    onClick
  }) =>
    svg
      .append("g")
      .attr("class", "nodes")
      .selectAll("rect")
      .data(nodesData)
      .enter()
      .append("rect")
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("width", 150)
      .attr("height", 75)
      .attr("fill", color)
      .attr(
        "stroke",
        ({ selected }) => (selected ? selectionColor : "#454545")
      );
  // svg
  //   .append("g")
  //   .attr("class", "nodes")
  //   .selectAll("circle")
  //   .data(nodesData)
  //   .enter()
  //   .append("circle")
  //   .attr("r", radius)
  //   .attr("stroke-width", strokeWidth)
  //   .attr("stroke", ({ selected }) => (selected ? selectionColor : color))
  //   .attr("fill", color)
  //   .on("click", onClick);

  names = ({ svg, namesData, color, onClick }) =>
    svg
      .append("g")
      .attr("class", "names")
      .selectAll("text")
      .data(namesData)
      .enter()
      .append("text")
      .attr("fill", color)
      .attr("text-anchor", "middle")
      .text(({ name }) => name)
      .on("click", onClick);

  refresh() {
    const { data = {} } = this.props;
    const { nodes_data, links_data } = data;
    console.log("In refresh");
    console.log("NODE: ", nodes_data[0]);
    console.log("EDGE: ", links_data[0]);
    const {
      linksAttributes = {},
      nodesAttributes = {},
      namesAttributes = {},
      svgAttributes = {}
    } = this.props;

    const svg = d3
      .select("svg")
      .attr("width", svgAttributes.width)
      .attr("height", svgAttributes.height);

    const defs = svg.append("defs");

    const arrow = this.arrow({
      defs,
      color: linksAttributes.color
    });

    const links = this.links({
      svg,
      linksData: links_data,
      color: linksAttributes.color,
      strokeWidth: linksAttributes.strokeWidth
    });

    const nodes = this.nodes({
      svg,
      nodesData: nodes_data,
      radius: nodesAttributes.radius,
      strokeWidth: nodesAttributes.strokeWidth,
      color: nodesAttributes.color,
      selectionColor: nodesAttributes.selectionColor,
      onClick: nodesAttributes.onClick
    });

    const names = this.names({
      svg,
      namesData: nodes_data,
      color: namesAttributes.color,
      onClick: nodesAttributes.onClick
    });

    const simulation = d3.forceSimulation().nodes(nodes_data);

    const link_force = d3
      .forceLink(links_data)
      .id(item => item.name)
      .distance(nodesAttributes.radius * 2)
      .strength(1);

    simulation.force("links", link_force);
    simulation
      .force(
        "charge",
        d3
          .forceManyBody()
          .strength(-1000)
          .distanceMax(30)
      )
      .force(
        "center",
        d3.forceCenter(svgAttributes.width / 2, svgAttributes.height / 2)
      )
      //.force('radial_force', d3.forceRadial(({ selected }) => selected ? 0 : 300,
      //                      svgAttributes.width / 2, svgAttributes.height / 2).strength(1))
      .force(
        "collide",
        d3
          .forceCollide(
            (nodesAttributes.radius + nodesAttributes.strokeWidth) * 2
          )
          .strength(1)
      );

    const tickActions = () => {
      console.log("tick action");
      //update circle positions to reflect node updates on each tick of the simulation
      nodes.attr("x", rectX).attr("y", rectY);

      names.attr("x", getX).attr("y", getY);

      links.each(function({ source, target }) {
        const arrow = drawArrow({
          x1: getX(source),
          y1: getY(source),
          x2: getX(target),
          y2: getY(target),
          radius: nodesAttributes.radius + linksAttributes.strokeWidth
        });

        d3.select(this)
          .attr("x1", arrow.x1)
          .attr("y1", arrow.y1)
          .attr("x2", arrow.x2)
          .attr("y2", arrow.y2);
      });
    };

    simulation.on("tick", tickActions);
  }

  handleBack = () => {
    const { history } = this.props;

    history.goBack();
  };

  render() {
    // console.log("props:", this.props);

    return (
      <div className="experience">
        <div className="top">
          <i
            className="fa fa-arrow-left"
            aria-hidden="true"
            onClick={this.handleBack}
          />
        </div>
        <div className="scene-container">
          <svg ref="svg" className="graph-scene" key={this.props.count} />
          <button className="add-graph-button" onClick={this.handleClick}>
            +
          </button>
        </div>
      </div>
    );
  }
}

GraphsNotions.defaultProps = {
  svgAttributes: {
    width: 1000,
    height: 1000
  },
  linksAttributes: {
    color: "#003366",
    strokeWidth: 10
  },
  nodesAttributes: {
    radius: 50,
    strokeWidth: 5,
    color: "#FAFAFA", //"#454545",
    selectionColor: "#FFD900",
    // selectionColor: "#FAFAFA",
    onClick: e => {
      console.log("click on:", e);
    }
  },
  namesAttributes: {
    // color: '#FFD900'
    color: "#000000"
  },
  data: {
    nodes_data: [
      { name: "BITCOIN", sex: "M", selected: true, px: 500, py: 500 },
      { name: "LITECOIN", sex: "M" },
      { name: "ETHEREUM", sex: "F" },
      { name: "IOTA", sex: "F" },
      { name: "VERY BIG NAME", sex: "F" },
      { name: "Test", sex: "M" },
      { name: "Other", sex: "M" }
    ],
    links_data: [
      { source: "BITCOIN", target: "LITECOIN" },
      { source: "BITCOIN", target: "ETHEREUM" },
      { source: "LITECOIN", target: "ETHEREUM" },
      { source: "BITCOIN", target: "IOTA" },
      { source: "IOTA", target: "VERY BIG NAME" },
      { source: "VERY BIG NAME", target: "IOTA" },
      { source: "ETHEREUM", target: "VERY BIG NAME" },
      { source: "Test", target: "IOTA" },
      { source: "Other", target: "LITECOIN" }
    ]
  }
};

GraphsNotions.propsTypes = {
  Reset: func.isRequired,
  svgAttributes: shape({
    width: number.isRequired,
    height: number.isRequired
  }),
  linksAttributes: shape({
    color: string,
    strokeWidth: number
  }),
  nodesAttributes: shape({
    radius: number.isRequired,
    strokeWidth: number,
    color: string,
    selectionColor: string,
    onClick: func
  }),
  namesAttributes: shape({
    color: string
  }),
  data: shape({
    nodes_data: arrayOf(
      shape({
        name: string.isRequired,
        selected: bool,
        px: number,
        py: number
      })
    ),
    links_data: arrayOf(
      shape({
        source: string.isRequired,
        target: string.isRequired
      })
    )
  })
};

const mapStateToProps = ({ data }) => ({
  data: data[0]
});

const mapDispatchToProps = dispatch => ({
  Reset: () => dispatch({ type: "RESET" })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GraphsNotions);

// export default GraphsNotions;
