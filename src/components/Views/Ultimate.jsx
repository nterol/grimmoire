/* 
    Goal of this version is to merge deeply D3 
    in React, inpired from this snippet:  
    https://stackoverflow.com/questions/30330646/how-to-create-a-d3-force-layout-graph-using-react
    in order to avoid overCalling of this.setstate()
*/

import React, { Component } from "react";
import ResizeObserver from "resize-observer-polyfill";

import FORCE from "../../engine/force";
import { Linklist } from "../elements/Linklist";
import { Nodelist } from "../elements/Nodelist";
import { CenterNode } from "../center-node/CenterNode";
import { graphParser } from "../utils/graphParser";

import graph from "../data/happy.json";

export const GraphContext = React.createContext();

export default class Ultimate extends Component {
  state = {
    nodes: graph.nodes,
    links: graph.edges,
    filteredNodes: false,
    filteredLinks: false,
    graphElement: false,
    width: null,
    height: null
  };

  componentDidMount() {
    const ro = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { height, width } = entry.contentRect;
        const { width: stateWidth, height: stateHeight } = this.state;
        if (stateWidth !== width || stateHeight !== height) {
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
    console.log("did update");
    const { nodes, links, relatedLinks, relatedNodes } = this.state;

    if (prevNodes !== nodes || prevLinks !== links) {
      if (!!relatedNodes.length && !!relatedLinks.length) {
        FORCE.initForce(relatedNodes, relatedLinks);
        FORCE.tick(this);
        FORCE.drag();
      } else {
        FORCE.initForce(nodes, links);
        FORCE.tick(this);
        FORCE.drag();
      }
    }
  }

  nodeSelector = ({ target: { id } }) => {
    console.log("nodeSelector");
    const [nodeId, type] = id.split("_");
    const { nodes, links } = this.state;
    const { filteredNodes, filteredLinks } = graphParser(nodeId, links, nodes);
    console.log("filteredNodes", filteredNodes);
    this.setState({
      graphElement: { nodeId, type },
      filteredNodes,
      filteredLinks
    });
  };

  linkSelector = ({ target: { id } }) =>
    this.setState({ graphElement: { id, type: "role" } });

  closeWorkSpace = () => {
    console.log("close workspace");
    this.setState({
      filteredLinks: false,
      filteredNodes: false,
      graphElement: false
    });
  };

  render() {
    console.log("render", this.state);
    const { width, height, links, nodes, graphElement } = this.state;

    return (
      <GraphContext.Provider
        value={{
          nodeSelector: this.nodeSelector,
          linkSelector: this.linkSelector,
          closeWorkSpace: this.closeWorkSpace,
          graphElement
        }}
      >
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
            <Linklist links={links} />
            <Nodelist nodes={nodes} nodeSelector={this.nodeView} />
          </svg>
          {graphElement && <CenterNode graphElement={graphElement} />}
        </div>
      </GraphContext.Provider>
    );
  }
}
