import React from "react";
import { Node } from "./Node";

export const Nodelist = ({ nodes }) => {
  return nodes.map(node => <Node data={node} name={node.name} key={node.id} />);
};
