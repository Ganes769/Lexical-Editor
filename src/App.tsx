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
import GetInput from "./components/GetInput";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HashtagNode } from "@lexical/hashtag";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode } from "@lexical/list";
import { MarkNode } from "@lexical/mark";
import { OverflowNode } from "@lexical/overflow";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { HorizontalRulePlugin } from "@lexical/react/LexicalHorizontalRulePlugin";
import PageBreakPlugin from "./plugins/PageBreak";
import { PageBreakNode } from "./components/PageBreakNode/index";
import { useSettings } from "./context/SettingsContext";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import TableCellResizerPlugin from "./components/TableCellResizer";
import PlaygroundEditorTheme from "../src/theme/PlaygroundEditorTheme";
import TableActionMenuPlugin from "./components/TableActionMenuPlugin";
// import TableCellResizerPlugin from "./components/TableCellResizer";
function Placeholder() {
  return <div className="editor-placeholder">Enter some rich text...</div>;
}
const editorConfig = {
  namespace: "React.js",
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    HashtagNode,
    CodeHighlightNode,
    AutoLinkNode,
    LinkNode,
    OverflowNode,
    HorizontalRuleNode,
    MarkNode,
    PageBreakNode,
  ],

  onError(error: Error) {
    throw error;
  },
  theme: PlaygroundEditorTheme,
};

export default function Editor() {
  const [floatingAnchorElem, setFloatingAnchorElem] = useState<
    HTMLDivElement | undefined
  >(undefined);
  const {
    settings: { tableCellMerge, tableCellBackgroundColor },
  } = useSettings();
  const [onHtmlChange, setHtmlChange] = useState("Enter Your Text");
  const [isLinkEditMode, setIsLinkEditMode] = useState<boolean>(false);
  function handlleHtmlChanege(html: string) {
    setHtmlChange(html);
  }

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
      console.log("floatingaction ", floatingAnchorElem);
    }
  };
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <HeadingProvider>
          <ToolbarPlugin setIsLinkEditMode={setIsLinkEditMode} />
        </HeadingProvider>
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <div className="editor-scroller">
                <div className="editor" ref={onRef}>
                  <ContentEditable className="editor-input" />
                </div>
              </div>
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <GetInput onChange={handlleHtmlChanege} />
          <TableCellResizerPlugin />
          <TablePlugin
            hasCellMerge={tableCellMerge}
            hasCellBackgroundColor={tableCellBackgroundColor}
          />
          {floatingAnchorElem && (
            <TableActionMenuPlugin
              anchorElem={floatingAnchorElem}
              cellMerge={true}
            />
          )}
          <LinkPlugin />
          <HorizontalRulePlugin />
          <ListPlugin />
          <PageBreakPlugin />
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
