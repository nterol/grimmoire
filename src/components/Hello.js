import React from "react";
import { string, func } from "prop-types";

const Hello = ({ name, handleChange }) => (
  <div className="hello-container">
    <div className="name-displayer">
      {name.length > 0 ? <div>{name}</div> : <div>Type Gibberish</div>}
    </div>
    <form>
      <input id="name" value={name} onChange={handleChange} />
    </form>
  </div>
);

Hello.propTypes = {
  name: string.isRequired,
  handleChange: func.isRequired
};

export default Hello;
