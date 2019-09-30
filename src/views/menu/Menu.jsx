import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../../components/theme";

import GQLWrapper from "./GQLWrapper";

export const Container = styled.div`
  color: white;
  height: 100%;
  width: 200px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${palette.black};
  overflow-x: hidden;
  padding-top: 20px;
`;

export const Logo = styled.span`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

const Menu = () => (
  <Container>
    <Link to="/">
      <Logo>Corpus</Logo>
    </Link>
    <GQLWrapper />
  </Container>
);

export default Menu;
