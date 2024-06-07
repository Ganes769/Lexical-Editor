import React, { useCallback, useRef, useState } from "react";
import { capitalizeFirstLetter } from "./TextAlignPopUp";
import HeadingPlugin from "../plugins/HeadingPlugin";
import ClickAwayListener from "./ClickAwayListners";
import { useHeadingContext } from "../context/HeadingContext";

export default function HeadingPopUp() {
  const { heading } = useHeadingContext();
  const [headings, showHeadings] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => showHeadings(false)}>
      <button
        onClick={() => showHeadings(!headings)}
        className="toolbar-item icon block-type"
      >
        <i className={`format ${heading}`} />
        <span className="toolbar-item text">
          {capitalizeFirstLetter(heading)}
        </span>
      </button>
      {headings && (
        <HeadingPlugin headings={headings} showHeading={showHeadings} />
      )}
    </ClickAwayListener>
  );
}
