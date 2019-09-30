import React from "react";

import { Container, Logo } from "./styles";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router";

import GQLWrapper from "./GQLWrapper";

function Menu() {
  const params = useParams();
  const history = useHistory();
  console.log("PARAMS ***********", params);
  console.log("History ***********", history);
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
