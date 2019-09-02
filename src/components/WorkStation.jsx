import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import styled from "styled-components";
import RotationCircle from "./loading/RotationCircle";
import { Header, Body } from "./elements/Note";

const GET_SUMMIT = gql`
  query summit($summitId: ID!) {
    summit(id: $summitId) {
      title
      body
      edges {
        title
        target {
          id
          title
        }
        source {
          id
          title
        }
      }
    }
  }
`;

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

const SummitPlace = ({ summit }) => {
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

function WorkStation(props) {
  return (
    <Query query={GET_SUMMIT} variables={{ summitId: props.match.params.slug }}>
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return <RotationCircle />;
        if (error) return <div>Summit not found</div>;
        console.log("SUMMIT", data);
        return <SummitPlace summit={data.summit} />;
      }}
    </Query>
  );
}

export default WorkStation;
