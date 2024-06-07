import React, { useEffect, useRef, useState } from "react";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ListNode } from "@lexical/list";
import ExampleTheme from "./ExampleTheme";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { HeadingNode } from "@lexical/rich-text";
import { HeadingProvider } from "./context/HeadingContext";
import GetInput from "./Components/GetInput";
function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}
const editorConfig = {
  namespace: "React.js Demo",
  nodes: [HeadingNode, ListNode],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
};
export default function App() {
  const [onHtmlChange, setHtmlChange] = useState("Enter Your Text");
  function handlleHtmlChanege(html: string) {
    setHtmlChange(html);
  }
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <HeadingProvider>
          <ToolbarPlugin />
        </HeadingProvider>
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <GetInput onChange={handlleHtmlChanege} />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
        </div>
        <pre>{onHtmlChange}</pre>
        <div dangerouslySetInnerHTML={{ __html: onHtmlChange }} />
      </div>
    </LexicalComposer>
  );
}
