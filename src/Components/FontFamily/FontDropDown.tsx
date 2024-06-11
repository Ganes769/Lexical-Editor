import { $getSelection, $isRangeSelection, LexicalEditor } from "lexical";
import { useCallback, useState, useEffect } from "react";
import { $patchStyleText } from "@lexical/selection";
import PopupMenu from "../PopupMenu";
import ClickAwayListener from "../ClickAwayListners";

const FONT_FAMILY_OPTIONS: [string, string][] = [
  ["Arial", "Arial"],
  ["Courier New", "Courier New"],
  ["Georgia", "Georgia"],
  ["Times New Roman", "Times New Roman"],
  ["Trebuchet MS", "Trebuchet MS"],
  ["Verdana", "Verdana"],
];

export default function FontDropDown({
  editor,
  value,
  style,
}: {
  editor: LexicalEditor;
  value: string;
  style: string;
}): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  const handleClick = useCallback(
    (option: string) => {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, {
            [style]: option,
          });
        }
      });
      setCurrentValue(option);
      setIsOpen(false);
    },
    [editor, style]
  );

  const buttonAriaLabel =
    style === "font-family"
      ? "Formatting options for font family"
      : "Formatting options";

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="toolbar-item icon block-type align-list"
      >
        <i className={`format fontFamily`} />
        <span className="toolbar-item text">{currentValue} </span>
      </button>

      {isOpen && (
        <div className="headings">
          <PopupMenu className="align-fontfamily">
            {FONT_FAMILY_OPTIONS.map(([option, text]) => (
              <button
                className="toolbar-item icon block-type"
                onClick={() => handleClick(option)}
                key={option}
              >
                <span className="text">{text}</span>
              </button>
            ))}
          </PopupMenu>
        </div>
      )}
    </ClickAwayListener>
  );
}
