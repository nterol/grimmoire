import React from 'react';

const ParagraphBlock = ({ attributes, children }) => (
  <p {...attributes}>{children}</p>
);

export default ParagraphBlock;
