import React from "react";
import { MainContext } from "./Main";

const Toggler = () => (
  <MainContext.Consumer>
    {({ toggle, handleToggle }) => (
      <button
        id="toggler"
        onClick={handleToggle}
        className={`button ${toggle ? "is-info" : "is-warning"}`}
      >
        {toggle ? "UNTOGGLE" : "TOGGLE"}
      </button>
    )}
  </MainContext.Consumer>
);

export default Toggler;
