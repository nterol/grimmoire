import { Editor, Transforms } from 'slate';

const customEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.mark(editor, {
      match: n => n.bold === true,
      universal: true
    });

    return match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code'
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = customEditor.isBoldMarkActive(editor);
    Transforms.setEditor(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    );
  }
};

export default customEditor;
