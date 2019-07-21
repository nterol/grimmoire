import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import palette from "../theme";

import MenuContent from "./MenuContent";

export const Container = styled.div`
  color: white;
  height: 100%;
  width: 200px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: ${palette.sombre};
  overflow-x: hidden;
  padding-top: 20px;
`;

const Menu = () => (
  <Container>
    <Link to="/">
      <span>Corpus</span>
    </Link>

    <MenuContent />
  </Container>
);

export default Menu;
