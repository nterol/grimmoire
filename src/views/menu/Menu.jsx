import React from "react";

import { Container, Logo } from "./styles";
import { Link } from "react-router-dom";

import GQLWrapper from "./GQLWrapper";

function Menu() {
  return (
    <Container>
      <Link to="/">
        <Logo>Corpus</Logo>
      </Link>
      <GQLWrapper />
    </Container>
  );
}

export default Menu;
