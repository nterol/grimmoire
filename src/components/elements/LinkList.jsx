import React, { PureComponent } from "react";
import { Link } from "./Link";

export class Linklist extends PureComponent {
  render() {
    const { links } = this.props;
    return links.map(link => <Link key={link.id} data={link} />);
  }
}
