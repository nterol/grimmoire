import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as d3 from "d3";

import { MainContext } from "../Main";

const colorPalette = {
  C: "#EF476F",
  R: "#06D6A0",
  I: "#1B9AAA",
  A: "#171815"
};

class Link extends Component {
  componentDidMount() {
    this.d3Link = d3.select(ReactDOM.findDOMNode(this)).datum(this.props.data);
    this.line.addEventListener("click", this.props.context.linkViewer);
  }

  componentDidUpdate() {
    this.d3Link.datum(this.props.data); // .call(FORCE.updateLink);
  }
  componentWillUnmount() {
    this.line.removeEventListener("click", this.props.context.linkViewer);
  }
  render() {
    const {
      data: {
        id,
        source: { x: x1, y: y1 },
        target: { x: x2, y: y2 },
        role
      },
      context: { linkView }
    } = this.props;

    return (
      <line
        id={id}
        ref={line => (this.line = line)}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        strokeWidth="6"
        strokeLinecap="round"
        stroke={linkView && linkView === id ? "black" : colorPalette[role]}
        className="link"
      />
    );
  }
}

export default React.forwardRef((props, ref) => (
  <MainContext.Consumer>
    {context => <Link {...props} context={context} ref={ref} />}
  </MainContext.Consumer>
));
