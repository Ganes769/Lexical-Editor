import { useState } from "react";
import InserttPlugin from "../plugins/InsertPlugin";

import ClickAwayListener from "./ClickAwayListners";

export default function InsertPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className={"toolbar-item spaced"}
        aria-label="format Strikethrough"
      >
        <i className="format plus" />
        <span className="text toolbar-item spaced">Insert</span>
        <i className="format arrowDown " />
      </button>

      {isOpen && <InserttPlugin isOpen={isOpen} setIsOpen={setIsOpen} />}
    </ClickAwayListener>
  );
}
