import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const List = styled.div`
  margin: 16px 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  a {
    color: #fff;
    font-weight: bold;
    margin-bottom: 24px;
    text-decoration: none;
  }
`;

const WorkPlaceIndex = ({ graphs }) => (
  <List>
    {graphs.map(({ id, title }) => (
      <div key={id}>
        <Link to={`/graphs/${id}`}>
          <h1>{title}</h1>
        </Link>
      </div>
    ))}
  </List>
);

export default WorkPlaceIndex;
