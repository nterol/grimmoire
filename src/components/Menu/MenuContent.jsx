import React from "react";
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import WorkPlaceIndex from "./WorkPlaceIndex";

const GRAPH_LIST = gql`
  {
    graphs {
      id
      title
      summits {
        title
      }
      edges {
        title
      }
    }
  }
`;

const MenuContent = () => (
  <Query query={GRAPH_LIST}>
    {({ loading, error, data }) => {
      if (loading) return <div style={{ margin: "16px" }}>loading</div>;
      if (error) return <div style={{ margin: "16px" }}>Error</div>;
      return <WorkPlaceIndex graphs={data.graphs} />;
    }}
  </Query>
);

export default MenuContent;
