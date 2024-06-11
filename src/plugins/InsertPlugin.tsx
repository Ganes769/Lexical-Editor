import React from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import PopupMenu from "../components/PopupMenu";
import { INSERT_HORIZONTAL_RULE_COMMAND } from "@lexical/react/LexicalHorizontalRuleNode";
import { LexicalCommand } from "lexical";
import { INSERT_PAGE_BREAK } from "./PageBreak";
import useModal from "../hooks/useModal";
import { InsertTableDialog } from "./TablePlugin";
import { useHeadingContext } from "../context/HeadingContext";

interface InsertType {
  command: LexicalCommand<void>;
  name: string;
  icon: string;
}
interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const insertOption: InsertType[] = [
  {
    name: "Horizontal Rule",
    command: INSERT_HORIZONTAL_RULE_COMMAND,
    icon: "horizontal-rule",
  },
  {
    name: "Page Break",
    command: INSERT_PAGE_BREAK,
    icon: "page-break",
  },
];

export default function InserttPlugin({ isOpen, setIsOpen }: Props) {
  const { setHeading } = useHeadingContext();
  const [modal, showModal] = useModal();
  const [editor] = useLexicalComposerContext();
  return (
    <>
      {modal}
      <PopupMenu className="">
        {insertOption.map((option: InsertType, index) => (
          <button
            key={index}
            onClick={() => {
              editor.dispatchCommand(option.command, undefined);
              setIsOpen(false);
            }}
            className={"toolbar-item spaced"}
            aria-label={`format ${option.name}`}
          >
            <i className={`format ${option.icon}`} />
            <span className="text toolbar-item spaced">{option.name}</span>
          </button>
        ))}
        <button
          onClick={() => {
            showModal("Insert Table", (onClose) => (
              <InsertTableDialog
                activeEditor={editor}
                onClose={() => {
                  onClose;
                  setIsOpen(false);
                }}
              />
            ));
          }}
          className={"toolbar-item spaced"}
          aria-label="Insert Table"
        >
          <i className={`format table`} />
          <span className="text toolbar-item spaced">Table</span>
        </button>
      </PopupMenu>
    </>
  );
}
