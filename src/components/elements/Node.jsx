import React, { Component } from "react";
import ReactDOM from "react-dom";
import FORCE from "../../engine/force";
import * as d3 from "d3";

import ProfilePic from "../../assets";

import { GraphContext } from "../Views/Ultimate";

class RawNode extends Component {
  state = {
    selected: false
  };

  componentDidMount() {
    this.d3Node = d3.select(ReactDOM.findDOMNode(this)).datum(this.props.data); //   .call(FORCE.enterNode);
    this.node.addEventListener("click", this.props.context.nodeSelector);
  }

  componentDidUpdate() {
    this.d3Node.datum(this.props.data).call(FORCE.updateNode);
  }

  componentWillUnmount() {
    this.node.removeEventListener("click", this.props.context.nodeSelector);
  }

  selectNode = () =>
    this.setState(({ selected: prevSelected }) => {
      return {
        selected: !prevSelected
      };
    });

  render() {
    const { selected } = this.state;
    const {
      data: { name, id, type, anon = false, x = 0, y = 0 }
    } = this.props;
    console.log("x", x, "y", y);
    // const cx = Math.max(30, Math.min(FORCE.width - 30, x));
    // const cy = Math.max(30, Math.min(FORCE.height - 30, y));

    return (
      <g
        className="node"
        ref={node => (this.node = node)}
        onMouseEnter={this.selectNode}
        onMouseLeave={this.selectNode}
        transform={`translate(${x > 0 ? x - 75 : 0}, ${y})`}
      >
        <clipPath id="node-cover">
          <path
            fill="#fff"
            stroke="black"
            strokeWidth="3px"
            d="M 10,0 h100 Q 120,0 120,10 v60 h-120 v-60 Q 0,0 10,0 z"
          />
        </clipPath>
        <image
          id={`${id}_${type}`}
          clipPath="url(#node-cover)"
          className="node_cover_img"
          xlinkHref={
            type === "person"
              ? anon
                ? ProfilePic.anon
                : ProfilePic[id]
              : ProfilePic[type]
          }
        />

        <path
          id={`${id}_${type}`}
          fill="#fff"
          stroke="rgba(0,0,0,.125)"
          strokeWidth="1px"
          d="M 120,70 v50 Q 120,130 110,130 h-100 Q 0,130 0,120 v-50 z"
        />
        <text
          id={`${id}_${type}`}
          dx="10"
          dy="90"
          fill={selected ? "blue" : "black"}
          fontWeight="600"
          textAnchor="start"
          alignmentBaseline="middle"
          fontSize="10px"
          fontFamily="Futura"
        >
          {name}
        </text>
      </g>
    );
  }
}

export const Node = React.forwardRef((props, ref) => (
  <GraphContext.Consumer>
    {context => <RawNode {...props} context={context} ref={ref} />}
  </GraphContext.Consumer>
));
