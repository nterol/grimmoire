/* 
    Goal of this version is to merge deeply D3 
    in React, inpired from this snippet:  
    https://stackoverflow.com/questions/30330646/how-to-create-a-d3-force-layout-graph-using-react
    in order to avoid overCalling of this.setstate()
*/

import React, { Component } from "react";
import ResizeObserver from "resize-observer-polyfill";

import FORCE from "../../Engine/force";

import Link from "./../Elements/ULink";
import Node from "./../Elements/UNode";

import graph from "../data/happy.json";

// const simpleGraph = {
//   nodes: [{ id: "A", title: "A" }, { id: "B", title: "B" }],
//   links: [{ id: "a-b", source: "A", target: "B" }]
// };

export default class Ultimate extends Component {
  state = {
    addLinkArray: [],
    name: "",
    nodes: graph.nodes,
    links: graph.edges,
    width: null,
    height: null
  };

  componentDidMount() {
    const ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { height, width } = entry.contentRect;
        const { width: stateWidth, height: stateHeight } = this.state;
        stateWidth !== width &&
          stateHeight !== height &&
          this.setState(prevState => {
            FORCE.setHeight(height);
            FORCE.setWidth(width);
            return { ...prevState, width, height };
          });

        // console.log("Element:", entry.target);
        // console.log(`Elementx's size: WIDTH: ${width}px x HEIGHT: ${height}px`);
      }
    });
    ro.observe(this.gContainer);
    const { nodes, links } = this.state;
    FORCE.initForce(nodes, links);
    FORCE.tick(this);
    FORCE.drag();
  }

  componentDidUpdate(prevProps, { nodes: prevNodes, links: prevLinks }) {
    // const { width: w, height: h } = this.state;
    // FORCE.resetWidth(w);
    // FORCE.resetHeight(h);

    const { nodes, links } = this.state;
    if (prevNodes !== nodes || prevLinks !== links) {
      FORCE.initForce(nodes, links);
      FORCE.tick(this);
      FORCE.drag();
    }
  }

  handleAddNode = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };

  addNode = e => {
    e.preventDefault();
    this.setState(({ nodes: prevNodes, width, height }) => ({
      nodes: [
        ...prevNodes,
        {
          name: this.state.name,
          id: prevNodes.length + 1,
          x: width / 2,
          y: height / 2
          // x: FORCE.width / 2,
          // y: FORCE.height / 2
        }
      ],
      name: ""
    }));
  };

  render() {
    const { links, nodes } = this.state;

    var linksList = links.map(link => {
      return <Link key={link.id} data={link} />;
    });
    var nodesList = nodes.map(node => {
      return <Node data={node} name={node.name} key={node.id} />;
    });
    return (
      <div
        className="graph_container"
        ref={gContainer => (this.gContainer = gContainer)}
      >
        <svg
          className="graph"
          preserveAspectRatio="xMidYMid meet"
          width={FORCE.width}
          height={FORCE.height}
        >
          <g>{linksList}</g>
          <g>{nodesList}</g>
        </svg>
      </div>
    );
  }
}
