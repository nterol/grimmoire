import React, { PureComponent } from "react";
import { Node } from "./Node";

export class NodeList extends PureComponent {
  render() {
    const { nodes } = this.props;
    return nodes.map(node => (
      <Node data={node} name={node.name} key={node.id} />
    ));
  }
}
