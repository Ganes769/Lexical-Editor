import React, { useCallback, useRef, useState } from "react";
import PopupMenu from "../Components/PopupMenu";
import { ElementFormatType, FORMAT_ELEMENT_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useHeadingContext } from "../context/HeadingContext";
import ClickAwayListener from "../Components/ClickAwayListners";
import { capitalizeFirstLetter } from "../Components/TextAlignPopUp";
interface FormatType {
  [key: string]: ElementFormatType;
}

const textFormatType: FormatType = {
  Left: "left",
  Right: "right",
  Center: "center",
  Justify: "justify",
};
interface TextAlignProps {
  align?: boolean;
  showAlign?: (align: boolean) => void;
}

export default function TextAlignPlugin({ align, showAlign }: TextAlignProps) {
  console.log("outside clickaway", align);

  const [currentAlignment, setCurrentAlignMent] = useState<any>("left");
  const [editor] = useLexicalComposerContext();
  const { setAlignIcon } = useHeadingContext();
  console.log("align inside textplugin", align);

  return (
    <PopupMenu className="align-style">
      <div>
        {Object.entries(textFormatType).map((value) => {
          return (
            <button
              key={value[1]}
              onClick={() => {
                setAlignIcon(value[1]);
                setCurrentAlignMent(value[1]);
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, value[1]);
                showAlign && showAlign(false);
              }}
              className="toolbar-item icon block-type text-style"
              aria-label="Right Align"
            >
              <i className={`format ${value[1]}-align`} />
              <span className="text toolbar-item spaced">
                {capitalizeFirstLetter(value[1])}
              </span>
            </button>
          );
        })}
      </div>
    </PopupMenu>
  );
}
