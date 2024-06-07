import React, { useCallback, useRef, useState } from "react";
import ColorPicker from "./ColorPicker/ColorPicker";
import useColorPicker from "../hooks/useColorPicker";
import ClickAwayListener from "./ClickAwayListners";

export default function BgColorPicker() {
  const [iscolorBgPickerOpen, setisBgColorPickerOpen] = useState(false);
  const { onBgColorSelect } = useColorPicker();

  return (
    <ClickAwayListener onClickAway={() => setisBgColorPickerOpen(false)}>
      <button
        onClick={() => setisBgColorPickerOpen(!iscolorBgPickerOpen)}
        className="toolbar-item spaced"
        aria-label="Left Align"
      >
        <i className="format bg-color" />
      </button>

      {iscolorBgPickerOpen && (
        <ColorPicker
          color="red"
          onChange={(color: any) => onBgColorSelect(color)}
        />
      )}
    </ClickAwayListener>
  );
}
