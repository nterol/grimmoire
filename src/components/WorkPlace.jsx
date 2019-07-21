import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";

import RotationCircle from "./loading/RotationCircle";
import GraphView from "./views/GraphView";

const GET_WORK_PLACE = gql`
  query graph($graphId: ID!) {
    graph(id: $graphId) {
      title
      summits {
        id
        title
      }
      edges {
        id
        title
        source {
          id
        }
        target {
          id
        }
      }
    }
  }
`;

const WorkPlace = props => {
  console.log(props);

  return (
    <Query
      query={GET_WORK_PLACE}
      variables={{ graphId: props.match.params.slug }}
    >
      {({ loading, error, data }) => {
        console.log("DATA", data);
        if (loading) return <RotationCircle />;
        if (error) return <div>Error</div>;

        return <GraphView graph={data.graph} />;
      }}
    </Query>
  );
};

export default WorkPlace;
