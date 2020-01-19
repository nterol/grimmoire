import React, { useState, useMemo, useCallback } from 'react';

import { createEditor, Transforms, Editor, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

import { CodeBlock, ParagraphBlock, Leaf, H1Block } from '../EditorElements';

function WriterBlock({ note }) {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    { type: 'title', children: [{ text: note.title }] },
    { type: 'paragraph', children: [{ text: note.body }] }
  ]);

  const handleKeyDown = event => {
    console.log(event.key, event.ctrlKey);
    if (!event.ctrlKey) return;
    switch (event.key) {
      case '&': {
        event.preventDefault();
        editor.insertText('and');
        break;
      }
      case 'Dead': {
        event.preventDefault();

        const [match] = Editor.nodes(editor, { match: n => n.type === 'code' });

        Transforms.setNodes(
          editor,
          { type: match ? 'paragraph' : 'code' },
          { match: n => Editor.isBlock(editor, n) }
        );
        break;
      }
      case 'b': {
        event.preventDefault();
        const { bold = false } = Editor.marks(editor);

        Transforms.setNodes(
          editor,
          { bold: !bold },
          { match: n => Text.isText(n), split: true }
        );
        break;
      }
    }
  };

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'title':
        return <H1Block {...props} />;
      case 'code':
        return <CodeBlock {...props} />;
      default:
        return <ParagraphBlock {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={handleKeyDown}
      />
    </Slate>
  );
}

export default WriterBlock;
