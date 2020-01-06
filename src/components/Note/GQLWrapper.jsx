import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import RotationCircle from "../Loading/RotationCircle";
import Note from "./Note";

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

function GQLWrapper(props) {
  return (
    <Query query={GET_SUMMIT} variables={{ summitId: props.match.params.slug }}>
      {({ loading, error, data }) => {
        console.log(data);
        if (loading) return <RotationCircle />;
        if (error) return <div>Summit not found</div>;
        console.log("SUMMIT", data);
        return <Note summit={data.summit} />;
      }}
    </Query>
  );
}

export default GQLWrapper;
