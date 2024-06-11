import { ReactNode, useCallback, useRef, useState } from "react";
import TextAlignPlugin from "../plugins/TextAlignPlugin";
import ClickAwayListener from "./ClickAwayListners";
import { useHeadingContext } from "../context/HeadingContext";
export function capitalizeFirstLetter(value: string) {
  if (!value) return value; // handle empty string case
  return value.charAt(0).toUpperCase() + value.slice(1);
}
export default function TextAlignPopUp() {
  const { alignIcon } = useHeadingContext();
  const [align, showAlign] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => showAlign(false)}>
      <button
        onClick={() => showAlign(!align)}
        className="toolbar-item icon block-type align-list"
      >
        <i className={`format  ${alignIcon}-align`} />
        <span className="toolbar-item text dropdown-text ">
          {capitalizeFirstLetter(alignIcon)}
        </span>
      </button>
      {align && <TextAlignPlugin align={align} showAlign={showAlign} />}
    </ClickAwayListener>
  );
}
