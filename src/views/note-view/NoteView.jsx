import React from "react";

import styled from "styled-components";
import { Header, Body } from "../../components/elements/Note";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px;
  height: 100vh;
`;

const Column = styled.div`
  flex-grow: 1;
`;

const Left = styled(Column)``;

const Right = styled(Column)``;

const Center = styled(Column)`
  border: 1px solid palegrey;
  background: white;
  flex-grow: 2;
  border-radius: 5px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  overflow: scroll;
`;

const NoteView = ({ summit }) => {
  return (
    <Container>
      <Left />
      <Center>
        <Header title={summit.title} />
        <Body body={summit.body} />
      </Center>
      <Right />
    </Container>
  );
};

export default NoteView;
