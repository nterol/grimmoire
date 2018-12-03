import React, { Component, lazy, Suspense } from "react";
import * as d3 from "d3";

const { EndArrow, StartArrow } = lazy(() => import("../Elements/Defs"));
const NewNode = lazy(() => import("../Elements/NewNode"));
const NewEdge = lazy(() => import("../Elements/NewEdge"));

const simpleGraph = {
  nodes: [{ id: "A", title: "A" }, { id: "B", title: "B" }],
  edges: [{ id: "a-b", source: "A", target: "B" }]
};

class View extends Component {
  /* SIMPLE VIEW */
  state = {
    positionNodes: [],
    positionEdges: []
  };

  componentDidMount() {
    this.graphBuilder();
  }

  positionNode = d => {
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
  positionEdge = d => {};
  // nodePlacer = d => {
  //   console.log("Node Placer", d);
  //   return d;
  // };

  // edgePlacer = d => {
  //   console.log("Edge Placer", d);
  //   return d;
  // };

  // animate = async (dCopyNodes, dCopyEdges) => {
  //   await this.force.nodes(dCopyNodes).on("tick", () => {
  //     // console.log("NODES");
  //     dCopyNodes.map(this.nodePlacer);
  //     // console.log("EDGES");
  //     dCopyEdges.map(this.edgePlacer);
  //   });
  //   await this.force.force("link").links(dCopyEdges);
  //   console.log("NodeANimte", dCopyNodes, "EdgeAnimate", dCopyEdges);
  // };

  graphBuilder = () => {
    const dCopyNodes = simpleGraph.nodes.map(({ id }) => ({
      id
    }));
    const dCopyEdges = simpleGraph.edges.map(({ id }) => ({
      id,
      source: { x: 0, y: 0 },
      target: { x: 0, y: 0 }
    }));

    console.log("Before things");
    console.log("Nodes", dCopyNodes);
    console.log("Edges", dCopyEdges);

    /* 
  This part defines the Simulation Object,
  then tweaks around the forces that animate the graph
*/
    this.force = d3
      .forceSimulation()
      .force(
        "link",
        d3
          .forceLink(dCopyEdges)
          .id(({ id }) => id)
          .distance(10)
          .strength(1.5)
      )
      .force(
        "charge",
        d3
          .forceManyBody()
          .strength(-1000)
          .distanceMax(450)
          .distanceMin(85)
      )
      .force("center", d3.forceCenter(500, 500));

    this.force.nodes(dCopyNodes).on("tick", () => {
      dCopyNodes.map(this.positionNode);
      dCopyEdges.map(this.positionEdge);
    });
    // this.force.force("link").links(dCopyEdges);
  };

  render() {
    const { positionNodes, positionEdges } = this.state;
    const { nodes, edges } = simpleGraph;
    return (
      <div className="graph-container">
        <svg
          width="1000"
          height="1000"
          className="graph-holder"
          style={{ border: "2px solid blue" }}
        >
          <g>
            {nodes.map((node, nodeIndex) => (
              <NewNode
                key={node.id}
                nodeData={node}
                positionNode={positionNodes[nodeIndex]}
              />
            ))}
          </g>
          <g>
            {edges.map((edge, edgeIndex) => (
              <NewEdge
                key={edge.id}
                positionEdge={positionEdges[edgeIndex]}
                edgeData={edge}
              />
            ))}
          </g>
        </svg>
      </div>
    );
  }
}

export default View;
