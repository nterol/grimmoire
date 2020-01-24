import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = styled.div`
  margin: 16px 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  a {
    color: ${({ theme: palette }) => palette.blue};
    font-weight: bold;
    margin-bottom: 24px;
    text-decoration: none;
  }

  a:visited {
    color: ${({ theme: { palette } }) => palette.blueLight};
  }
`;

const WorkPlaceIndex = ({ graphs }) => (
  <List>
    {graphs.map(({ id, title }) => (
      <div key={id}>
        <Link to={`/graphs/${id}`}>
          <h3>{title}</h3>
        </Link>
      </div>
    ))}
  </List>
);

export default WorkPlaceIndex;
