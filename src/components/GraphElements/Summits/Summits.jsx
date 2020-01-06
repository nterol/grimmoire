import React from 'react';

import Summit from './Summit';

const Summits = ({ summits }) =>
  summits.map(summit => <Summit key={summit.id} summit={summit} />);

export default Summits;
