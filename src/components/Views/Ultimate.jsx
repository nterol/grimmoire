/* 
    Goal of this version is to merge deeply D3 
    in React, inpired from this snippet:  
    https://stackoverflow.com/questions/30330646/how-to-create-a-d3-force-layout-graph-using-react
    in order to avoid overCalling of this.setstate()
*/

import React, { Component } from "react";
import ResizeObserver from "resize-observer-polyfill";

import FORCE from "../../engine/force";
import { LinkList } from "../elements/LinkList";
import { NodeList } from "../elements/NodeList";
import { CenterNode } from "../center-node/CenterNode";
import { graphParser } from "../utils/graphParser";

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
    relatedNodes: [],
    relatedLinks: [],
    nodeView: false,
    linkView: false,
    width: null,
    height: null
  };

  componentDidMount() {
    const ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { height, width } = entry.contentRect;
        console.log(`constat w:${width}, h:${height}`);
        const { width: stateWidth, height: stateHeight } = this.state;
        if (stateWidth !== width || stateHeight !== height) {
          console.log("heeeyyyyy");
          this.setState(
            prevState => {
              return { ...prevState, width, height };
            },
            () => {
              const { height, width, nodes, links } = this.state;
              FORCE.setHeight(height);
              FORCE.setWidth(width);
              FORCE.initForce(nodes, links);
              FORCE.tick(this);
              FORCE.drag();
            }
          );
        }
      }
    });
    ro.observe(this.gContainer);
  }

  componentDidUpdate(prevProps, { nodes: prevNodes, links: prevLinks }) {
    console.log("DID UPDATE");
    const { nodes, links, relatedNodes, relatedLinks } = this.state;
    if (!!relatedNodes.length && !!relatedLinks.length) {
      FORCE.initForce(relatedNodes, relatedLinks);
      FORCE.tick(this);
      FORCE.drag();
    }
    if (prevNodes !== nodes || prevLinks !== links) {
      FORCE.initForce(nodes, links);
      FORCE.tick(this);
      FORCE.drag();
    }
  }

  nodeView = async ({ target: { id } }) => {
    const [nodeId, type] = id.split("_");
    const { nodes, links } = this.state;
    const { filterdNodes, filterdLinks } = await this.getFilteredGraph(
      nodeId,
      links,
      nodes
    );
    this.setState(prevState => ({
      ...prevState,
      linkView: false,
      nodeView: { nodeId, type },
      relatedNodes: filterdNodes,
      relatedLinks: filterdLinks
    }));
  };

  getFilteredGraph = (id, links, nodes) => {
    graphParser(id, links, nodes);
  };

  render() {
    const { width, height, links, nodes } = this.state;
    return (
      <div
        className="graph_container"
        ref={gContainer => (this.gContainer = gContainer)}
      >
        <svg
          className="graph"
          preserveAspectRatio="xMidYMid meet"
          width={width}
          height={height}
        >
          <LinkList links={links} />
          <NodeList nodes={nodes} />
        </svg>
        <CenterNode />
      </div>
    );
  }
}
