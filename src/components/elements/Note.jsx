import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
  background: #de6262;
  padding: 64px 32px;
  background: linear-gradient(to right, #ffb88c, #de6262);

  width: 100%;
  height: 25%;

  h1 {
    color: #fff;
    font-size: 32Mpx;
    font-weight: bold;
  }
`;

const BodyContainer = styled.div`
  padding: 16px;
  p {
    color: #000;
    font-size: 16px;
  }
`;

export const Header = ({ title }) => {
  return (
    <HeaderContainer>
      <h1>{title}</h1>
    </HeaderContainer>
  );
};

export const Body = ({ body }) => (
  <BodyContainer>
    <p>{body}</p>
  </BodyContainer>
);
