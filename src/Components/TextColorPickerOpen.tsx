import React, { useState } from "react";
import ClickAwayListener from "./ClickAwayListners";
import useColorPicker from "../hooks/useColorPicker";
import ColorPicker from "./ColorPicker/ColorPicker";

export default function TextColorPicker() {
  const { onBgColorSelect } = useColorPicker();
  const [textColor, setTextColor] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => setTextColor(false)}>
      <button
        onClick={() => setTextColor(!textColor)}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <i className="format font-color" />
      </button>

      {textColor && (
        <ColorPicker
          color="red"
          onChange={(color: any) => onBgColorSelect(color)}
        />
      )}
    </ClickAwayListener>
  );
}
