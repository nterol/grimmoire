import React from 'react';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import RotationCircle from '../Loadings/RotationCircle';
import Workspace from './Workspace';

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
        if (loading) return <RotationCircle />;
        if (error) return <div>Summit not found</div>;

        return <Workspace summit={data.summit} />;
      }}
    </Query>
  );
}

export default GQLWrapper;
