import React from 'react';

import { Container, Logo } from './styles';
import { Link } from 'react-router-dom';

import GQLWrapper from './GQLWrapper';

function Menu() {
  return (
    <Container>
      <Logo>
        <Link to="/">Grimmoire</Link>
      </Logo>
      <GQLWrapper />
    </Container>
  );
}

export default Menu;
