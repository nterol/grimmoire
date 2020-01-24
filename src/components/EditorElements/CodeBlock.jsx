import React from 'react';

import { Code } from './styles';

const CodeBlock = ({ attributes, children }) => (
  <pre {...attributes}>
    <Code>{children}</Code>
  </pre>
);

export default CodeBlock;
