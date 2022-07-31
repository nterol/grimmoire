import React from 'react';
import { useQuery } from 'react-apollo';

import RotationCircle from '../Loadings/RotationCircle';

const Error = () => <div>Error</div>;

function QueryWrapper({ query, children }) {
  const { loading, data, error } = useQuery(query);

  if (error) return <Error />;
  if (loading || !data) return <RotationCircle />;
  return children;
}

export default QueryWrapper;
