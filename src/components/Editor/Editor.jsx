import React, { useState, useMemo, useCallback } from 'react';

import { createEditor } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { CodeBlock, ParagraphBlock } from './EditorElements';

function Editor() {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    { type: 'paragraph', children: [{ text: ' A simple paragraph' }] }
  ]);

  const handleKeyDown = event => {
    if (event.key === '&') {
      event.preventDefault();
      editor.exec({ type: 'insert_text', text: 'and' });
    }
  };

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeBlock {...props} />;
      default:
        return <ParagraphBlock {...props} />;
    }
  }, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable renderElement={renderElement} onKeyDown={handleKeyDown} />
    </Slate>
  );
}

export default Editor;
