import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { mergeRegister } from "@lexical/utils";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import { $getSelectionStyleValueForProperty } from "@lexical/selection";
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  CLEAR_EDITOR_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  RangeSelection,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
import { Dispatch, useCallback, useEffect, useRef, useState } from "react";

import TextAlignPopUp from "../components/TextAlignPopUp";
import HeadingPopUp from "../components/HeadingPopUp";
import BgColorPicker from "../components/BgColorPicker";
import TextColorPicker from "../components/TextColorPickerPopUp";
import FontSize from "../components/FontSize/FontSize";

import FontDropDown from "../components/FontFamily/FontDropDown";
import { getSelectedNode } from "../utils/getSelectedNode";
import EmbedLink from "../components/EmbedLink/EmbedLink";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import InsertPopup from "../components/InsertPopup";
import TableActionMenuPlugin from "../components/TableActionMenuPlugin/index";
const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin(setIsLinkEditMode: {
  setIsLinkEditMode: Dispatch<boolean>;
}): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [fontSize, setFontSize] = useState<string>("12px");
  const data = fontSize.slice(0, -2);
  console.log(data);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());
  const [isLink, setIsLink] = useState(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setFontSize(
        $getSelectionStyleValueForProperty(selection, "font-size", "15px")
      );
      setFontFamily(
        $getSelectionStyleValueForProperty(selection, "font-family", "Arial")
      );
      const node = getSelectedNode(selection as RangeSelection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          $updateToolbar();
          return false;
        },
        LowPriority
      ),

      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, $updateToolbar]);
  if ($isRangeSelection(Selection)) {
    setFontSize(
      $getSelectionStyleValueForProperty(Selection, "font-size", "15px")
    );
  }

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo"
      >
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo"
      >
        <i className="format redo" />
      </button>
      <Divider />
      <HeadingPopUp />
      <Divider />
      <FontDropDown editor={editor} style={`font-family`} value={fontFamily} />
      <Divider />
      <FontSize
        disabled={!isEditable}
        selectionFontSize={fontSize.slice(0, -2)}
        editor={editor}
      />
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        className={"toolbar-item spaced " + (isBold ? "active" : "")}
        aria-label="Format Bold"
      >
        <i className="format bold" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        className={"toolbar-item spaced " + (isItalic ? "active" : "")}
        aria-label="Format Italics"
      >
        <i className="format italic" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        className={"toolbar-item spaced " + (isUnderline ? "active" : "")}
        aria-label="Format Underline"
      >
        <i className="format underline" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough");
        }}
        className={"toolbar-item spaced " + (isStrikethrough ? "active" : "")}
        aria-label="format Strikethrough"
      >
        <i className="format strikethrough" />
      </button>
      <EmbedLink />
      <BgColorPicker />
      <TextColorPicker />
      <Divider />
      <TextAlignPopUp />
      <Divider />
      <InsertPopup />
      <Divider />
    </div>
  );
}
