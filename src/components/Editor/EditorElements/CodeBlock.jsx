import React from 'react';

const CodeBlock = ({ attributes, children }) => (
  <pre {...attributes}>
    <code>{children}</code>
  </pre>
);

export default CodeBlock;
