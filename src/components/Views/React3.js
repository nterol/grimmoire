import React, { Component } from "react";

import Hello from "../Hello";
import Shape from "./Shape";

import "./styles/main.css";

const WAIT = 1000;

class Main extends Component {
  state = {
    name: "",
    quick: false
  };

  componentWillMount() {
    this.timer = null;
  }

  handleChange = ({ target: { id, value } }) => {
    clearTimeout(this.timer);
    this.setState({ [id]: value, quick: true });
    this.timer = setTimeout(this.triggerQuick, WAIT);
  };

  triggerQuick = () =>
    this.setState(({ quick: prevQuick, ...rest }) => ({
      ...rest,
      quick: !prevQuick
    }));

  render() {
    const { name, quick } = this.state;
    return (
      <div className="main-container">
        <div className="element-container">
          <Hello name={name} handleChange={this.handleChange} />
          {quick && <div style={{ color: "red" }}>WOOHOOOOOOOOO !!!!</div>}
          <Shape quick={quick} />
        </div>
      </div>
    );
  }
}
export default Main;
