/* 
    Goal of this version is to merge deeply D3 
    in React, inpired from this snippet:  
    https://stackoverflow.com/questions/30330646/how-to-create-a-d3-force-layout-graph-using-react
    in order to avoid overCalling of this.setstate()
*/

import React, { Component } from "react";

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
    links: graph.edges
  };

  componentDidMount() {
    const { nodes, links } = this.state;
    FORCE.initForce(nodes, links);
    FORCE.tick(this);
    FORCE.drag();
  }

  componentDidUpdate(prevProps, { nodes: prevNodes, links: prevLinks }) {
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
    this.setState(prevState => ({
      nodes: [
        ...prevState.nodes,
        {
          name: this.state.name,
          id: prevState.nodes.length + 1,
          x: FORCE.width / 2,
          y: FORCE.height / 2
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
      <div className="graph_container">
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
