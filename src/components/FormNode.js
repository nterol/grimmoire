import React from "react";

export const FormNode = ({ addNode, name, handleAddNode }) => {
  return (
    <form className="form-addSystem" onSubmit={addNode}>
      <h4 className="form-addSystem__header">New Node</h4>
      <div className="form-addSystem__group">
        <input
          value={name}
          onChange={handleAddNode}
          name="name"
          className="form-addSystem__input"
          id="name"
          placeholder="Name"
        />
        <label className="form-addSystem__label" htmlFor="title">
          Name
        </label>
      </div>
      <div className="form-addSystem__group">
        <input className="btnn" type="submit" value="add node" />
      </div>
    </form>
  );
};
