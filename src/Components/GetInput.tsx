import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useState } from "react";
import { LexicalEditor } from "lexical";

interface InputProps {
  onChange: (html: string) => void;
}
export default function GetInput({ onChange }: InputProps) {
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState("");

  const handleEditorChange = (editor: LexicalEditor) => {
    editor.update(() => {
      const htmlString = $generateHtmlFromNodes(editor);
      // console.log(htmlString);
      setHtmlString(htmlString);
      onChange(htmlString);
    });
  };

  return (
    <>
      <OnChangePlugin onChange={() => handleEditorChange(editor)} />
    </>
  );
}
